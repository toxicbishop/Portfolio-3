import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiChakraui,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReactquery,
  SiSanity,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

const BASE_PATH = "/assets";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  chakra: {
    title: "Chakra UI",
    bg: "black",
    fg: "white",
    icon: <SiChakraui />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  prisma: {
    title: "prisma",
    bg: "black",
    fg: "white",
    icon: <SiPrisma />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  reactQuery: {
    title: "React Query",
    bg: "black",
    fg: "white",
    icon: <SiReactquery />,
  },
  shadcn: {
    title: "ShanCN UI",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  firebase: {
    title: "Firebase",
    bg: "black",
    fg: "white",
    icon: <SiFirebase />,
  },
  sockerio: {
    title: "Socket.io",
    bg: "black",
    fg: "white",
    icon: <SiSocketdotio />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <SiVuedotjs />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  sanity: {
    title: "Sanity",
    bg: "black",
    fg: "white",
    icon: <SiSanity />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
  supabase: {
    title: "Supabase",
    bg: "black",
    fg: "white",
    icon: <SiSupabase />,
  },
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};

const projects: Project[] = [
  {
    id: "slot-machine-v3",
    category: "Game",
    title: "Slot Machine V3",
    src: "/assets/Slotmachine.png",
    screenshots: ["Slotmachine.png"],
    skills: {
      frontend: [PROJECT_SKILLS.python],
      backend: [],
    },
    live: "#",
    github: "https://github.com/toxicbishop/Slot_machine_version_3",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Jackpot Awaits!
          </TypographyP>
          <TypographyP className="font-mono ">
            An exciting Slot Machine game developed in Python. Features include game state persistence (save/load), auto-spin mechanism, transaction history, and daily rewards.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[`${BASE_PATH}/Slotmachine.png`]} />
        </div>
      );
    },
  },
  {
    id: "dsa-study-hub",
    category: "Education",
    title: "DSA Study Hub",
    src: "/assets/DSA-Website-Photo.png",
    screenshots: ["DSA-Website-Photo.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.shadcn,
      ],
      backend: [],
    },
    live: "https://dsa-study-hub.vercel.app/",
    github: "https://github.com/toxicbishop/DSA-with-tsx",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Master Data Structures & Algorithms
          </TypographyP>
          <TypographyP className="font-mono ">
            DSA Study Hub is an interactive platform built to help students and developers master Data Structures and Algorithms. It features clean code snippets, complexity analysis, and interactive visualizations.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[`${BASE_PATH}/DSA-Website-Photo.png`]} />
        </div>
      );
    },
  },
  {
    id: "bengaluru-cost-explorer",
    category: "Data Visualization",
    title: "Cost of Living in Bengaluru",
    src: "/assets/costoflivingbenagluru.jpeg",
    screenshots: ["costoflivingbenagluru.jpeg"],
    skills: {
      frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.express],
    },
    live: "#",
    github: "https://github.com/Mohammed0572/bengaluru-cost-explorer",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            An insightful explorer that visualizes the cost of living in various areas of Bengaluru. Helping people make informed decisions about relocation and budgeting in the Garden City.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[`${BASE_PATH}/costoflivingbenagluru.jpeg`]} />
        </div>
      );
    },
  },
  {
    id: "student-management-system",
    category: "Software",
    title: "Student Marks Management System",
    src: "/assets/SMS-Pro.png",
    screenshots: ["SMS-Pro.png"],
    skills: {
      frontend: [PROJECT_SKILLS.python],
      backend: [PROJECT_SKILLS.express], // Using Python and SQL
    },
    live: "#",
    github: "https://github.com/toxicbishop/Student-GUI-With-SQL",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            A robust GUI application designed for educational institutions to manage student records and marks. It uses SQL for reliable data storage and Python for an intuitive user interface.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[`${BASE_PATH}/SMS-Pro.png`]} />
        </div>
      );
    },
  },
  {
    id: "pokeapi-data-fetcher",
    category: "Web App",
    title: "PokeAPI Data Fetcher",
    src: "/assets/pokemon.png",
    screenshots: ["pokemon.png"],
    skills: {
      frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.react, PROJECT_SKILLS.chakra],
      backend: [],
    },
    live: "#",
    github: "https://github.com/toxicbishop/PokeAPI-Data-Fetcher",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            A fun project that fetches and displays detailed information about Pokémon using the PokeAPI. Search for your favorite Pokémon and see their stats, types, and abilities!
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[`${BASE_PATH}/pokemon.png`]} />
        </div>
      );
    },
  },
  {
    id: "music-player-python",
    category: "Desktop App",
    title: "Music Player With Python",
    src: "/assets/Music-Player-Photo.png",
    screenshots: ["Music-Player-Photo.png"],
    skills: {
      frontend: [PROJECT_SKILLS.python],
      backend: [],
    },
    live: "#",
    github: "https://github.com/toxicbishop/Music-with-python",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            A sleek desktop music player built with Python. Supports all major audio formats and features an easy-to-use interface for managing your local music library.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[`${BASE_PATH}/Music-Player-Photo.png`]} />
        </div>
      );
    },
  },
  {
    id: "ascii-art",
    category: "Tool",
    title: "ASCII Art",
    src: "/assets/projects-screenshots/portfolio/landing.png", // Fallback
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.python, PROJECT_SKILLS.js],
      backend: [],
    },
    live: "#",
    github: "https://github.com/toxicbishop/Assci-Art",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Convert your favorite images or text into stunning ASCII art. A simple and fun tool to create retro-style graphics for terminal or web display.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[`${BASE_PATH}/projects-screenshots/portfolio/landing.png`]} />
        </div>
      );
    },
  },
  {
    id: "mom-health-tracker",
    category: "Health",
    title: "Mom Health Tracker App",
    src: "/assets/projects-screenshots/portfolio/landing.png", // Fallback
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind, PROJECT_SKILLS.framerMotion],
      backend: [PROJECT_SKILLS.firebase],
    },
    live: "#",
    github: "https://github.com/toxicbishop/Mom-health-tracker",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            A personalized health tracking application designed for mothers. Track symptoms, moods, and daily health metrics with ease, all while keeping data securely synced.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[`${BASE_PATH}/projects-screenshots/portfolio/landing.png`]} />
        </div>
      );
    },
  },
];

export default projects;
