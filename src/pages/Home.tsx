import illustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'
import { Button } from '../components/Button'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function Home() {
  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }
    history.push('/rooms/new')
  }

  return (
    <div className="bg-white-bg flex h-screen">
      <aside className="bg-purple flex flex-col flex-1 justify-center items-center">
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
      <main className="flex-1 flex flex-col justify-center items-center">
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
          <form className="flex flex-col justify-center items-center">
            <input
              className="h-12 w-96 py-7 pl-3 mb-4 rounded-lg border-gray-medium border-2 outline-none"
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
