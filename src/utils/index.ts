import type { FileContent } from "@src/types-and-interfaces/interfaces";

const getTopicData = (topic: string, data: FileContent[]) => {
  const topicData = data.filter((item) => item.path.includes(topic));
  return topicData;
};

export { getTopicData };
