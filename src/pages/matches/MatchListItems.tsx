import { useMatchesState } from "../../context/matches/context";
import MatchDetails from "./MatchDetails";
import { Ripples } from "@uiball/loaders";

export default function MatchListItems() {
  let state: any = useMatchesState();
  const { matches, isLoading, isError, errorMessage } = state;

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }
  const renderMatchDetailsWithId = (id: number) => {
    return <MatchDetails id={id} />;
  };
  return (
    <>
      <div className="flex gap-4 w-full border-b-2 pt-6 pb-6">
        {matches.map((match: any) => (
          <div
            key={match.id}
            className="ml-2 flex-shrink-0 h-40 w-64 p-2 border-2 border-black rounded-lg"
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">{match.sportName}</h2>
              {match.isRunning ? (
                <Ripples size={30} speed={2} color="green" />
              ) : (
                <Ripples size={30} speed={2} color="red" />
              )}
            </div>

            <div key={match.endsAt}>
              <h1 className="font-bold pt-1">{match.name.split("at")[0]}</h1>
              <div>{renderMatchDetailsWithId(match.id)}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
