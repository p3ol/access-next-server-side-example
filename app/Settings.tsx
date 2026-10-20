'use client';

import { useState } from 'react';

const Settings = ({ pk = '' }: { pk?: string }) => {
  const [publicKey, setPublicKey] = useState(pk);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.cookie = `publicKey=${encodeURIComponent(publicKey)}; path=/`;
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="publicKey">Clé publique de lecture</label>
      <input
        id="publicKey"
        value={publicKey}
        onChange={(event) => setPublicKey(event.target.value)}
        placeholder="MCII..."
        className="ml-5"
      />
    </form>
  )
};

export default Settings;