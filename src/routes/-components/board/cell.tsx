import { KeyIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { Button } from '@/components';
import { useStore } from '@/stores';
import { cn } from '@/utils';

type Props = {
  index: number;
  className?: string;
};

export function Cell({ index, className, style }: Props & Pick<ComponentProps<'button'>, 'style'>) {
  const mask = 1n << BigInt(index);
  const isWhite = useStore((state) => Boolean(state.board & mask));
  const shouldClick = useStore((state) => state.answer[index]);
  const flip = useStore((state) => state.flip);
  const edit = useStore((state) => state.edit);
  const isSpoiling = useStore((state) => state.isSpoiling);
  const mode = useStore((state) => state.mode);

  const handleClick =
    mode === 'play' ? () => flip(index) : mode === 'edit' ? () => edit(index) : undefined;

  const showHint = mode !== 'edit' && isSpoiling && shouldClick;

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'aspect-square h-auto w-(--width) max-w-18 rounded-full p-0 align-top',
        className,
      )}
      style={style}
      onClick={handleClick}
    >
      <svg
        role="img"
        aria-label="cell"
        className={cn(
          'size-full rounded-full border border-border',
          isWhite ? 'fill-white' : 'fill-black',
        )}
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="50" />
        {showHint && <KeyIcon x="25" y="25" size={50} className="text-primary" />}
      </svg>
    </Button>
  );
}
