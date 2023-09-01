import React, { useEffect } from "react";
import { fetchArticles } from "../../context/articles/action";
import { useArticlesDispatch } from "../../context/articles/context";
import ArticleListItems from "./ArticleListItems";

const ArticleList: React.FC = () => {
  const dispatchArticles = useArticlesDispatch();

  useEffect(() => {
    fetchArticles(dispatchArticles);
  }, []);

  return (
    <div className="suspense-loading grid gap-4 grid-cols-4 mt-5">
      <ArticleListItems />
    </div>
  );
};
export default ArticleList;
