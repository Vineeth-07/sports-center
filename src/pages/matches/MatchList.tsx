import React, { useEffect } from "react";
import { fetchMatches } from "../../context/matches/action";
import { useMatchesDispatch } from "../../context/matches/context";
import MatchListItems from "./MatchListItems";

const MatchList: React.FC = () => {
  const dispatchMembers = useMatchesDispatch();

  useEffect(() => {
    fetchMatches(dispatchMembers);
  }, []);

  return (
    <div className="suspense-loading grid gap-4 grid-cols-4 mt-5">
      <MatchListItems />
    </div>
  );
};
export default MatchList;
