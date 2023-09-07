import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useArticlesState } from "../../context/articles/context";
import ArticleDetails from "./ArticleDetails";
import { Tab } from "@headlessui/react";
import { fetchArticles } from "../../context/articles/action";

export default function ArticleListItems() {
  let state: any = useArticlesState();

  const { articles, isLoading, isError, errorMessage } = state;

  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }
  const renderArticleDetailsWithId = (id: number) => {
    return <ArticleDetails id={id} />;
  };

  type Sports = {
    id: number;
    name: string;
  };
  const [sports, setSports] = useState<Sports[]>([]);

  useEffect(() => {
    const fetchSports = async () => {
      const response = await fetch(`${API_ENDPOINT}/sports`, {
        method: "GET",
      });
      const data = await response.json();
      setSports(data.sports);
    };

    fetchSports();
  }, []);

  const [selectedSport, setSelectSport] = useState(1);
  useEffect(() => {
    fetchArticles(selectedSport);
  }, [selectedSport]);

  const selectSport = (id: number) => {
    setSelectSport(id);
  };

  return (
    <>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded p-1 ">
          <Tab>
            {sports.map((sport: any) => (
              <button
                key={sport.id}
                className={
                  selectedSport === sport.id
                    ? "active border-2 p-2 m-2 ml-6 border-black rounded-lg"
                    : "p-2 m-2 border-black rounded-lg ml-6"
                }
                onClick={() => selectSport(sport.id)}
              >
                {" "}
                {sport.name}
              </button>
            ))}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {articles.map(
        (article: any) =>
          article.sport.id === selectedSport && (
            <div
              key={article.id}
              className="w-8/12 container flex-1 rounded border border-black flex "
            >
              <div className=" object-cover">
                <img
                  className="h-40 w-40 static border-4 rounded-xl border-gray-300 object-cover relative"
                  src={article.thumbnail}
                />
              </div>
              <div className="px-4 py-4">
                <span className="mb-2 font-medium tracking-tight text-gray-900 dark:text-white ">
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
          )
      )}
    </>
  );
}
