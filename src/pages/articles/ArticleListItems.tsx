import { useArticlesState } from "../../context/articles/context";
import ArticleDetails from "./ArticleDetails";

export default function ArticleListItems() {
  let state: any = useArticlesState();

  const { articles, isLoading, isError, errorMessage } = state;
  console.log(articles);

  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }
  const renderArticleDetailsWithId = (id: number) => {
    return <ArticleDetails id={id} />;
  };
  return (
    <>
      {articles.map((article: any) => (
        <div
          key={article.id}
          className="container flex-1 rounded mx-auto border border-black flex"
        >
          <div className=" object-cover">
            <img
              className="h-40 w-40 static border-4 rounded-xl border-gray-300 object-cover"
              src={article.thumbnail}
            />
          </div>
          <div className="px-4 py-4">
            <span className="mb-2 font-medium tracking-tight text-gray-900 dark:text-white">
              {article.sport.name}
              <p className="font-bold ">
                <span className=""> {article.title}</span>
              </p>
              <p>
                <span className=""> {article.summary}</span>
              </p>
              <p className="">Date : {article.date.slice(0, 10)}</p>
            </span>
            <div className="flex justify-left">
              {renderArticleDetailsWithId(article.id)}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
