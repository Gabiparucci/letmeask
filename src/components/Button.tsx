import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={`bg-purple text-white rounded-lg w-96 h-12 outline-none disabled:opacity-50 ${props.className}`}
    ></button>
  )
}
