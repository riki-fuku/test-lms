'use client'

import Tooltip from '@/components/ui/Tooltip'
import cn from '@/hooks/cn'
import NextImage from 'next/image'
import type { AnchorHTMLAttributes, HTMLAttributes, ImgHTMLAttributes } from 'react'
import { useState } from 'react'
import { BsInfoCircle } from 'react-icons/bs'
import { FaRegCopy } from 'react-icons/fa'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { IoSkullOutline, IoWarningOutline } from 'react-icons/io5'
import { MdOutlineFileDownload } from 'react-icons/md'
import type { ExtraProps } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

type MarkDown2HTMLProps = {
  children: Readonly<string>
}

export default function MarkDown2HTML(props: MarkDown2HTMLProps) {
  function H1({ children }: HTMLAttributes<HTMLHeadElement> & ExtraProps) {
    return <h1 className='my-5 text-3xl font-semibold leading-tight sm:text-4xl'>{children}</h1>
  }

  function H2({ children }: HTMLAttributes<HTMLHeadElement> & ExtraProps) {
    return (
      <div className='my-5 flex'>
        <div className='h-12 w-2 bg-gradient-to-b from-sub-color to-main-color'></div>
        <h2 className='flex grow items-center bg-sky-100 px-4 text-xl font-bold sm:text-2xl'>
          {children}
        </h2>
      </div>
    )
  }

  function H3({ children }: HTMLAttributes<HTMLHeadElement> & ExtraProps) {
    return (
      <div className='my-5 flex'>
        <div className='h-12 w-2 bg-gradient-to-b from-sub-color to-main-color'></div>
        <h3 className='flex grow items-center px-4 text-lg font-bold sm:text-xl'>{children}</h3>
      </div>
    )
  }

  function H4({ children }: HTMLAttributes<HTMLHeadElement> & ExtraProps) {
    return (
      <div className='my-5'>
        <div className='bg-gradient-to-r from-sub-color to-main-color pb-0.5'>
          <h4 className='items-center bg-white py-2 text-lg'>{children}</h4>
        </div>
      </div>
    )
  }

  function Image({ src, alt }: ImgHTMLAttributes<HTMLImageElement> & ExtraProps) {
    if (alt === 'ダウンロード') {
      return (
        <div className='my-5 flex items-center'>
          <MdOutlineFileDownload className='text-2xl text-main-color' />
          <a
            href={src}
            className='underline-blue-400 font-semibold text-main-color hover:underline'
          >
            ダウンロード
          </a>
        </div>
      )
    }

    return (
      <div className='relative my-5 w-full overflow-hidden rounded object-cover shadow'>
        <NextImage className='!static' alt={alt || '教材画像'} src={src || 'no image'} fill />
      </div>
    )
  }

  function Li(li: (HTMLAttributes<HTMLLIElement> & ExtraProps) | '\n', index: number) {
    if (!li || typeof li !== 'object') {
      return li
    }

    const childProps = 'props' in li ? li.props : {}
    const { children: liText } = childProps as { children: string }

    return (
      <li key={index} className='my-2'>
        {liText}
      </li>
    )
  }

  function Ul({ children }: HTMLAttributes<HTMLUListElement> & ExtraProps) {
    if (!Array.isArray(children)) {
      return <ul>{children}</ul>
    }

    return (
      <div className='my-5 rounded bg-bg-primary p-3'>
        <ul className='list-disc pl-8 text-base'>{children.map((li, index) => Li(li, index))}</ul>
      </div>
    )
  }

  function Ol({ children }: HTMLAttributes<HTMLUListElement> & ExtraProps) {
    if (!Array.isArray(children)) {
      return <ul>{children}</ul>
    }

    return (
      <div className='my-5 rounded bg-bg-primary p-3'>
        <ol className='list-decimal pl-8 text-base'>
          {children.map((li, index) => Li(li, index))}
        </ol>
      </div>
    )
  }

  function P({ children }: HTMLAttributes<HTMLParagraphElement> & ExtraProps) {
    const labels = ['warning', 'danger', 'info', 'tips'] as const
    type LabelType = (typeof labels)[number]

    if (children && typeof children === 'object') {
      const childrenProps = 'props' in children ? children.props : {}
      const isImage = 'src' in childrenProps
      if (isImage) {
        return <div>{children}</div>
      }
    }

    if (typeof children !== 'string') {
      return <p className='my-5'>{children}</p>
    }

    const regex = /:::(\w+)\s*([\s\S]*?)\s*:::/
    const match = children.match(regex)

    // MessageUIの記法であるか判定
    if (match) {
      const type = match ? match[1] : 'tip'
      const text = match ? match[2] : children

      const isLabelType = (type: string): type is LabelType => {
        return labels.some((val) => val === type)
      }

      if (!isLabelType(type)) {
        return <p className='my-5'>{children}</p>
      }

      return Message(type, text)
    }

    return <p className='my-5 whitespace-pre-wrap'>{children}</p>

    function Message(type: LabelType, text: string) {
      const textArray = text.split('\n')

      function Label(type: LabelType) {
        function Icon(type: LabelType) {
          switch (type) {
            case 'warning':
              return <IoWarningOutline color='white' />
            case 'danger':
              return <IoSkullOutline color='white' />
            case 'info':
              return <BsInfoCircle color='white' />
            case 'tips':
              return <HiOutlineLightBulb color='white' />
          }
        }

        function getLabelBgColor(type: LabelType) {
          switch (type) {
            case 'warning':
              return 'bg-yellow-500'
            case 'danger':
              return 'bg-red-500'
            case 'info':
              return 'bg-blue-500'
            case 'tips':
              return 'bg-green-500'
          }
        }

        const label = cn(
          'relative flex w-32 translate-x-4 translate-y-7 items-center px-4 py-2',
          getLabelBgColor(type),
        )

        function getLabelShadowColor(type: LabelType) {
          switch (type) {
            case 'warning':
              return 'border-t-yellow-600'
            case 'danger':
              return 'border-t-red-600'
            case 'info':
              return 'border-t-blue-600'
            case 'tips':
              return 'border-t-green-600'
          }
        }

        const labelShadow = cn(
          'absolute -right-2 top-1 border-8 rotate-45 border-x-transparent border-b-transparent',
          getLabelShadowColor(type),
        )

        return (
          <div className={label}>
            {Icon(type)}
            <span className='pl-1 uppercase text-white'>{type}</span>
            <div className={labelShadow}></div>
          </div>
        )
      }

      function getBgColor(type: LabelType) {
        switch (type) {
          case 'warning':
            return 'bg-amber-100'
          case 'danger':
            return 'bg-rose-100'
          case 'info':
            return 'bg-blue-100'
          case 'tips':
            return 'bg-teal-100'
        }
      }

      return (
        <div>
          {Label(type)}
          <div className={cn('rounded-md p-6 pt-12', getBgColor(type))}>
            {textArray.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </div>
      )
    }
  }

  function Pre({ children, ...props }: HTMLAttributes<HTMLPreElement> & ExtraProps) {
    const [copy, setCopy] = useState(false)
    if (!children || typeof children !== 'object') {
      return <code {...props}>{children}</code>
    }

    const childType = 'type' in children ? children.type : ''
    if (childType !== 'code') {
      return <code {...props}>{children}</code>
    }

    const childProps = 'props' in children ? children.props : {}
    const { className, children: code } = childProps
    const classList = className ? className.split(':') : []
    const language = classList[0]?.replace('language-', '')
    const fileName = classList[1]

    const copyCode = () => {
      navigator.clipboard.writeText(code)
      setCopy(true)
      setTimeout(() => {
        setCopy(false)
      }, 1000)
    }

    return (
      <>
        <div className='my-5 overflow-hidden rounded-t-md'>
          <div className='flex items-center justify-between bg-zinc-800 p-2'>
            <span className='text-white'>{fileName ?? fileName}</span>
            <div className='relative'>
              <FaRegCopy onClick={copyCode} color='white' className='cursor-pointer' />
              <div
                className={cn(
                  'absolute -left-2 top-1/2 -translate-x-full -translate-y-1/2 transition-all',
                  copy ? 'opacity-100' : 'opacity-0',
                )}
              >
                <Tooltip className='bg-zinc-500' text='コピーしました！' />
              </div>
            </div>
          </div>
          <SyntaxHighlighter language={language} style={dracula}>
            {String(code).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      </>
    )
  }

  function Table({ children }: HTMLAttributes<HTMLTableElement> & ExtraProps) {
    if (!Array.isArray(children)) {
      return <table>{children}</table>
    }

    if (!children[0] || typeof children[0] !== 'object') {
      return <table>{children}</table>
    }

    if (!children[1] || typeof children[1] !== 'object') {
      return <table>{children}</table>
    }

    // thタグの抽出
    const theadProps = 'props' in children[0] ? children[0].props : {}
    const { children: theadTr } = theadProps
    const theadList = theadTr.props.children as HTMLAttributes<HTMLTableCellElement>[]

    // tbody thタグの抽出
    const tbodyProps = 'props' in children[1] ? children[1].props : {}
    const tbodyTrList: HTMLAttributes<HTMLTableRowElement>[] =
      tbodyProps.children.length > 0 ? tbodyProps.children : [tbodyProps.children]

    // thタグの生成
    function Th(th: HTMLAttributes<HTMLTableCellElement> & ExtraProps, index: number) {
      const thProps = 'props' in th ? th.props : {}
      const { children: thText } = thProps as { children: string }
      const style = cn(
        ['text-nowrap bg-sky-100 px-4 py-2 text-blue-500 text-left'],
        //   borderのスタイル
        ['border-b border-r border-b-slate-200 border-r-slate-200 [&:last-child]:border-r-0'],
      )
      return (
        <th key={index} className={style}>
          {thText}
        </th>
      )
    }

    // tbody trタグの生成
    function TdTr(tr: HTMLAttributes<HTMLTableRowElement> & ExtraProps, index: number) {
      const trProps = 'props' in tr ? tr.props : {}
      const { children: tdList } = trProps as { children: HTMLAttributes<HTMLTableCellElement>[] }
      return (
        <tr key={index} className='bg-white'>
          {tdList.map((td: HTMLAttributes<HTMLTableCellElement>, index) => Td(td, index))}
        </tr>
      )
    }

    // tdタグの生成
    function Td(td: HTMLAttributes<HTMLTableCellElement> & ExtraProps, index: number) {
      const tdProps = 'props' in td ? td.props : {}
      const { children: tdText } = tdProps as { children: string }
      const style = cn(
        ['px-4 py-2'],
        //   borderのスタイル
        ['border-b border-r border-b-slate-200 border-r-slate-200 [&:last-child]:border-r-0'],
      )
      return (
        <td key={index} className={style}>
          {tdText}
        </td>
      )
    }

    const tableStyle = cn(
      'my-5 w-full min-w-96 border-separate border-spacing-0 rounded border border-slate-200 overflow-hidden',
    )

    const tbodyStyle = cn(['[&>tr:last-child>td]:border-b-0'])

    return (
      <table className={tableStyle}>
        <thead>
          <tr>
            {theadList.map((th: HTMLAttributes<HTMLTableCellElement>, index) => Th(th, index))}
          </tr>
        </thead>
        <tbody className={tbodyStyle}>
          {tbodyTrList.map((tr: HTMLAttributes<HTMLTableRowElement>, index) => TdTr(tr, index))}
        </tbody>
      </table>
    )
  }

  function A({ href, children }: AnchorHTMLAttributes<HTMLAnchorElement> & ExtraProps) {
    return (
      <a
        href={href}
        className='text-main-color hover:underline'
        target='_blank'
        rel='noopener noreferrer'
      >
        {children}
      </a>
    )
  }

  function Blockquote({ children }: HTMLAttributes<HTMLQuoteElement> & ExtraProps) {
    return (
      <blockquote className='my-5 border-l-4 border-gray-300 pl-4 text-base'>{children}</blockquote>
    )
  }

  return (
    <ReactMarkdown
      className='markdown'
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        img: Image,
        ul: Ul,
        ol: Ol,
        p: P,
        pre: Pre,
        table: Table,
        a: A,
        blockquote: Blockquote,
      }}
    >
      {props.children}
    </ReactMarkdown>
  )
}
