import React from "react";
import { MeContext } from "../providers/MeProvider";

const Header = () => {
  // @ts-ignore
  const { me, handleSetMe } = React.useContext(MeContext);

  const onLogOut = () => {
    handleSetMe(null);
  };

  return (
    <div className="">
      <ul className="flex gap-2 lg:gap-4 justify-end items-center font-semibold lg:text-lg">
        <li className="flex items-center p-1 gap-x-2">
          <span>Hello, </span>
          <a href="#" className="flex items-center underline text-blue-600">
            {me?.name}
          </a>
          <span>!</span>
        </li>
        <li className="flex items-center p-1 gap-x-2">
          <button
            onClick={onLogOut}
            className="flex items-center underline text-blue-600"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
