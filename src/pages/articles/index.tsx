import ArticleList from "./ArticleList";

const Articles = () => {
  return (
    <>
      <h2 className="text-xl font-medium dark:text-white flex justify-left ml-9">
        Trending News
      </h2>
      <ArticleList />
    </>
  );
};

export default Articles;
