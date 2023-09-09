import React from "react";
import AccountLayout from "../../layouts/account";
import Matches from "../matches";
import Articles from "../articles";
import Favourites from "../favourites/Favourites";

const Dashboard: React.FC = () => {
  return (
    <div className=" static min-h-screen flex-row justify-center bg-gray-100 p-10">
      <AccountLayout />
      <Matches />
      <br />
      <div className="flex">
        <div>
          {" "}
          <Articles />
        </div>
        <div className="w-6/12 justify-between">
          {" "}
          <Favourites />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
