import { useEffect, useEffectEvent, useState } from 'react';
import {
  Button,
  ButtonGroup,
  ButtonGroupText,
  RefreshCWIcon,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { useStore } from '@/stores';
import { range } from '@/utils';

const sizes = [...range(3, 20), ...range(20, 100, 30)];

export function SizeSelect() {
  const [size, setSize] = useState(3);
  const initialize = useStore((state) => state.initialize);
  const isExecuting = useStore((state) => state.mode === 'auto');

  const initializeEngine = useEffectEvent(() => {
    initialize(size);
  });

  const handleSelectChange = (value: string): void => {
    setSize(+value);
  };

  const handleButtonClick = () => {
    initialize(size);
  };

  useEffect(() => {
    initializeEngine();
  }, []);

  return (
    <ButtonGroup>
      <ButtonGroupText>難易度</ButtonGroupText>
      <Select defaultValue="3" disabled={isExecuting} onValueChange={handleSelectChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>難易度</SelectLabel>
            {sizes.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button variant="default" size="icon" disabled={isExecuting} onClick={handleButtonClick}>
        <RefreshCWIcon />
      </Button>
    </ButtonGroup>
  );
}
