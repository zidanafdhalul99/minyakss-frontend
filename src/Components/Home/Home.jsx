import React from "react";
import Content from "./Content";
import IconComponent from "./IconComponent";

function Home() {
  return (
    <>
      <div className="flex flex-col bg-gray-100 h-screen">
        <div className="flex gap-3 mt-2 rounded-3xl h-12 w-screen">
          <div className="flex items-center pt-2 pl-3">
            <div className=" text-3xl text-gray-700 font-mono">Minyakss</div>
          </div>
        </div>
        <div className="flex flex-col mt-8 bg-white w-full rounded-t-3xl pb-3">
          <IconComponent />
        </div>
        <Content />
      </div>
    </>
  );
}

export default Home;
