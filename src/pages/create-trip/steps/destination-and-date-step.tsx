import {
  MapPinIcon,
  CalendarIcon,
  Settings2Icon,
  ArrowRightIcon,
} from 'lucide-react';
import { Button } from '../../../components/button';

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
}: DestinationAndDateStepProps) {
  return (
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
        <Button type="button" onClick={closeGuestsInput} variant="secondary">
          Alterar local/data <Settings2Icon className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGuestsInput} type="button">
          Continuar <ArrowRightIcon className="size-5" />
        </Button>
      )}
    </div>
  );
}
