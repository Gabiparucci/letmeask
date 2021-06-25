import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useHistory, useParams } from 'react-router-dom'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import deleteIcon from '../assets/images/delete.svg'
import { database } from '../services/firebase'

type RoomParams = {
  id: string
}

export function AdminRoom() {
  // const { user } = useAuth()
  const params = useParams<RoomParams>()
  const roomId = params.id
  const { questions, title } = useRoom(roomId)
  const history = useHistory()

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/')
  }

  return (
    <div className="bg-white-bg">
      <header className="p-6 border-b-2 border-gray-light">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img className="w-36" src={logoImg} alt="Letmeask" />
          <div className="flex gap-4">
            <RoomCode code={roomId} />
            <Button onClick={() => handleEndRoom()} isOutlined className="w-32 h-10">
              Encerrar sala
            </Button>
          </div>
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
        <div className="mt-8">
          {questions.map((question) => {
            return (
              <Question key={question.id} content={question.content} author={question.author}>
                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteIcon} alt="remover pergunta"></img>
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}
