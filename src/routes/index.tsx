import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Toaster, toast } from "sonner";
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
    school: "Zamboanga del Sur Provincial Government College - Dimataling Campus",
    detail: "Associate in Computer Technology (ACT)",
    year: "2025 – Present",
  },
  {
    level: "Senior High School",
    school: "Dimataling National High School",
    detail: "Technical-Vocational-Livelihood (TVL) Track",
    year: "2023 – 2025",
  },
  {
    level: "Junior High School",
    school: "Dimataling National High School",
    detail: "Secondary Education",
    year: "2019 – 2023",
  },
  {
    level: "Elementary",
    school: "Dimataling Central Elementary School",
    detail: "Primary Education",
    year: "2013 – 2019",
  },
];

const skills = [
  "HTML & CSS",
  "JavaScript",
  "React",
  "Tailwind CSS",
  "Database Management",
  "Computer Troubleshooting",
  "Software Installation",
  "Problem Solving",
];

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const revealRefs = useRef<HTMLElement[]>([]);

  // Form handler
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  // Resolve initial theme
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

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
          if (rect.top <= 140) {
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
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const onContactSubmit = async (data: ContactFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Message Sent Successfully!", {
        description: `Thanks ${data.name}, I will respond to your inquiry shortly.`
      });
      reset();
    } catch (e) {
      toast.error("Failed to Send Message", {
        description: "An error occurred. Please try sending your message again."
      });
    }
  };



  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative select-none">
      <Toaster richColors position="bottom-right" />
      
      {/* Animated Glowing Background Blobs */}
      <div className="absolute top-20 left-10 glowing-blob blob-1" />
      <div className="absolute top-[40%] right-10 glowing-blob blob-2" />
      <div className="absolute bottom-20 left-[25%] glowing-blob blob-3" />

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
          >
            My Portfolio
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
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-md ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme switcher */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg border border-border bg-background hover:bg-accent transition-colors text-foreground cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>

            {/* Mobile menu trigger */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2.5 border border-border bg-background text-foreground hover:bg-accent cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
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
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border/60 md:hidden bg-background/95 backdrop-blur-lg">
            <nav className="flex flex-col px-6 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`py-3.5 text-sm font-semibold transition-colors border-b border-border/20 last:border-none ${
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
        {/* HERO SECTION */}
        <section
          id="home"
          ref={addToRefs}
          className="reveal-section flex min-h-[calc(100vh-80px)] md:min-h-screen items-center justify-center px-6 py-12 md:py-0 pt-24 md:pt-20"
        >
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1 text-center md:text-left">
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 inline-block px-3 py-1 rounded-full">
                Hello, I'm
              </p>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl font-display">
                Ryan Abergas Dagodog
              </h1>
              <p className="mt-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent md:text-2xl">
                Associate in Computer Technology Student
              </p>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
                A student programmer focused on computer technology and application development. I enjoy exploring software structures, database systems, and building responsive web solutions.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#contact");
                  }}
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/45 transition-all hover:scale-102 hover:bg-primary/95 cursor-pointer"
                >
                  Get in Touch
                </a>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#about");
                  }}
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-bold text-foreground transition-all hover:scale-102 hover:bg-accent cursor-pointer"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="order-1 flex justify-center md:order-2">
              <div className="relative group">
                <div className="absolute inset-0 -translate-x-3 translate-y-3 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-sm group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-300" />
                <img
                  src={profileImage}
                  alt="Ryan Abergas Dagodog profile picture"
                  width={384}
                  height={384}
                  className="relative h-52 w-52 sm:h-72 sm:w-72 md:h-96 md:w-96 rounded-3xl object-cover shadow-2xl border border-border/40"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section
          id="about"
          ref={addToRefs}
          className="reveal-section bg-muted/40 backdrop-blur-sm border-y border-border/20 px-6 py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-extrabold uppercase tracking-widest text-primary bg-primary/10 inline-block px-3 py-1 rounded-full">
                About Me
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
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
                value="October 6, 2007"
              />
              <InfoCard
                icon={<MapPinIcon />}
                label="Address"
                value="Poblacion Dimataling"
              />
              <InfoCard
                icon={<HeartIcon />}
                label="Hobbies"
                value="Sleeping"
              />
              <InfoCard
                icon={<QuoteIcon />}
                label="Motto"
                value="“Kong hindi mo kaya, ipagawa mo sa iba.”"
              />
            </div>

            <div className="mt-12 rounded-2xl bg-card border border-border/60 p-8 shadow-md shadow-border/5">
              <p className="text-center text-lg leading-relaxed text-muted-foreground font-medium">
                I am a computer technology student who believes that technology should be intuitive and helpful. I like building software tools, designing databases, and handling computer setups. When things get difficult, I value finding the right people and tools to collaborate and get the job done efficiently.
              </p>
            </div>
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section
          id="education"
          ref={addToRefs}
          className="reveal-section px-6 py-24"
        >
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-extrabold uppercase tracking-widest text-primary bg-primary/10 inline-block px-3 py-1 rounded-full">
                Education
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                My Academic Journey
              </h2>
            </div>

            <div className="relative mt-16">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border/80 md:left-1/2 md:-translate-x-1/2" />
              {education.map((item, index) => (
                <div
                  key={item.level}
                  className={`relative mb-12 flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1 md:px-12" />
                  <div className="absolute left-4 top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-background shadow shadow-primary md:left-1/2" />
                  <div className="flex-1 pl-12 md:px-12 md:pl-0">
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300">
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        {item.year}
                      </span>
                      <h3 className="mt-3 text-xl font-bold text-foreground">
                        {item.level}
                      </h3>
                      <p className="mt-1 font-semibold text-muted-foreground">
                        {item.school}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground/90 font-medium">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section
          id="skills"
          ref={addToRefs}
          className="reveal-section bg-muted/40 backdrop-blur-sm border-y border-border/20 px-6 py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-extrabold uppercase tracking-widest text-primary bg-primary/10 inline-block px-3 py-1 rounded-full">
                Skills
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
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
                  className="flex items-center gap-3.5 rounded-xl border border-border bg-card p-4.5 shadow-sm hover:shadow-md hover:border-primary/20 hover:-translate-y-1 transition-all duration-200"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <CheckIcon />
                  </span>
                  <span className="font-bold text-foreground text-sm tracking-wide">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* CONTACT SECTION */}
        <section
          id="contact"
          ref={addToRefs}
          className="reveal-section bg-muted/40 backdrop-blur-sm border-t border-border/20 px-6 py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-extrabold uppercase tracking-widest text-primary bg-primary/10 inline-block px-3 py-1 rounded-full">
                Contact
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Let's Connect
              </h2>
              <p className="mt-4 text-muted-foreground">
                Feel free to reach out for collaborations, questions, or just a friendly chat.
              </p>
            </div>

            <div className="mt-16 grid gap-10 md:grid-cols-5 items-start">
              {/* Left Column: Contact Cards */}
              <div className="md:col-span-2 grid gap-4">
                <ContactCard
                  icon={<MailIcon />}
                  label="Email"
                  value="dagodogzyro@gmail.com"
                  href="mailto:dagodogzyro@gmail.com"
                />
                <ContactCard
                  icon={<PhoneIcon />}
                  label="Phone"
                  value="09120627749"
                  href="tel:09120627749"
                />
                <ContactCard
                  icon={<FacebookIcon />}
                  label="Facebook"
                  value="Ryan Abergas Dagodog"
                  href="https://www.facebook.com/zyro.dagodog"
                  external
                />
              </div>

              {/* Right Column: Dynamic Form */}
              <div className="md:col-span-3">
                <form
                  onSubmit={handleSubmit(onContactSubmit)}
                  className="rounded-2xl border border-border bg-card p-8 shadow-sm flex flex-col gap-5"
                >
                  <h3 className="text-xl font-bold text-foreground">Send a Message</h3>
                  
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 ${
                        errors.name ? "border-destructive focus:ring-1 focus:ring-destructive" : "border-border focus:border-primary focus:ring-1 focus:ring-primary"
                      }`}
                      placeholder="e.g. Jane Doe"
                      {...register("name")}
                    />
                    {errors.name && (
                      <span className="text-xs font-bold text-destructive mt-0.5">{errors.name.message}</span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 ${
                        errors.email ? "border-destructive focus:ring-1 focus:ring-destructive" : "border-border focus:border-primary focus:ring-1 focus:ring-primary"
                      }`}
                      placeholder="e.g. janedoe@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <span className="text-xs font-bold text-destructive mt-0.5">{errors.email.message}</span>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 resize-none ${
                        errors.message ? "border-destructive focus:ring-1 focus:ring-destructive" : "border-border focus:border-primary focus:ring-1 focus:ring-primary"
                      }`}
                      placeholder="Hi Ryan! I would love to collaborate on a new project..."
                      {...register("message")}
                    />
                    {errors.message && (
                      <span className="text-xs font-bold text-destructive mt-0.5">{errors.message.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow hover:shadow-lg transition-all hover:bg-primary/95 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4.5 w-4.5 text-current" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending Message...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background px-6 py-10 relative z-10">
        <div className="mx-auto max-w-6xl text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent tracking-wider uppercase font-display">
            My Portfolio
          </p>
          <p className="text-sm font-medium text-muted-foreground">
            © {new Date().getFullYear()} Ryan Abergas Dagodog. Built with HTML, CSS and JavaScript.
          </p>
        </div>
      </footer>

      <style>{`
        .reveal-section {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
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
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary/20 hover:-translate-y-1 transition-all duration-300">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </h3>
      <p className="mt-1.5 text-base font-bold text-foreground leading-snug">{value}</p>
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
      className="group flex items-center gap-5 rounded-2xl border border-border bg-card p-5.5 shadow-sm hover:shadow-md hover:border-primary/30 hover:bg-accent transition-all duration-200"
    >
      <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground shadow-sm">
        {icon}
      </div>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </h3>
        <p className="mt-1 font-bold text-foreground text-sm tracking-wide leading-none">{value}</p>
      </div>
    </a>
  );
}

// Icons
function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
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
      width="22"
      height="22"
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
      width="22"
      height="22"
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
      width="22"
      height="22"
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
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
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
      width="22"
      height="22"
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
      width="22"
      height="22"
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
      width="22"
      height="22"
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


