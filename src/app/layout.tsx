import './globals.css';

export const metadata = {
  title: 'Poool Next Example',
  description: 'An example of poool paywall with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
