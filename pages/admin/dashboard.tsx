import React from "react";
import FeaturedInfo from "../../components/cards/FeaturedInfo";

function dashboard() {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-xs text-blue-400 tracking-widest font-medium title-font mb-1">
            Welcome
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-white">
            Here are your overall statistics
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          <FeaturedInfo />
          <FeaturedInfo />
          <FeaturedInfo />
        </div>
      </div>
    </section>
  );
}

export default dashboard;
