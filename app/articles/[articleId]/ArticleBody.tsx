'use client';

import { useState } from 'react';
import { AccessContext, Paywall, Pixel } from '@poool/react-access';

import type { ArticleItem } from '~/types';
import { releaseArticle } from '~/actions';

export interface ArticleBodyProps {
  _article: ArticleItem;
}

const ArticleBody = ({ _article }: ArticleBodyProps) => {
  const [article, setArticle] = useState(_article);

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
      withAudit={true}
    >
      <p>{ article.content || article.preview }</p>
      <Paywall
        id="paywall"
        events={{
          outdatedBrowser: () => {},
          release: onRelease,
        }}
      />

      <Pixel type="page-view" pageType="premium" />
    </AccessContext>
  );
};

export default ArticleBody;
