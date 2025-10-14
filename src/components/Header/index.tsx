import { useEffect, useRef, useState } from "react";

const Header = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 60) {
          headerRef.current.classList.add("shadow-md", "bg-bg/60");
        } else {
          headerRef.current.classList.remove("shadow-md", "bg-bg/60");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const sectionIds = [
      "about",
      "skills",
      "experience",
      "projects",
      "contact-form",
    ];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "0px 0px 0px 0px", threshold: 0.25 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const items = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact-form", label: "Contact" },
  ];

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      ref={headerRef}
      className="w-full fixed h-[68px] px-[8rem] flex items-center justify-between bg-bg z-50 top-0 left-0"
    >
      <div className="h-[40px] w-[40px] max-w-[40px] bg-card-bg-1 text-white rounded-sm flex items-center justify-center">
        MS
      </div>
      <nav
        className="flex items-center text-text font-semibold gap-8 h-full"
        aria-label="Main"
      >
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <div
              key={it.id}
              role="button"
              tabIndex={0}
              onClick={() => handleClick(it.id)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && handleClick(it.id)
              }
              aria-current={isActive ? "page" : undefined}
              className={`cursor-pointer transition-colors duration-150 font-semibold ${
                isActive ? "text-card-bg-1" : ""
              }`}
            >
              {it.label}
            </div>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
