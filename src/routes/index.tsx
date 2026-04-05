import { createFileRoute } from '@tanstack/react-router';
import { Board, Console } from './-components';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <main className="flex w-screen flex-col gap-6 px-4 py-8 lg:h-screen lg:flex-row lg:gap-8 lg:overflow-hidden lg:px-30 lg:py-20">
      <div className="flex w-full justify-center lg:w-1/2">
        <Board />
      </div>
      <div className="flex w-full justify-center lg:w-1/2">
        <Console />
      </div>
    </main>
  );
}
