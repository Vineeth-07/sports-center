import React from "react";
import AccountLayout from "../../layouts/account";
import Matches from "../matches";
import Articles from "../articles";
import Favourites from "../favourites/Favourites";

const Dashboard: React.FC = () => {
  return (
    <div className=" static min-h-screen flex-row justify-center bg-gray-100">
      <AccountLayout />
      <Matches />
      <br />
      <div className="flex gap-0.5">
        <div className="w-11/12">
          {" "}
          <Articles />
        </div>
        <div className="w-4/12 justify-between">
          {" "}
          <Favourites />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
