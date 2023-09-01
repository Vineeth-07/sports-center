import { useMatchesState } from "../../context/matches/context";

export default function MatchListItems() {
  let state: any = useMatchesState();
  const { matches, isLoading, isError, errorMessage } = state;

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }
  return (
    <>
      {matches.map(
        (match: any) =>
          match.isRunning && (
            <div
              key={match.id}
              className="suspense-loading block match p-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <div className="flex justify-between">
                <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                  <span className="font-bold ">{match.sportName}</span>
                </h5>
              </div>
              <p className="mb-2 font-medium tracking-tight text-gray-900 dark:text-white">
                <span className="font-semibold flex justify-left">
                  {" "}
                  {match.name.split("at")[0]}
                </span>
                <span className="flex justify-left">
                  {" "}
                  <span className="font-bold ">Location : </span>
                  {match.location}
                </span>
                <span className="flex justify-left">
                  {" "}
                  <span className="font-bold">Time :</span>{" "}
                  {match.endsAt.slice(0, 10)},{match.endsAt.slice(11, 16)}
                </span>
              </p>
            </div>
          )
      )}
    </>
  );
}
