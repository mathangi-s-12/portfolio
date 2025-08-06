import { useEffect, useState } from "react";
import fm from "front-matter";

import type { FileContent } from "@types-and-interfaces/interfaces";

export default function useGetDecapContent() {
  const [data, setData] = useState<FileContent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      const files = import.meta.glob("../decap-content/**/*.md", {
        query: "?raw",
        import: "default",
      }) as Record<string, () => Promise<string>>;
      const filesData = await Promise.all(
        Object.entries(files).map(async ([path, resolver]) => {
          const raw = await resolver();
          const { attributes, body } = fm(raw);
          return {
            data: attributes as { [key: string]: string },
            content: body,
            path,
          };
        })
      );
      setData(filesData);
      setLoading(false);
    };
    loadData();
  }, []);

  return { loading, data };
}
