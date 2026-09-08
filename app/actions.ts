'use server';

import jwt, { type JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function releaseArticle(id: number, releaseSignature?: string) {
  const c = await cookies();
  
    try {
      const raw = c.get('publicKey')?.value;
      const releaseSignatureKey = raw ? decodeURIComponent(raw) : undefined;

      if (!releaseSignature) {
        throw new Error('Missing event signature');
      }

      if (!releaseSignatureKey) {
        throw new Error('Missing publicKey cookie');
      }
      
      const { iss, aud } = jwt.verify(
        releaseSignature,
        `-----BEGIN PUBLIC KEY-----\n${releaseSignatureKey}\n-----END PUBLIC KEY-----`,
        { algorithms: ['RS512']},
      ) as JwtPayload;
      if (iss !== 'poool' && aud !== process.env.NEXT_PUBLIC_POOOL_ID ) {
        throw new Error('Issue with event signature');
      }
      
    } catch (e) {
      console.log(e);
      return { error: 'Invalid release signature' };
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
