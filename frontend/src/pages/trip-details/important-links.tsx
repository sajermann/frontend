/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link2Icon, PlusIcon } from 'lucide-react';
import { Button } from '../../components/button';

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links Importantes</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <span className="block font-medium text-zinc-100">
              Reserva do Ainb
            </span>
            <a
              href="#"
              className="block text-sm text-zinc-400 truncate hover:text-zinc-100"
            >
              http://google.com.bedsaffffffffffffffffffffffffffffffffffff
            </a>
          </div>
          <Link2Icon className="text-zinc-400 size-5" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <span className="block font-medium text-zinc-100">
              Reserva do Ainb
            </span>
            <a
              href="#"
              className="block text-sm text-zinc-400 truncate hover:text-zinc-100"
            >
              http://google.com.bedsaffffffffffffffffffffffffffffffffffff
            </a>
          </div>
          <Link2Icon className="text-zinc-400 size-5" />
        </div>
      </div>
      <Button type="button" variant="secondary" size="full">
        <PlusIcon className="size-5" /> Cadastrar novo link
      </Button>
    </div>
  );
}
