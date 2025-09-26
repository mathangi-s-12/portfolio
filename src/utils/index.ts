import type { FileContent } from "@src/types-and-interfaces/interfaces";

const getTopicData = (topic: string, data: FileContent[]) => {
  const topicData = data
    .filter((item) => item.path.includes(topic))
    .map((data) => data.data);
  return topicData;
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export { getTopicData, capitalize };
