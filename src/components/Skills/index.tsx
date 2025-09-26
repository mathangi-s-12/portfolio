// Libs
import { useContext } from "react";
// Contexts
import { ContentContext } from "@src/contexts";
import { getTopicData } from "@src/utils";
// Types
import type { Skill } from "@src/types-and-interfaces/interfaces";
// Components
import SkillChart from "./components/SkillsPieChart";
// Utils
import { capitalize } from "@src/utils";

const Skills = () => {
  const { data } = useContext(ContentContext);
  const skillsData = getTopicData(
    "decap-content/skills/",
    data
  ) as unknown as Skill[];

  const convertToHighchartsDataPoints = (skills: Skill[]) => {
    const y = 5; // Fixed width for all points
    const skillLevelZAxisMap = {
      beginner: 6,
      intermediate: 9,
      expert: 12,
    }; // Radius of individual points based on skill level
    const skillLevelColorMap = {
      beginner: "var(--card-bg-color-3)",
      intermediate: "var(--card-bg-color-2)",
      expert: "var(--card-bg-color-1)",
    };

    const dataPoints = skills.map((skill) => ({
      name: skill.skill,
      y,
      z: skillLevelZAxisMap[skill.level],
      color: skillLevelColorMap[skill.level],
      custom: { logo: skill.logo, years: y, level: capitalize(skill.level) },
    }));

    return dataPoints;
  };

  const frontendSkills = skillsData.filter((skill) => skill.type === "FE");
  const backendSkills = skillsData.filter((skill) => skill.type === "BE");
  const otherSkills = skillsData.filter((skill) => skill.type === "O");

  const frontendDataPoints = convertToHighchartsDataPoints(frontendSkills);
  const backendDataPoints = convertToHighchartsDataPoints(backendSkills);
  const otherDataPoints = convertToHighchartsDataPoints(otherSkills);

  return (
    <div id="skills" className="h-fit bg-bg py-[4rem] px-[8rem] w-full">
      <h1 className="text-2xl font-bold text-card-bg-1 mb-[5rem]">
        Skill Tree Progress: Frontend Maxed, Backend Leveling Up
      </h1>
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
