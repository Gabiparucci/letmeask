import illustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function NewRoom() {
  const { user } = useAuth()
  return (
    <div className="bg-white-bg flex h-screen">
      <aside className="bg-purple flex flex-col flex-1 justify-center items-center">
        <img
          className="mb-4"
          src={illustration}
          alt="ilustração simbolizando perguntas e respostas"
        />
        <strong className="text-4xl mb-2 text-white font-bold">
          Toda pergunta tem uma resposta
        </strong>
        <p className="text-lg text-white font-extralight">
          Aprenda e compartilhe conhecimento com outras pessoas
        </p>
      </aside>
      <main className="flex-1 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <img className="mb-20" src={logo} alt="Letmeask" />
          <h2 className="text-2xl font-bold mb-5">Crie uma nova sala</h2>
          <form className="flex flex-col justify-center items-center">
            <input
              className="h-12 w-96 py-7 pl-3 mb-4 rounded-lg border-gray-medium border-2 outline-none"
              type="text"
              placeholder="Nome da sala"
            />
            <Button>Criar sala</Button>
          </form>
          <p className="color-grey-medium mt-4">
            Quer entrar em uma sala já existente?{' '}
            <Link className="text-pink-dark underline" to="/">
              Clique aqui
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
