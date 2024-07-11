import { MapPinIcon, CalendarIcon, Settings2Icon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Button } from '../../components/button';
import { api } from '../../lib/axios';

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();

  async function load() {
    const { data } = await api.get(`trips/${tripId}`);
    setTrip(data.trip);
  }

  useEffect(() => {
    load();
  }, [tripId]);

  const displayedDate =
    trip?.starts_at && trip?.ends_at
      ? `${format(trip.starts_at, "d' de 'LLL")} até ${format(
          trip.ends_at,
          "d' de 'LLL"
        )}`
      : null;

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPinIcon className="size-5 text-zinc-400" />
        <span className="text-zinc-100 text-lg">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button variant="secondary">
          Alterar local/data <Settings2Icon className="size-5" />
        </Button>
      </div>
    </div>
  );
}
