import copyImage from '../assets/images/copy.svg'

type RoomCodeProps = {
  code: string
}
export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button
      onClick={copyRoomCodeToClipboard}
      className="outline-none h-10 rounded-lg overflow-hidden bg-white border-2 border-purple flex"
    >
      <div className="bg-purple h-10 py-0 px-3 flex justify-center items-center">
        <img src={copyImage} alt="Copiar código da sala" />
      </div>
      <span className="block self-center flex-1 py-0 pr-4 pl-3 w-60 text-sm font-bold">
        Sala {props.code}
      </span>
    </button>
  )
}
