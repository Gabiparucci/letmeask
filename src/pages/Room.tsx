import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useParams } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'

type RoomParams = {
  id: string
}

export function Room() {
  const { user } = useAuth()
  const params = useParams<RoomParams>()
  const roomId = params.id
  const [newQuestion, setNewQuestion] = useState('')
  const { questions, title } = useRoom(roomId)

  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    if (likeId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      })
    }
  }

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
    <div className="bg-white-bg h-full" id="page-room">
      <header className="p-6 border-b-2 border-gray-light">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <img className="w-36 mb-6 lg:mb-0" src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>
      <main className="max-w-4xl mx-6 lg:mx-auto">
        <div className="my-10 lg:my-20 flex items-center">
          <h1 className="text-2xl font-bold text-gray-dark">Sala: {title}</h1>
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
          <div className="flex flex-col lg:flex-row justify-between items-center mt-4">
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
            <Button className="w-80 h-12 mt-3 lg:mt-0" type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>
        <div className="mt-8">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <button
                    className={`b-0 bg-transparent flex items-end gap-4 ${
                      question.likeId ? 'text-purple' : 'text-gray-dark'
                    }`}
                    type="button"
                    aria-label="Marcar como gostei"
                    onClick={() => handleLikeQuestion(question.id, question.likeId)}
                  >
                    {question.likeCount > 0 && <span className="">{question.likeCount}</span>}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                        stroke={`${question.likeId ? '#835AFD' : '#737380'}`}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}
