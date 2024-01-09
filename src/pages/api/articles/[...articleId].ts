
import { NextApiRequest, NextApiResponse } from 'next';

import { articles } from '@/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const { articleId } = req.query;
  const article = articles.find((article) => article.id === Number(articleId));

  if (req.method === 'POST') {
    if (req.headers.authorization !== `Bearer ${process.env.PRIVATE_KEY}`) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }
    res.status(200).json(article);
    return;
  }

  if (!article) {
    res.status(404).json({ message: 'Article not found' });
    return;
  }

  const { content, ...articleWithoutContent } = article;
  res.status(200).json(articleWithoutContent);
}
