import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex h-screen">
      <Link className="m-auto" href="/articles/1">Voir article premium</Link>
    </main>
  )
}