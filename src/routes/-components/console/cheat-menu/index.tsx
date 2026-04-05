import dedent from 'dedent';
import { ChevronDownIcon } from 'lucide-react';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  ItemDescription,
  RocketIcon,
  type RocketIconHandle,
  SparklesIcon,
  Switch,
} from '@/components';
import { useStore } from '@/stores';
import { MenuItem } from './menu-item';

export function CheatMenu() {
  const patternCount = useStore((state) => 1n << BigInt(state.nullity));
  const recompute = useStore((state) => state.recompute);
  const isSpoiling = useStore((state) => state.isSpoiling);
  const setIsSpoiling = useStore((state) => state.setIsSpoiling);
  const mode = useStore((state) => state.mode);
  const setEdit = useStore((state) => state.setEdit);
  const autoFlip = useStore((state) => state.autoFlip);

  const animateIcon = (handle: RocketIconHandle | null) => {
    if (handle == null) {
      return;
    }

    return useStore.subscribe(
      (state) => state.mode,
      (mode, prevMode) => {
        if (mode === 'auto') {
          handle.startAnimation();
        } else if (prevMode === 'auto') {
          handle.stopAnimation();
        }
      },
    );
  };

  return (
    <Collapsible className="w-full overflow-hidden rounded-lg border">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="group w-full data-[state=open]:rounded-b-none">
          <span className="select-none before:content-['チートする'] group-data-[state=open]:before:content-['チートしない']" />
          <ChevronDownIcon className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t">
        <MenuItem
          title="解法のパターン数"
          tooltip={dedent`
            ボードの大きさによって決まります。
            この値が2以上の場合、表示される解法は最小手数でない可能性があります。
            この値が0の場合、そのボードは解くことができません。
          `}
        >
          <ItemDescription className="w-8 text-center text-foreground">
            {patternCount}
          </ItemDescription>
        </MenuItem>
        <MenuItem
          title="解法を表示"
          tooltip={dedent`
            クリックする必要があるセルを表示します。
          `}
        >
          <Switch checked={isSpoiling} onCheckedChange={setIsSpoiling} />
        </MenuItem>
        <MenuItem
          title="解法を再計算"
          tooltip={dedent`
            現在のボードから解法を再計算します。
            解法が複数パターンある場合、再計算によって手数が増減する場合があります。
          `}
        >
          <Button size="icon-sm" variant="outline" disabled={mode !== 'play'} onClick={recompute}>
            <SparklesIcon />
          </Button>
        </MenuItem>
        <MenuItem
          title="ボードを編集"
          tooltip={dedent`
            クリックしたセルのみが反転するようにします。
            解法が複数パターンあるボードを編集すると、解法のないボードになる場合があります。
          `}
        >
          <Switch disabled={mode === 'auto'} checked={mode === 'edit'} onCheckedChange={setEdit} />
        </MenuItem>
        <MenuItem
          title="自動解答"
          tooltip={dedent`
            クリックする必要があるセルを自動でクリックします。
          `}
        >
          <Button size="icon-sm" variant="outline" disabled={mode !== 'play'} onClick={autoFlip}>
            <RocketIcon ref={animateIcon} />
          </Button>
        </MenuItem>
      </CollapsibleContent>
    </Collapsible>
  );
}
