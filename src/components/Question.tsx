import { ReactNode } from 'react'

type QuestionProps = {
  content: string
  author: {
    name: string
    avatar: string
  }
  children?: ReactNode
}

export function Question({ content, author, children }: QuestionProps) {
  return (
    <div className="bg-#fefefe rounded-lg shadow-lg p-6 mt-8">
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
