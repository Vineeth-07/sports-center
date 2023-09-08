import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useArticlesState } from "../../context/articles/context";
import ArticleDetails from "../articles/ArticleDetails";
import { fetchTeams } from "../../context/teams/action";
import { fetchArticles } from "../../context/articles/action";

export default function Favourites() {
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
  type Teams = {
    id: number;
    name: string;
    plays: string;
  };
  const [sports, setSports] = useState<Sports[]>([]);
  const [teams, setTeams] = useState<Teams[]>([]);

  useEffect(() => {
    const fetchSports = async () => {
      const response = await fetch(`${API_ENDPOINT}/sports`, {
        method: "GET",
      });
      const data = await response.json();
      setSports(data.sports);
    };
    fetchSports();
    const fetchTeams = async () => {
      const response = await fetch(`${API_ENDPOINT}/teams`, {
        method: "GET",
      });
      const data = await response.json();
      setTeams(data);
    };
    fetchTeams();
    fetchSports();
  }, []);
  console.log(sports);
  console.log(teams);

  const [selectedSport, setSelectSport] = useState(1);
  useEffect(() => {
    fetchArticles(selectedSport);
  }, [selectedSport]);

  const selectSport = (id: number) => {
    setSelectSport(id);
  };

  const [selectedTeam, setSelectTeam] = useState(1);
  useEffect(() => {
    fetchTeams(selectedTeam);
  }, [selectedSport]);

  const selectTeam = (id: number) => {
    setSelectTeam(id);
  };

  return (
    <>
      <div>
        <h1>Favourites</h1>
        <label htmlFor="sports">Sports:</label>
        <select
          name="sports"
          id="sports"
          onChange={(e) => selectSport(parseInt(e.target.value, 10))}
        >
          <option value="">Select a sport</option>
          {sports.map((sport: any) => (
            <option key={sport.id} value={sport.id}>
              {sport.name}
            </option>
          ))}
        </select>
        <label htmlFor="teams">Teams:</label>
        <select
          name="teams"
          id="teams"
          onChange={(e) => selectTeam(parseInt(e.target.value, 10))}
        >
          <option value="">Select a team</option>
          {teams.map((team: any) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        {articles.map(
          (article: any) =>
            article.sport.id === selectedSport &&
            Object.values(article.teams).some(
              (team: any) => team.id === selectedTeam
            ) && (
              <div
                key={article.id}
                className="bg-inherit overflow-y-auto h-screen"
              >
                <div
                  key={article.id}
                  className="bg-gray-300 p-4 m-2 rounded-lg"
                >
                  <h2 className="font-semibold text-lg">
                    {article.sport.name}
                  </h2>
                  <h2 className="text-lg">{article.title}</h2>

                  <p className="bg-gray-200 p-2 rounded-lg relative">
                    {article.summary.slice(0, 130)}...
                  </p>
                  <div className="flex justify-left">
                    {renderArticleDetailsWithId(article.id)}
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}
