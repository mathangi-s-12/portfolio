import useGetDecapContent from "@src/custom-hooks/useGetDecapContent";

import { ContentContextProvider } from "@src/contexts";

import About from "@src/components/About";

export default function HomePage() {
  const { loading, data } = useGetDecapContent();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ContentContextProvider value={{ loading, data }}>
      <About />
    </ContentContextProvider>
  );
}
