import { CheatMenu } from './cheat-menu';
import { SizeSelect } from './size-select';

export function Console() {
  return (
    <div className="flex w-full flex-col items-center space-y-4">
      <SizeSelect />
      <CheatMenu />
    </div>
  );
}
