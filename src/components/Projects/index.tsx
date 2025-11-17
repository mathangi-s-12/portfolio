// Libs
import { useContext } from "react";
// Contexts
import { ContentContext } from "@src/contexts";
import { getTopicData } from "@src/utils";
// Types
import type { Project } from "@src/types-and-interfaces/interfaces";
// Styles
import "./index.css";

const textColorsArray = [
  "text-card-text-3",
  "text-card-text-2",
  "text-card-text-1",
];

const bgColorsArray = ["bg-card-bg-3", "bg-card-bg-2", "bg-card-bg-1"];

const Projects = () => {
  const { data } = useContext(ContentContext);
  const projectData = getTopicData(
    "decap-content/projects/",
    data
  ) as unknown as Project[];

  projectData.push({
    project: "More projects soon...",
    date_released: "",
    project_summary: "",
    project_image: "",
    project_links: [],
    project_tech: [],
  });

  return (
    <div
      id="projects"
      className="relative py-[4rem] bg-bg flex flex-col gap-[5rem] h-fit"
      style={
        Object.assign(
          {},
          { ["--numcards"]: projectData.length }
        ) as React.CSSProperties
      }
    >
      <h1 className="px-[8rem] text-2xl font-bold text-card-bg-1">
        A taste of what I've built
      </h1>
      {projectData.map(
        (
          {
            project,
            project_summary,
            date_released,
            project_image,
            project_links,
            project_tech,
          },
          idx
        ) => {
          const indexMod3 = idx % 3;
          const indexPlus2Mod3 = (idx + 2) % 3;

          return (
            <div
              key={project}
              className={`project-card sticky top-[calc(6rem+32px)] left-[50%] translate-x-[-12%] flex gap-5 overflow-hidden ${bgColorsArray[indexMod3]} ${textColorsArray[indexMod3]} h-fit min-h-[300px] max-h-[80%] w-[80%] p-5 shadow-md rounded-md`}
              style={
                Object.assign(
                  {},
                  { ["--index"]: idx + 1 }
                ) as React.CSSProperties
              }
            >
              {project_image ? (
                <div className="min-w-[25%] flex items-center justify-center">
                  <img src={project_image} alt={`${project}_image`} />
                </div>
              ) : null}

              <div className="flex flex-col gap-3 flex-1">
                {project ? (
                  <h2 className="text-xl font-semibold">{project}</h2>
                ) : null}
                {date_released ? <div>{date_released}</div> : null}
                {project_summary ? (
                  <div className="flex-1 h-fit overflow-auto">
                    {project_summary}
                  </div>
                ) : null}
                {project_links.length ? (
                  <div className="w-full mt-2 flex gap-2">
                    {project_links.map((linkObj) => {
                      return (
                        <>
                          {"website_link" in linkObj && linkObj.website_link ? (
                            <a
                              className={`shadow-md flex items-center justify-center rounded-full py-1 px-2 text-sm cursor-pointer font-semibold ${bgColorsArray[indexPlus2Mod3]} ${textColorsArray[indexPlus2Mod3]}`}
                              href={linkObj.website_link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Website
                            </a>
                          ) : null}
                          {"github_link" in linkObj && linkObj.github_link ? (
                            <a
                              className={`shadow-md flex items-center justify-center rounded-full py-1 px-2 text-sm cursor-pointer font-semibold ${bgColorsArray[indexPlus2Mod3]} ${textColorsArray[indexPlus2Mod3]}`}
                              href={linkObj.github_link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              GitHub
                            </a>
                          ) : null}
                        </>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              {project_tech.length ? (
                <div className="flex flex-col gap-2">
                  {project_tech.map((tech) => (
                    <div
                      key={tech}
                      className={`shadow-md flex items-center justify-center rounded-full py-1 px-2 text-sm font-semibold ${bgColorsArray[indexPlus2Mod3]} ${textColorsArray[indexPlus2Mod3]}`}
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        }
      )}
    </div>
  );
};

export default Projects;
