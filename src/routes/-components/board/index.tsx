import { Fragment } from 'react';
import { useStore } from '@/stores';
import { range } from '@/utils';
import { Cell } from './cell';

export function Board() {
  const size = useStore((state) => state.size);
  const isExecuting = useStore((state) => state.mode === 'auto');
  const array = range(0, size ** 2).toArray();

  return (
    <div className="aspect-square text-center leading-0" inert={isExecuting}>
      {array.map((index) => (
        <Fragment key={`${size}-${index}`}>
          <Cell index={index} style={{ '--width': `calc(100%/${size})` }} />
          {(index + 1) % size === 0 && <br />}
        </Fragment>
      ))}
    </div>
  );
}
