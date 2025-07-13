import React from "react";
import { Button } from "./ui/button";

const EmpoweringWomenSection = () => {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 max-w-2xl">
          Empowering the next generation of women leaders.
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl">
          DébboAfrica Student Hub is more than just a student community. It’s a
          movement committed to helping young women prioritize their health,
          grow in leadership, and thrive in their education and careers.
        </p>
        <p className="text-gray-700 mb-6 max-w-2xl">
          Through our Campus Ambassador Program, we’re building a powerful
          network of changemakers across Nigerian universities who are
          passionate about driving conversations around women’s health,
          innovation, equity, and empowerment.
        </p>
      </div>
      <div className="flex flex-col gap-4 mb-6 max-w-md">
        <div className="px-3 py-2 bg-[--surface-card] rounded-lg">
          Lead impactful initiatives on your campus
        </div>
        <div className="px-3 py-2  bg-[--surface-card] rounded-lg">
          Join a global sisterhood of young women driving change
        </div>
        <div className="px-3 py-2  bg-[--surface-card] rounded-lg">
          Access mentorship, learning, and leadership opportunities
        </div>
        <div className="px-3 py-2  bg-[--surface-card] rounded-lg">
          Champion wellness, innovation, and education within your community
        </div>
        <Button className="px-5 py-3 w-full md:w-fit bg-black text-white rounded-full hover:bg-gray-800 transition">
          Become an Ambassador →
        </Button>
      </div>
    </section>
  );
};

export default EmpoweringWomenSection;
