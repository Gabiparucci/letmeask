import illustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'
import { Button } from '../components/Button'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'

export function Home() {
  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }
    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()
    if (roomCode.trim() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()
    if (!roomRef.exists()) {
      alert('A sala não existe')
      return
    }
    if (roomRef.val().endedAt) {
      alert('Essa sala já foi finalizada.')
    } else {
      history.push(`/rooms/${roomCode}`)
    }
  }

  return (
    <div className="bg-white-bg flex lg:flex-row flex-col h-screen">
      <aside className="bg-purple flex flex-col flex-1 justify-center items-center p-6 lg:p-0">
        <img
          className="mb-4"
          src={illustration}
          alt="ilustração simbolizando perguntas e respostas"
        />
        <strong className="text-4xl mb-2 text-white font-bold">
          Crie salas de Q&amp;A ao-vivo
        </strong>
        <p className="text-lg text-white font-extralight">
          Tire suas dúvidas da sua audiência em tempo real
        </p>
      </aside>
      <main className="flex-1 flex flex-col justify-center items-center p-6 lg:p-0">
        <div className="flex flex-col justify-center items-center">
          <img className="mb-20" src={logo} alt="Letmeask" />
          <button
            onClick={handleCreateRoom}
            className="bg-danger rounded-lg text-white flex justify-center items-center w-80 h-12"
          >
            <img className="pr-2" src={googleIcon} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom} className="flex flex-col justify-center items-center">
            <input
              className="h-12 w-80 py-7 pl-3 mb-4 rounded-lg border-gray-medium border-2 outline-none"
              type="text"
              placeholder="Digite o código da sala"
              onChange={(e) => setRoomCode(e.target.value)}
              value={roomCode}
            />
            <Button className="h-12 w-80" type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
