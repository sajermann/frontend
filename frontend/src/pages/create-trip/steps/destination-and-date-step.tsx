import {
  MapPinIcon,
  CalendarIcon,
  Settings2Icon,
  ArrowRightIcon,
  XIcon,
} from 'lucide-react';
import { useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Button } from '../../../components/button';
import 'react-day-picker/dist/style.css';

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  eventStartAnEndDates?: DateRange;
  setEventStartAnEndDates: (destination?: DateRange) => void;
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  eventStartAnEndDates,
  setEventStartAnEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventStartAnEndDates?.from && eventStartAnEndDates?.to
      ? `${format(eventStartAnEndDates?.from, "d' de 'LLL")} até ${format(
          eventStartAnEndDates?.to,
          "d' de 'LLL"
        )}`
      : 'Quando?';

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPinIcon className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          className="bg-transparent text-lg placeholder-zinc-400 focus:outline-none w-full"
          placeholder="Para onde você vai?"
          onChange={e => setDestination(e.target.value)}
        />
      </div>
      <button
        onClick={openDatePicker}
        type="button"
        disabled={isGuestsInputOpen}
        className="flex items-center gap-2 text-left w-[240px]"
      >
        <CalendarIcon className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 w-40 flex-1">
          {displayedDate}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button
                  type="button"
                  aria-label="Fechar Modal"
                  onClick={closeDatePicker}
                >
                  <XIcon className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              selected={eventStartAnEndDates}
              onSelect={setEventStartAnEndDates}
            />
          </div>
        </div>
      )}

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
