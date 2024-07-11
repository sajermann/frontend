import { CheckCircle2Icon, CircleDashedIcon, UserCogIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/button';
import { api } from '../../lib/axios';

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);

  async function load() {
    const { data } = await api.get(`trips/${tripId}/participants`);
    setParticipants(data.participants);
  }

  useEffect(() => {
    load();
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div
            key={participant.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <span className="block font-medium text-zinc-100">
                {participant.name ?? `Convidado ${index}`}
              </span>
              <span className="block text-sm text-zinc-400 truncate ">
                {participant.email}
              </span>
            </div>
            {participant.is_confirmed ? (
              <CheckCircle2Icon className="text-green-400 size-5" />
            ) : (
              <CircleDashedIcon className="text-zinc-400 size-5" />
            )}
          </div>
        ))}
      </div>

      <Button type="button" variant="secondary" size="full">
        <UserCogIcon className="size-5" /> Gerenciar convidados
      </Button>
    </div>
  );
}
