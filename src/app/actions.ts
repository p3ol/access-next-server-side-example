'use server'

export async function releaseArticle(id: Number) {
  const response = await fetch(`http://localhost:3001/api/articles/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.PRIVATE_KEY}`
    },
    body: JSON.stringify({ action: 'release' }),
    
  });
  const data = await response.json();
  return data;
}