// Libs
import { useContext } from "react";
// Contexts
import { ContentContext, ThemeContext } from "@src/contexts";
import { getTopicData } from "@src/utils";
// Types
import type { Skill } from "@src/types-and-interfaces/interfaces";
// Components
import SkillChart from "./components/SkillsPieChart";
// Utils
import { capitalize } from "@src/utils";

const Skills = () => {
  const { data } = useContext(ContentContext);
  const { theme } = useContext(ThemeContext);
  const skillsData = getTopicData(
    "decap-content/skills/",
    data
  ) as unknown as Skill[];

  const convertToHighchartsDataPoints = (skills: Skill[]) => {
    const skillLevelZAxisMap = {
      beginner: 7,
      intermediate: 8,
      expert: 10,
    }; // Radius of individual points based on skill level
    const skillLevelColorMap = {
      beginner: "var(--card-bg-color-3)",
      intermediate: "var(--card-bg-color-2)",
      expert: "var(--card-bg-color-1)",
    };

    const dataPoints = skills.map((skill) => ({
      name: skill.skill,
      y: skill.years_of_experience,
      z: skillLevelZAxisMap[skill.level],
      color: skillLevelColorMap[skill.level],
      custom: {
        logo:
          theme === "dark" && skill.logo_dark ? skill.logo_dark : skill.logo,
        years: skill.years_of_experience,
        level: capitalize(skill.level),
        logoWidth: skill.logo_with_text ? "40px" : "30px",
      },
    }));

    dataPoints.sort(({ z: zA }, { z: zB }) => {
      return zA - zB;
    });

    return dataPoints;
  };

  const frontendSkills = skillsData.filter((skill) => skill.type === "FE");
  const backendSkills = skillsData.filter((skill) => skill.type === "BE");
  const otherSkills = skillsData.filter((skill) => skill.type === "O");

  const frontendDataPoints = convertToHighchartsDataPoints(frontendSkills);
  const backendDataPoints = convertToHighchartsDataPoints(backendSkills);
  const otherDataPoints = convertToHighchartsDataPoints(otherSkills);

  return (
    <div
      id="skills"
      className="h-fit w-full bg-bg py-[4rem] px-[8rem] flex flex-col text-text"
    >
      <h1 className="text-2xl font-bold text-card-bg-1 mb-[4rem]">
        Skill tree progress: Frontend maxed, Backend leveling up
      </h1>
      <div className="flex items-center gap-3 self-center-safe mb-[3rem]">
        <span className="flex items-center gap-2">
          <span className="bg-card-bg-1 h-[8px] w-[8px] rounded-full" />
          Expert
        </span>
        <span className="flex items-center gap-2">
          <span className="bg-card-bg-2 h-[8px] w-[8px] rounded-full" />
          Intermediate
        </span>
        <span className="flex items-center gap-2">
          <span className="bg-card-bg-3 h-[8px] w-[8px] rounded-full" />
          Beginner
        </span>
      </div>
      <div className="grid grid-cols-2 gap-[4rem]">
        <div className="w-full">
          <SkillChart title="Frontend Skills" data={frontendDataPoints} />
        </div>
        <div className="w-full">
          <SkillChart title="Backend Skills" data={backendDataPoints} />
        </div>
        <div className="col-span-2 justify-self-center">
          <SkillChart title="Other Skills" data={otherDataPoints} />
        </div>
      </div>
    </div>
  );
};

export default Skills;
