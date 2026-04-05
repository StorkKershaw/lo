import { createRouter } from '@tanstack/react-router';
import { routeTree } from '@/route-tree.gen';

export const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});
