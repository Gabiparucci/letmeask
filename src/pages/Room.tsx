import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useParams } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isHighlighted: boolean
    isAnswered: boolean
  }
>

type RoomParams = {
  id: string
}

type Question = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isHighlighted: boolean
  isAnswered: boolean
}

export function Room() {
  const { user } = useAuth()
  const params = useParams<RoomParams>()
  const roomId = params.id
  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)
    roomRef.on('value', (room) => {
      const databaseRoom = room.val()
      const FirebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}
      const parsedQuestions = Object.entries(FirebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isAnswered: value.isAnswered,
          isHighlighted: value.isHighlighted,
        }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
  }, [roomId])

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()
    if (newQuestion.trim() === '') {
      return
    }
    if (!user) {
      throw new Error('é necessário fazer o login')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)
    setNewQuestion('')
  }

  return (
    <div className="bg-white-bg h-screen" id="page-room">
      <header className="p-6 border-b-2 border-gray-light">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img className="w-36" src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>
      <main className="max-w-4xl mx-auto">
        <div className="my-20 flex items-center">
          <h1 className="text-2xl font-bold text-gray-dark">{title}</h1>
          {questions.length > 0 && (
            <span className="ml-4 bg-pink-dark rounded-full text-white py-2 px-4 text-sm font-bold">
              {questions.length} pergunta(s)
            </span>
          )}
        </div>
        <form onSubmit={handleSendQuestion} className="">
          <textarea
            className="w-full border-0 p-4 rounded-lg bg-#fefefe shadow-lg h-36"
            placeholder="O que você quer perguntar?"
            onChange={(e) => setNewQuestion(e.target.value)}
            value={newQuestion}
          ></textarea>
          <div className="flex justify-between items-center mt-4">
            {user ? (
              <div className="flex items-center">
                <img className="w-8 h-8 rounded-full" src={user.avatar} alt={user.name} />
                <span className="ml-2 text-black text-sm font-bold">{user.name}</span>
              </div>
            ) : (
              <span className="text-sm text-gray-dark font-bold">
                Para enviar uma pergunta
                <button className="bg-transparent border-0 ml-2 text-purple underline text-sm">
                  faça seu login
                </button>
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        {JSON.stringify(questions)}
      </main>
    </div>
  )
}
