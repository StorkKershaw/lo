import { TanStackDevtools } from '@tanstack/react-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
          customTrigger: () => (
            <span className="cursor-pointer rounded border border-gray-500">⚙️</span>
          ),
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
});
