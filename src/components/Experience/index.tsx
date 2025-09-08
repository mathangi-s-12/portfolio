// Libs
import { useContext } from "react";
import Markdown from "react-markdown";
// Contexts
import { ContentContext } from "@src/contexts";
import { getTopicData } from "@src/utils";
// Styles
import "./index.css";

const Experience = () => {
  const { data } = useContext(ContentContext);
  const unsortedExperienceData = getTopicData(
    "decap-content/experience/",
    data
  );
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
      className="h-dvh bg-bg py-[4rem] px-[8rem] flex items-center justify-between overflow-hidden w-full"
      style={{
        timelineScope: `${timelineScopes.join(", ")}`,
      }}
    >
      <div
        className="company-details flex flex-col flex-1 h-full pr-[20rem] overflow-auto"
        onScroll={onScrollExperience}
      >
        <h1 className="text-2xl font-bold text-card-bg-1 mb-[4rem]">
          Places that paid me to code
        </h1>
        {experienceData.map(
          ({ company, role, from, to, work_summary }, idx) => {
            const indexMod3 = (idx % 3) + 1;
            const reverseIndexMod3 = 4 - indexMod3;

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
                className={`company-details-card flex flex-col gap-2 text-card-text-${reverseIndexMod3} mb-[12rem]`}
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
      <div className="relative h-[15rem] w-[15rem] flex items-center justify-center">
        {experienceData.map(({ logo, company }, idx) => {
          const indexMod3 = (idx % 3) + 1;
          const reverseIndexMod3 = 4 - indexMod3;

          return (
            <div
              key={company}
              className={`company-logo-card h-[15rem] w-[15rem] min-w-[15rem] p-[1rem] rounded-[0.5rem] flex items-center justify-center bg-card-bg-${reverseIndexMod3} z-${
                experienceData.length - idx
              } absolute left-0 top-0`}
              style={{ animationTimeline: timelineScopes[idx] }}
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

export default Experience;
