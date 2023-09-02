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
        <div
          key={article.id}
          className="flex-col ml-6 pt-4 mt-1 suspense-loading block match p-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="flex justify-between ">
            <span className="mb-2 font-medium tracking-tight text-gray-900 dark:text-white">
              {article.sport.name}
            </span>
          </div>
          <p className="font-bold ">
            <span className="flex justify-left"> {article.title}</span>
          </p>
          <p>
            <span className="flex justify-left"> {article.summary}</span>
          </p>
          <p className="flex justify-between">
            Date : {article.date.slice(0, 10)}
          </p>
          <div className="w-8/12 h-48 flex justify-center p-2">
            <img
              className="h-40 w-10/12 static border-4 rounded-xl border-gray-300"
              src={article.thumbnail}
              alt=""
            />
          </div>
        </div>
      ))}
    </>
  );
}
