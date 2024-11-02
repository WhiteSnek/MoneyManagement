import React from "react";
import Graph from "./Graph/Graph";
import UserHistory from "./History/UserHistory";
import RadarGraph from "./RadarGraph/Graph";

const UserDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-xl sm:text-3xl text-zinc-200 font-bold p-4">User Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-12 px-4 gap-4">
      <div className="col-span-8 bg-zinc-800 rounded-lg ">
        <h1 className="text-sm sm:text-lg text-center text-zinc-200 font-bold py-4">
          Your Expenditures
        </h1>
        <Graph />
      </div>
      <div className="col-span-4 bg-zinc-800 rounded-lg">
        <h1 className="text-sm sm:text-lg text-center text-zinc-200 font-bold py-4">
          Categorized Expenditures
        </h1>
        <RadarGraph />
      </div>
      </div>
      <div>
        <UserHistory />
      </div>
    </div>
  );
};

export default UserDashboard;
