import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import profileImage from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const education = [
  {
    level: "College",
    school: "University of Exampleville",
    detail: "Bachelor of Science in Information Technology",
    year: "2021 – Present",
  },
  {
    level: "Senior High School",
    school: "Exampleville National High School",
    detail: "STEM Strand",
    year: "2019 – 2021",
  },
  {
    level: "Junior High School",
    school: "Exampleville National High School",
    detail: "With Honors",
    year: "2015 – 2019",
  },
  {
    level: "Elementary",
    school: "Exampleville Elementary School",
    detail: "With Academic Recognition",
    year: "2009 – 2015",
  },
];

const skills = [
  "HTML & CSS",
  "JavaScript",
  "React",
  "Tailwind CSS",
  "Git & GitHub",
  "UI/UX Design",
  "Problem Solving",
  "Team Collaboration",
];

function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      let current = sections[0];
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="text-lg font-bold tracking-tight text-foreground"
          >
            MyPortfolio
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </a>
              );
            })}
          </nav>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border md:hidden bg-background">
            <nav className="flex flex-col px-6 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`py-3 text-sm font-medium transition-colors ${
                    activeSection === link.href.replace("#", "")
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>
        <section
          id="home"
          ref={addToRefs}
          className="reveal-section flex min-h-screen items-center justify-center px-6 pt-24"
        >
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1 text-center md:text-left">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Hello, I'm
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Juan Dela Cruz
              </h1>
              <p className="mt-4 text-xl font-semibold text-muted-foreground">
                BS Information Technology
              </p>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground text-balance">
                A passionate student developer who loves building clean, modern,
                and user-friendly websites. I enjoy turning ideas into real
                projects through code and creativity.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#contact");
                  }}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Get in Touch
                </a>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#about");
                  }}
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="order-1 flex justify-center md:order-2">
              <div className="relative">
                <div className="absolute inset-0 -translate-x-3 translate-y-3 rounded-3xl bg-primary/10" />
                <img
                  src={profileImage}
                  alt="Juan Dela Cruz profile picture"
                  width={384}
                  height={384}
                  className="relative h-72 w-72 rounded-3xl object-cover shadow-xl sm:h-80 sm:w-80 md:h-96 md:w-96"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          ref={addToRefs}
          className="reveal-section bg-muted/50 px-6 py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                About Me
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Who I Am
              </h2>
              <p className="mt-4 text-muted-foreground">
                A few details that define me beyond the classroom.
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <InfoCard
                icon={<CalendarIcon />}
                label="Birthday"
                value="January 15, 2003"
              />
              <InfoCard
                icon={<MapPinIcon />}
                label="Address"
                value="123 Example Street, Manila, Philippines"
              />
              <InfoCard
                icon={<HeartIcon />}
                label="Hobbies"
                value="Coding, Reading, Playing Basketball, Photography"
              />
              <InfoCard
                icon={<QuoteIcon />}
                label="Motto"
                value="“Learn continuously, grow consistently.”"
              />
            </div>

            <div className="mt-12 rounded-2xl bg-background p-8 shadow-sm">
              <p className="text-center text-lg leading-relaxed text-muted-foreground">
                I am a dedicated and curious student who believes in the power of
                technology to solve real-world problems. I enjoy both the logical
                challenge of coding and the creative side of design. My goal is
                to become a full-stack developer who builds tools that are useful,
                accessible, and enjoyable to use.
              </p>
            </div>
          </div>
        </section>

        <section
          id="education"
          ref={addToRefs}
          className="reveal-section px-6 py-24"
        >
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Education
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                My Academic Journey
              </h2>
            </div>

            <div className="relative mt-16">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />
              {education.map((item, index) => (
                <div
                  key={item.level}
                  className={`relative mb-12 flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1 md:px-12" />
                  <div className="absolute left-4 top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-background md:left-1/2" />
                  <div className="flex-1 pl-12 md:px-12 md:pl-0">
                    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {item.year}
                      </span>
                      <h3 className="mt-3 text-xl font-bold text-foreground">
                        {item.level}
                      </h3>
                      <p className="mt-1 font-medium text-foreground">
                        {item.school}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="skills"
          ref={addToRefs}
          className="reveal-section bg-muted/50 px-6 py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Skills
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What I Can Do
              </h2>
              <p className="mt-4 text-muted-foreground">
                Technologies and abilities I've developed as a student.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 shadow-sm transition-transform hover:-translate-y-1"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <CheckIcon />
                  </span>
                  <span className="font-medium text-foreground">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          ref={addToRefs}
          className="reveal-section px-6 py-24"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Let's Connect
            </h2>
            <p className="mt-4 text-muted-foreground">
              Feel free to reach out for collaborations, questions, or just a
              friendly chat.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <ContactCard
                icon={<MailIcon />}
                label="Email"
                value="juandelacruz@example.com"
                href="mailto:juandelacruz@example.com"
              />
              <ContactCard
                icon={<PhoneIcon />}
                label="Phone"
                value="+63 912 345 6789"
                href="tel:+639123456789"
              />
              <ContactCard
                icon={<FacebookIcon />}
                label="Facebook"
                value="Juan Dela Cruz"
                href="https://facebook.com/juandelacruz"
                external
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background px-6 py-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Juan Dela Cruz. Personal Portfolio.
            Built with HTML, CSS, and JavaScript.
          </p>
        </div>
      </footer>

      <style>{`
        .reveal-section {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-transform hover:-translate-y-1">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </h3>
      <p className="mt-1 text-lg font-medium text-foreground">{value}</p>
    </div>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex flex-col items-center rounded-2xl border border-border bg-background p-6 shadow-sm transition-colors hover:border-primary/30 hover:bg-accent"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
      <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </h3>
      <p className="mt-1 font-medium text-foreground">{value}</p>
    </a>
  );
}

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
      <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
