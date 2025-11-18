// Libs
import { useContext } from "react";
import Markdown from "react-markdown";
// Contexts
import { ContentContext } from "@src/contexts";
import { getTopicData } from "@src/utils";
// Types
import type { Experience } from "@src/types-and-interfaces/interfaces";
// Styles
import "./index.css";

const bgColorsArray = ["bg-card-bg-3", "bg-card-bg-2", "bg-card-bg-1"];

const ExperienceSection = () => {
  const { data } = useContext(ContentContext);
  const unsortedExperienceData = getTopicData(
    "decap-content/experience/",
    data
  ) as unknown as Experience[];
  const experienceData = unsortedExperienceData.sort((a, b) => {
    const aFromDate = a.from.split(".").reverse().join("-");
    const bFromDate = b.from.split(".").reverse().join("-");
    const dateA = new Date(aFromDate).getTime();
    const dateB = new Date(bFromDate).getTime();
    return dateB - dateA;
  });

  const timelineScopes = experienceData.map(
    ({ company }) => `--${company}-view`
  );

  const onScrollExperience = (e: React.UIEvent<HTMLDivElement>) => {
    e.currentTarget.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <div
      id="experience"
      className="bg-bg h-dvh w-full overflow-hidden relative"
      style={{
        timelineScope: `${timelineScopes.join(", ")}`,
      }}
    >
      <div
        className="company-details py-[4rem] pl-[8rem] pr-[30rem] flex flex-col flex-1 overflow-auto absolute left-0 top-0 h-full h-max-[100%] w-full z-10"
        onScroll={onScrollExperience}
      >
        <h1 className="text-2xl font-bold text-card-bg-1 mb-[4rem]">
          Places that paid me to code
        </h1>
        {experienceData.map(
          ({ company, role, from, to, work_summary }, idx) => {
            const fromDate = from.split(".").reverse().join("-");
            const toDate = to.split(".").reverse().join("-");
            const dateOptions = { year: "numeric", month: "short" };
            const fromString = new Date(fromDate).toLocaleDateString(
              "en-US",
              dateOptions as Intl.DateTimeFormatOptions
            );
            const toString = new Date(toDate).toLocaleDateString(
              "en-US",
              dateOptions as Intl.DateTimeFormatOptions
            );

            return (
              <div
                key={company}
                className="company-details-card flex flex-col gap-2 text-text mb-[12rem]"
                style={{ viewTimeline: timelineScopes[idx] }}
              >
                <div className="text-xl font-bold">
                  {company} - {role}
                </div>
                <div>
                  {fromString} to {toString}
                </div>
                <div className="work-summary mt-2">
                  <Markdown>{work_summary}</Markdown>
                </div>
              </div>
            );
          }
        )}
      </div>
      <div className="h-[15rem] w-[15rem] flex items-center justify-center absolute top-[50%] right-[7.5rem] translate-y-[-50%] z-5">
        {experienceData.map(({ logo, company }, idx) => {
          const indexMod3 = idx % 3;

          return (
            <div
              key={company}
              className={`company-logo-card h-[15rem] w-[15rem] min-w-[15rem] p-[1rem] rounded-[0.5rem] flex items-center justify-center ${bgColorsArray[indexMod3]} absolute left-0 top-0`}
              style={{
                animationTimeline: timelineScopes[idx],
                zIndex: experienceData.length - idx,
              }}
            >
              <img
                className="company-logo-image max-h-[100%]"
                src={logo}
                alt={`${company}-logo`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceSection;
