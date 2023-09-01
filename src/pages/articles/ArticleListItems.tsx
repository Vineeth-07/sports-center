import { useArticlesState } from "../../context/articles/context";

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
  return (
    <>
      {articles.map((article: any) => (
        <div key={article.id} className="flex flex-col">
          <div className="flex justify-between">
            <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
              <span className="font-bold ">{article.sport.name}</span>
            </h5>
          </div>
          <p className="mb-2 font-medium tracking-tight text-gray-900 dark:text-white">
            <span className="font-semibold flex justify-left">
              {" "}
              {article.title}
            </span>
          </p>
        </div>
      ))}
    </>
  );
}
