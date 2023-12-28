import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [select, setSelect] = useState(false);

  useEffect(()=>{
    setSelect(true);
  },[])
  return (
    <div className=" width-full pt-4 m-20 mt-0 mb-0">
      <h1 className="text-xl text-black font-bold text-left mb-5 ml-0">
        Create Flashcard
      </h1>
      <nav className="flex items-center space-x-10   border-gray-300 ">
        <NavLink
          to={"/"}
          className={select? "text-sm font-bold    border-b-2 border-red-500 text-red-500 pb-2" :"text-sm font-bold  text-gray-400  border-b-2   focus:text-red-500 pb-2"}
          onClick={()=>setSelect(true)}
          
        >
          Create New
        </NavLink>

        <NavLink
          to={"/myflashcard"}
          className={!select? "text-sm font-bold    border-b-2 border-red-500 text-red-500 pb-2" :"text-sm font-bold  text-gray-400  border-b-2   focus:text-red-500 pb-2"}

          onClick={()=>setSelect(false)}
        >
          My Flashcards
        </NavLink>
      </nav>
      <hr className="border bg-slate-300 border-slate-300 mb-8"></hr>
    </div>
  );
};

export default NavBar;
