import React from "react";
import Graph from "./Graph/Graph";
import UserHistory from "./History/UserHistory";

const UserDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl text-zinc-200 font-bold p-4">User Dashboard</h1>
      <div>
        <h1 className="text-xl text-center text-zinc-200 font-bold pb-4">
          Your Expenditures
        </h1>
        <Graph />
      </div>
      <div>
        <UserHistory />
      </div>
    </div>
  );
};

export default UserDashboard;
