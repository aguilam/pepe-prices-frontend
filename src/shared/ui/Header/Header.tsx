import React from "react";
import { Link } from "react-router-dom";
const Header: React.FC = React.memo(() => {
  return (
    <header className="bg-header-footer-color text-white px-32 py-4 shadow-md  flex items-center justify-between ">
      <div className=" flex items-center gap-5">
        <Link to={"/"} className=" flex items-center gap-5">
          <img src="/pepe-price-logo.png" alt="" className=" w-10 h-10" />
          <h1 className="text-xl font-bold">Pepe Price</h1>
        </Link>
      </div>
      <div>
        <Link to={"/helpproject"}>Помочь проекту</Link>
      </div>
    </header>
  );
});
export default Header;
