// Libs
import { useContext } from "react";
// Contexts
import { ContentContext } from "@src/contexts";
// Utils
import { getTopicData } from "@src/utils";
// Types
import type { About, Contact } from "@src/types-and-interfaces/interfaces";
// Compoenents
import ThemeSwitch from "@src/components/ThemeSwitch";

const AboutSection = () => {
  const { data } = useContext(ContentContext);

  const aboutDataArray = getTopicData(
    "decap-content/about/",
    data
  ) as unknown as About[];
  const aboutData = aboutDataArray[0] || {};

  const contactData = getTopicData(
    "decap-content/contact-info/",
    data
  ) as unknown as Contact[];

  console.log("Contact Data:", contactData);

  return (
    <div className="bg-bg p-[3rem] flex flex-col h-dvh">
      <div className="flex items-center justify-around text-text">
        <div className="left flex flex-col gap-4 h-fit">
          <h1 className="text-5xl font-bold text-card-bg-1">
            {aboutData.title}
          </h1>
          <p className="text-2xl">{aboutData.role}</p>
          <p className="text-xl">{aboutData.about}</p>
          <p className="text-xl">{aboutData.skills.join(" | ")}</p>
        </div>
        <div className="right">
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
