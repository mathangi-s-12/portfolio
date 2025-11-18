// Custom hooks
import useGetDecapContent from "@src/custom-hooks/useGetDecapContent";
// Context
import { ContentContextProvider } from "@src/contexts";
// Components
import About from "@src/components/About";
import Skills from "@src/components/Skills";
import Experience from "@src/components/Experience";
import Header from "@src/components/Header";
import Projects from "@src/components/Projects";
import ContactForm from "@src/components/ContactForm";

export default function HomePage() {
  const { loading, data } = useGetDecapContent();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ContentContextProvider value={{ loading, data }}>
      <Header />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <ContactForm />
    </ContentContextProvider>
  );
}
