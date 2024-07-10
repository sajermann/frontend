import {
  MapPinIcon,
  CalendarIcon,
  ArrowRightIcon,
  UserRoundPlusIcon,
  Settings2Icon,
  XIcon,
  AtSignIcon,
  PlusIcon,
} from "lucide-react";
import { FormEvent, useState } from "react";

function App() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()
    if(!email || emailsToInvite.includes(email)){
      return
    }
    setEmailsToInvite(prev=>[...prev, email])
    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string){
    setEmailsToInvite(prev=>prev.filter(email=>email !== emailToRemove))
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>
        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPinIcon className="size-5 text-zinc-400" />
              <input
                disabled={isGuestsInputOpen}
                type="text"
                className="bg-transparent text-lg placeholder-zinc-400 focus:outline-none w-full"
                placeholder="Para onde você vai?"
              />
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-5 text-zinc-400" />
              <input
                disabled={isGuestsInputOpen}
                type="text"
                className="bg-transparent text-lg placeholder-zinc-400 w-40 focus:outline-none"
                placeholder="Quando?"
              />
            </div>

            <div className="w-px h-6 bg-zinc-800" />
            {isGuestsInputOpen ? (
              <button
                className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700"
                onClick={closeGuestsInput}
              >
                Alterar local/data <Settings2Icon className="size-5" />
              </button>
            ) : (
              <button
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
                onClick={openGuestsInput}
              >
                Continuar <ArrowRightIcon className="size-5" />
              </button>
            )}
          </div>

          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 flex-1"
              >
                <UserRoundPlusIcon className="size-5 text-zinc-400" />
                <span className="text-zinc-400 text- flex-1 text-left">
                  Quem estará na viagem?
                </span>
              </button>
              <div className="w-px h-6 bg-zinc-800" />
              <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Confirmar viagem <ArrowRightIcon className="size-5" />
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br /> com nossos{" "}
          <a
            className="text-zinc-300 underline"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            termos de uso
          </a>{" "}
          e{" "}
          <a
            className="text-zinc-300 underline"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            políticas de privacidade
          </a>
          .
        </p>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecionar convidados</h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <XIcon className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Os convidados irão receber e-mails para confirmar a participação
                na viagem.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {emailsToInvite.map((email) => (
                <div
                  key={email}
                  className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
                >
                  <span className="text-zinc-300">{email}</span>
                  <button type="button" onClick={()=>removeEmailFromInvites(email)}>
                    <XIcon className="size-4 text-zinc-400" />
                  </button>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-zinc-800"></div>

            <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
              <div className="px-2 flex items-center flex-1 gap-2">
                <AtSignIcon className="size-5 text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  className="bg-transparent text-lg placeholder-zinc-400 focus:outline-none w-full"
                  placeholder="Digite o e-mail do convidado"
                />
              </div>
              <button type="submit" className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Convidar <PlusIcon className="size-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
