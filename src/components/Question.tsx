import { ReactNode } from 'react'

type QuestionProps = {
  content: string
  author: {
    name: string
    avatar: string
  }
  children?: ReactNode
  isAnswered: boolean
  isHighlighted: boolean
}

export function Question({ content, author, children, isAnswered, isHighlighted }: QuestionProps) {
  return (
    <div
      className={`rounded-lg shadow-lg p-6 mt-8 ${
        isAnswered
          ? 'bg-gray-light'
          : isHighlighted
          ? 'bg-purple-bg border-2 border-purple'
          : 'bg-second-white'
      }`}
    >
      <p className="text-#29292e">{content}</p>
      <footer className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <img className="w-8 h-8 rounded-full" src={author.avatar} alt={author.name} />
          <span className="ml-2 text-gray-dark text-sm">{author.name}</span>
        </div>
        <div className="">{children}</div>
      </footer>
    </div>
  )
}
