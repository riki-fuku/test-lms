import LoginForm from '@/features/auth/components/LoginForm'

export default function Page() {
  return (
    <div className='flex h-screen flex-col'>
      <main className='flex grow items-center justify-center bg-[url("/images/login_bg.png")] bg-cover bg-center p-3 sm:p-32'>
        <LoginForm />
      </main>
    </div>
  )
}
