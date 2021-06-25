import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={` ${
        isOutlined
          ? 'text-purple bg-white border-2 border-purple font-semibold'
          : 'bg-purple text-white'
      } outline-none disabled:opacity-50 rounded-lg ${props.className}`}
    ></button>
  )
}
