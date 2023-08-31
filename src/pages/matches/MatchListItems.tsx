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
      {matches.map((match: any) => (
        <div
          key={match.id}
          className="suspense-loading block member p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="flex justify-between">
            <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
              <span className="font-bold">Name : </span>
              {match.sportName}
            </h5>
          </div>
          <p className="mb-2 font-medium tracking-tight text-gray-900 dark:text-white">
            <span className="font-bold">Email : </span>
            {match.name} {match.endsAt}
          </p>
        </div>
      ))}
    </>
  );
}
