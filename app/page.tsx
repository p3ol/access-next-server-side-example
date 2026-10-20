import Link from 'next/link';
import { cookies } from 'next/headers';

import Settings from './Settings';

export default async function Home() {

  const c = await cookies();

  const pk = c.get('publicKey')?.value;
  
  return (
    <main className="flex h-screen">
      <div className="m-auto flex flex-col gap-5">
        <Link href="/articles/1">Voir article premium</Link>
        <Settings pk={pk} />
      </div>
    </main>
  );
}
