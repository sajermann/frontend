import { XIcon, TagIcon, CalendarIcon } from 'lucide-react';
import { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/button';
import { api } from '../../lib/axios';

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();
  const navigate = useNavigate();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get('title')?.toString();
    const occursAt = data.get('occurs_at')?.toString();

    await api.post(`trips/${tripId}/activities`, {
      title,
      occurs_at: occursAt,
    });
    window.document.location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button
              type="button"
              aria-label="Fechar Modal"
              onClick={closeCreateActivityModal}
            >
              <XIcon className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form onSubmit={createActivity} className=" space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
            <TagIcon className="size-5 text-zinc-400" />
            <input
              name="title"
              className="bg-transparent text-lg placeholder-zinc-400 focus:outline-none w-full"
              placeholder="Qual a atividade"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-14 flex-1 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
              <CalendarIcon className="size-5 text-zinc-400" />
              <input
                type="datetime-local"
                name="occurs_at"
                className="bg-transparent text-lg placeholder-zinc-400 focus:outline-none w-full"
                placeholder="Data e horário da atividade"
              />
            </div>
          </div>

          <Button type="submit" size="full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  );
}
