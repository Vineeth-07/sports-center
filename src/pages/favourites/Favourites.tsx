import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import {
  useArticlesDispatch,
  useArticlesState,
} from "../../context/articles/context";
import ArticleDetails from "../articles/ArticleDetails";
import { fetchTeams } from "../../context/teams/action";
import { fetchArticles } from "../../context/articles/action";
import { useTeamsDispatch } from "../../context/teams/context";

export default function Favourites() {
  const state: any = useArticlesState();
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
  interface PreferencesState {
    sports: string[];
    teams: string[];
  }
  const [preferences, setPreferences] = useState<PreferencesState>({
    sports: [],
    teams: [],
  });

  const [sports, setSports] = useState<Sports[]>([]);
  const [teams, setTeams] = useState<Teams[]>([]);
  const [selectedSport, setSelectSport] = useState<number | null>(null);
  const [selectedTeam, setSelectTeam] = useState<number | null>(null);

  useEffect(() => {
    const fetchSports = async () => {
      const response = await fetch(`${API_ENDPOINT}/sports`, {
        method: "GET",
      });
      const data = await response.json();
      setSports(data.sports);
    };

    const fetchTeamsData = async () => {
      const response = await fetch(`${API_ENDPOINT}/teams`, {
        method: "GET",
      });
      const data = await response.json();
      setTeams(data);
    };
    fetchSports();
    fetchTeamsData();
  }, []);

  useEffect(() => {
    const fetchPreferences = async () => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        setPreferences(data.preferences);
      }
    };
    fetchPreferences();
  }, []);
  const dispatchArticles = useArticlesDispatch();
  const dispatchTeams = useTeamsDispatch();

  useEffect(() => {
    if (selectedSport !== null) {
      fetchArticles(dispatchArticles);
    }
  }, []);

  useEffect(() => {
    if (selectedTeam !== null) {
      fetchTeams(dispatchTeams);
    }
  }, []);

  const selectSport = (id: number | null) => {
    setSelectSport(id);
    setSelectTeam(null);
  };

  const selectTeam = (id: number | null) => {
    setSelectTeam(id);
  };

  const filteredArticles = articles.filter((article: any) => {
    if (selectedSport !== null) {
      const sportMatches = article.sport.id === selectedSport;
      const teamMatches =
        selectedTeam === null ||
        Object.values(article.teams).some(
          (team: any) => team.id === selectedTeam
        );
      return sportMatches && teamMatches;
    } else {
      return true;
    }
  });
  const user = localStorage.getItem("authToken");

  return (
    <>
      {user &&
      Object.keys(preferences) &&
      (Object.keys(preferences).length > 0 ||
        Object.keys(preferences).length === 2) ? (
        <div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-medium dark:text-white">Favourites</h2>
          </div>
          <br />
          <select
            name="sports"
            id="sports"
            onChange={(e) => selectSport(parseInt(e.target.value, 10) || null)}
            className="p-2 border rounded-lg text-sm"
          >
            <option value="">Select a sport</option>
            {sports.map(
              (sport: any) =>
                preferences.sports.includes(sport.name) && (
                  <option key={sport.id} value={sport.id}>
                    {sport.name}
                  </option>
                )
            )}
          </select>
          <select
            name="teams"
            id="teams"
            onChange={(e) => selectTeam(parseInt(e.target.value, 10) || null)}
            className="p-2 border rounded-lg text-sm"
          >
            <option value="">Select a team</option>
            {teams
              .filter(
                (team) =>
                  selectedSport === null ||
                  sports.find((sport) => sport.id === selectedSport)?.name ===
                    team.plays
              )
              .map(
                (team: any) =>
                  preferences.teams.includes(team.name) && (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  )
              )}
          </select>
          {filteredArticles.map((article: any) => (
            <div key={article.id} className="bg-inherit">
              <div
                key={article.id}
                className="bg-purple-300 p-4 m-2 rounded-lg"
              >
                <h2 className="font-semibold text-lg">{article.sport.name}</h2>
                <h2 className="text-lg">{article.title}</h2>
                <p className="bg-red-300 p-2 rounded-lg relative">
                  {article.summary.slice(0, 130)}...
                </p>
                <div className="flex justify-left">
                  {renderArticleDetailsWithId(article.id)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-medium dark:text-white">Favourites</h2>
          </div>
          <br />
          <select
            name="sports"
            id="sports"
            onChange={(e) => selectSport(parseInt(e.target.value, 10) || null)}
            className="p-2 border rounded-lg text-sm"
          >
            <option value="">Select a sport</option>
            {sports.map((sport: any) => (
              <option key={sport.id} value={sport.id}>
                {sport.name}
              </option>
            ))}
          </select>
          <select
            name="teams"
            id="teams"
            onChange={(e) => selectTeam(parseInt(e.target.value, 10) || null)}
            className="p-2 border rounded-lg text-sm"
          >
            <option value="">Select a team</option>
            {teams
              .filter(
                (team) =>
                  selectedSport === null ||
                  sports.find((sport) => sport.id === selectedSport)?.name ===
                    team.plays
              )
              .map((team: any) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
          </select>
          {filteredArticles.map((article: any) => (
            <div key={article.id} className="bg-inherit">
              <div
                key={article.id}
                className="bg-purple-300 p-4 m-2 rounded-lg"
              >
                <h2 className="font-semibold text-lg">{article.sport.name}</h2>
                <h2 className="text-lg">{article.title}</h2>
                <p className="bg-red-300 p-2 rounded-lg relative">
                  {article.summary.slice(0, 130)}...
                </p>
                <div className="flex justify-left">
                  {renderArticleDetailsWithId(article.id)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
