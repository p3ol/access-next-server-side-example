import type { ArticleItem } from '~/types';
import ArticleBody from './ArticleBody';

export interface ArticleProps {
  params: {
    articleId: string;
  };
}

const Article = async ({
  params: { articleId },
}: ArticleProps) => {
  const article: ArticleItem = await fetch(
    `http://localhost:3000/api/articles/${articleId}`
  ).then((res) => res.json());

  return (
    <div className="flex flex-col items-center">
      <div className="w-1/2">
        <h1 className="text-5xl font-bold my-10 text-center">
          { article?.title }
        </h1>
        <p className="mb-10" >{ article?.header }</p>
        <ArticleBody _article={article} />
      </div>
    </div>
  );
};

export default Article;
