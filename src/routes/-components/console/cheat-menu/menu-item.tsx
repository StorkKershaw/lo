import { CircleQuestionMarkIcon } from 'lucide-react';
import { Fragment, type ReactNode } from 'react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components';

type Props = {
  title: string;
  tooltip: string;
  children: ReactNode;
};

export function MenuItem({ title, tooltip, children }: Props) {
  return (
    <Item size="sm">
      <ItemContent>
        <ItemTitle>
          {title}
          <Popover>
            <PopoverTrigger asChild>
              <CircleQuestionMarkIcon className="size-4 translate-y-px cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent align="start">
              <PopoverHeader>
                <PopoverTitle>{title}</PopoverTitle>
                <PopoverDescription>
                  {tooltip.split('\n').map((line, index) => (
                    <Fragment key={line}>
                      {index > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </ItemTitle>
      </ItemContent>
      <ItemActions className="h-8">{children}</ItemActions>
    </Item>
  );
}
