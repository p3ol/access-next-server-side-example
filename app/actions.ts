'use server';

import { createPublicKey } from 'node:crypto';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export async function releaseArticle(id: number, releaseSignature?: string) {
    try {
      if (!releaseSignature) {
        throw new Error('Missing event signature');
      }

      // You can also get the public key from your environment.
      const jwksResponse = await fetch(
        `${process.env.POOOL_API_URL}` +
        `/api/v4/rest/access/signature/jwks?bundleId=${process.env.NEXT_PUBLIC_POOOL_ID}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.POOOL_PAT}`,
          },
        },
      );
      const { keys } = await jwksResponse.json();

      const publicKey = createPublicKey({ key: keys[0], format: 'jwk' });

      const { iss, aud } = jwt.verify(
        releaseSignature,
        publicKey,
        { algorithms: ['RS512']},
      ) as JwtPayload;
      
      if (iss !== 'poool' || aud !== process.env.NEXT_PUBLIC_POOOL_ID ) {
        throw new Error('Issue with event signature');
      }
      
    } catch (e) {
      console.log(e);
      return { error: 'Invalid release signature' };
    }

  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  const response = await fetch(`${base}/api/articles/${id}`, {
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
