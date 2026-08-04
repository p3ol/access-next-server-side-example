'use server';

import jwt from 'jsonwebtoken';

export async function releaseArticle(id: Number, releaseSignature?: string) {
  if (releaseSignature) {
    try {
      const releaseSignatureKey = process.env.RELEASE_SIGNATURE_KEY;

      if (!releaseSignatureKey) {
        throw new Error('Missing RELEASE_SIGNATURE_KEY environment variable');
      }

      const content = jwt.verify(releaseSignature, releaseSignatureKey, {
        algorithms: ['RS512'],
      });
      console.log(content);
    } catch {
      return { error: 'Invalid release signature' };
    }
  }

  const response = await fetch(`http://localhost:3000/api/articles/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.PRIVATE_KEY}`,
    },
    body: JSON.stringify({ action: 'release' }),
  });

  const data = await response.json();

  return data;
}
