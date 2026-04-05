import type { router } from '@/router';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string;
  }
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

declare global {}
