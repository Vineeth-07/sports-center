import React from "react";
import AccountLayout from "../../layouts/account";
import Matches from "../matches";

const Dashboard: React.FC = () => {
  return (
    <div className=" static min-h-screen flex-row justify-center bg-gray-100">
      <AccountLayout />
      <Matches />
    </div>
  );
};

export default Dashboard;
