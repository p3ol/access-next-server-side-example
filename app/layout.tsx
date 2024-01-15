import type { ComponentPropsWithoutRef } from 'react';

import './globals.css';

export const metadata = {
  title: 'Poool Next Example',
  description: 'An example of poool paywall with Next.js',
};

export default function RootLayout ({
  children,
}: ComponentPropsWithoutRef<'html'>) {
  return (
    <html lang="en">
      <body>
        { children }
      </body>
    </html>
  );
}
