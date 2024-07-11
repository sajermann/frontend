import { XIcon, UserIcon } from 'lucide-react';
import { FormEvent } from 'react';
import { Button } from '../../components/button';

interface ConformTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (data: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (data: string) => void;
  setOwnerEmail: (data: string) => void;
}

export function ConformTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
}: ConformTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button
              type="button"
              aria-label="Fechar Modal"
              onClick={closeConfirmTripModal}
            >
              <XIcon className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{' '}
            <span className="font-semibold text-zinc-100">
              Florianópolis, Brasil
            </span>{' '}
            nas datas de{' '}
            <span className="font-semibold text-zinc-100">
              16 a 27 de Agosto de 2024
            </span>{' '}
            preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className=" space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
            <UserIcon className="size-5 text-zinc-400" />
            <input
              name="name"
              className="bg-transparent text-lg placeholder-zinc-400 focus:outline-none w-full"
              placeholder="Sem nome completo"
              onChange={e => setOwnerName(e.target.value)}
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
            <UserIcon className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              className="bg-transparent text-lg placeholder-zinc-400 focus:outline-none w-full"
              placeholder="Seu e-mail pessoal"
              onChange={e => setOwnerEmail(e.target.value)}
            />
          </div>
          <Button type="submit" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  );
}
