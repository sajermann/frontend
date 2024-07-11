/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-day-picker';
import { InviteGuestsModal } from './invite-guests-modal';
import { ConformTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestsStep } from './steps/invite-guests-step';
import { api } from '../../lib/axios';

export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [destination, setDestination] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [eventStartAnEndDates, setEventStartAnEndDates] = useState<
    DateRange | undefined
  >();

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();
    if (!email || emailsToInvite.includes(email)) {
      return;
    }
    setEmailsToInvite(prev => [...prev, email]);
    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    setEmailsToInvite(prev => prev.filter(email => email !== emailToRemove));
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log({
      destination,
      eventStartAnEndDates,
      ownerName,
      ownerEmail,
      emailsToInvite,
    });

    if (
      !destination ||
      !eventStartAnEndDates?.from ||
      !eventStartAnEndDates?.to ||
      !ownerName ||
      !ownerEmail ||
      emailsToInvite.length < 1
    ) {
      return;
    }

    const response = await api.post(`/trips`, {
      destination,
      starts_at: eventStartAnEndDates.from,
      ends_at: eventStartAnEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });
    const { tripId } = response.data;
    navigate(`/trips/${tripId}`);
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
          <DestinationAndDateStep
            isGuestsInputOpen={isGuestsInputOpen}
            closeGuestsInput={closeGuestsInput}
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
            eventStartAnEndDates={eventStartAnEndDates}
            setEventStartAnEndDates={setEventStartAnEndDates}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              openGuestsModal={() => setIsModalOpen(true)}
              openConfirmTripModal={() => setIsConfirmTripModalOpen(true)}
              emailsToInvite={emailsToInvite}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{' '}
          <br /> com nossos{' '}
          <a
            className="text-zinc-300 underline"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            termos de uso
          </a>{' '}
          e{' '}
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
        <InviteGuestsModal
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestModal={() => setIsModalOpen(false)}
          emailsToInvite={emailsToInvite}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConformTripModal
          closeConfirmTripModal={() => setIsConfirmTripModalOpen(false)}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}
    </div>
  );
}
