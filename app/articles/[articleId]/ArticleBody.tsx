'use client';

import { useRef, useState } from 'react';
import { AccessContext, Paywall } from '@poool/react-access';

import type { ArticleItem } from '~/types';
import { releaseArticle } from '~/actions';

export interface ArticleBodyProps {
  _article: ArticleItem;
}

const ArticleBody = ({ _article }: ArticleBodyProps) => {
  const [article, setArticle] = useState(_article);
  const contentRef = useRef();

  const onRelease = async (): Promise<void> => {
    try {
      const releasedArticle = await releaseArticle(article.id);

      if (releasedArticle) {
        setArticle(releasedArticle);
      } else {
        console.error('Failed to release article');
      }
    } catch (error) {
      console.error('Error');
    }
  };

  return (
    <AccessContext
      appId={process.env.NEXT_PUBLIC_POOOL_ID as string}
      config={{ cookies_enabled: true, force_widget: 'gift' }}
    >
      <p>{ article.content || article.preview }</p>
      <Paywall
        id="paywall"
        contentRef={contentRef}
        events={{
          outdatedBrowser: () => {},
          release: onRelease,
        }}
      />
    </AccessContext>
  );
};

export default ArticleBody;
