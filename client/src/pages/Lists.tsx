import React from "react";
import UserLists from "../components/UserLists/UserLists";

const Lists: React.FC = () => {
  return (
    <div className="h-[83vh] overflow-scroll">
      <UserLists />
    </div>
  );
};

export default Lists;
