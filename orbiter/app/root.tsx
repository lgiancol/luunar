import { PrimeReactProvider, type PrimeReactPTOptions } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { twMerge } from 'tailwind-merge';
import type { Route } from './+types/root';
import { AuthProvider } from './contexts/auth-context';

import clsx from 'clsx';
import 'primereact/resources/primereact.css';
import './app.css';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background-500">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const MyDesignSystem: PrimeReactPTOptions = {
    ...Tailwind,
    datatable: {
      ...Tailwind.datatable,
      root: (options) => {
        const twFn = Tailwind.datatable?.root as Function;
        let twClassName = '';
        if (twFn) {
          twClassName = twFn(options).className;
        }
        return { className: clsx('rounded-sm overflow-hidden', twClassName) };
      },
      thead: (options) => {
        const twFn = Tailwind.datatable?.thead as Function;
        let twClassName = '';
        if (twFn) {
          const tw = twFn(options);
          twClassName = tw.className;
        }
        return { className: clsx('bg-primary-100', twClassName) };
      },
      column: {
        ...Tailwind.datatable?.column,
        headerCell(options) {
          const twFn = Tailwind.datatable?.column?.headerCell as Function;
          let twClassName = '';
          if (twFn) {
            const tw = twFn(options);
            console.log(tw);
            twClassName = tw.className;
          }
          return { className: clsx('bg-orange-100', twClassName) };
        },
      },
    },
    inputtext: {
      root: ({ props, context }: { props: any; context: any }) => ({
        className: clsx(
          'm-0',
          'font-sans text-gray-600 dark:text-white/80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg',
          {
            'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]':
              !context.disabled,
            'opacity-60 select-none pointer-events-none cursor-default': context.disabled,
          },
          {
            'text-lg px-4 py-4': props.size == 'large',
            'text-xs px-2 py-2': props.size == 'small',
            'p-3 text-base': props.size == null,
          }
        ),
      }),
    },
    // panel: {
    //   header: ({ props }: { props: any }) => ({
    //     className: classNames(
    //       'flex items-center justify-between', // flex and alignments
    //       'border border-gray-300 bg-gray-100 text-gray-700 rounded-tl-lg rounded-tr-lg', // borders and colors
    //       'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80', // Dark mode
    //       { 'p-5': !props.toggleable, 'py-3 px-5': props.toggleable } // condition
    //     ),
    //   }),
    //   title: 'leading-none font-bold',
    //   toggler: {
    //     className: classNames(
    //       'inline-flex items-center justify-center overflow-hidden relative no-underline', // alignments
    //       'w-8 h-8 text-gray-600 border-0 bg-transparent rounded-full transition duration-200 ease-in-out', // widths, borders, and transitions
    //       'hover:text-gray-900 hover:border-transparent hover:bg-gray-200 dark:hover:text-white/80 dark:hover:bg-gray-800/80 dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]', // hover
    //       'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]' // focus
    //     ),
    //   },
    //   togglerIcon: 'inline-block',
    //   content: {
    //     className: classNames(
    //       'p-5 border border-gray-300 bg-white text-gray-700 border-t-0 last:rounded-br-lg last:rounded-bl-lg',
    //       'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80' // Dark mode
    //     ),
    //   },
    //   // transition: TRANSITIONS.toggleable
    // },
  };
  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: MyDesignSystem,
        ptOptions: { mergeSections: true, mergeProps: true, classNameMergeFunction: twMerge },
      }}
    >
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </PrimeReactProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
