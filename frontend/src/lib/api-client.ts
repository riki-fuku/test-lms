import type { AxiosInstance, CreateAxiosDefaults } from 'axios'
import { default as Axios } from 'axios'

const isServer = typeof window === 'undefined'

type HttpProps = {
  accept?: string
  axiosDefaults?: CreateAxiosDefaults
}

const defaultHttpProps: HttpProps = {
  accept: 'application/json',
  axiosDefaults: {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  },
}

export class Http {
  public static axios(props?: HttpProps): AxiosInstance {
    const { axiosDefaults, accept } = {
      ...defaultHttpProps,
      ...props,
    }

    const axios = Axios.create({ withCredentials: true, withXSRFToken: true, ...axiosDefaults })

    const getCsrfToken = async () => {
      try {
        await axios.get('/api/sanctum/csrf-cookie')
      } catch (error) {
        console.error('Failed to fetch CSRF token.')
        console.error(error)
      }
    }

    axios.interceptors.request.use(async (config) => {
      if (config.headers && accept) {
        config.headers.Accept = accept
      }

      // サーバーサイドの場合、Next.jsのヘッダーを使用
      if (isServer) {
        try {
          const nextHeaders = await import('next/headers')
          if (config.headers) {
            config.headers['X-XSRF-TOKEN'] = nextHeaders.cookies().get('XSRF-TOKEN')?.value ?? ''
            config.headers['Cookie'] = nextHeaders.headers().get('cookie') ?? ''
            config.headers['Origin'] = process.env.NEXT_PUBLIC_APP_URL
            config.headers['Accept'] = accept || 'application/json'
          }
        } catch (error) {
          console.error('Failed to import next/headers', error)
        }
      }

      // CSRFトークンが必要なリクエスト（POST, PUT, DELETE）の場合
      if (!isServer && ['post', 'put', 'delete'].includes(config.method || '')) {
        await getCsrfToken()
      }

      return config
    })

    axios.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (error.response.status === 401) {
          window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/renewal/user/login`
        }

        return Promise.reject(error)
      },
    )

    return axios
  }
}
