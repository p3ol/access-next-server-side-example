import { NextRequest } from 'next/server';
import { headers } from 'next/headers';

import { articles } from '~/db';

export const GET = async (
  _: NextRequest,
  { params }: { params: { articleId: string } }
) => {
  const { articleId } = await params;
  const article = articles.find(article => article.id === Number(articleId));

  if (!article) {
    return new Response('not_found', {
      status: 404,
    });
  }

  const { content, ...articleWithoutContent } = article;

  return new Response(JSON.stringify(articleWithoutContent), {
    status: 200,
  });
};

export const POST = async (
  _: NextRequest,
  { params }: { params: { articleId: string } }
) => {
  const { articleId } = await params;
  const article = articles.find(article => article.id === Number(articleId));
  const headersList = await headers();
  const authorization = headersList.get('authorization');

  if (authorization !== `Bearer ${process.env.PRIVATE_KEY}`) {
    return new Response('unauthorized', {
      status: 401,
    });
  }

  if (!article) {
    return new Response('unauthorized', {
      status: 404,
    });
  }

  return new Response(JSON.stringify(article), {
    status: 200,
  });
};
