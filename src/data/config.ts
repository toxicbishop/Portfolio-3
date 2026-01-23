const config = {
  title: "Pranav | Student",
  description: {
    long: "Explore the portfolio of Pranav, a student and creative technologist specializing in interactive web experiences, 3D animations, and innovative projects. Discover my latest work and let's build something amazing together!",
    short:
      "Discover the portfolio of Pranav, a student developer creating interactive web experiences and innovative projects.",
  },
  keywords: [
    "Pranav",
    "portfolio",
    "student developer",
    "creative technologist",
    "web development",
    "3D animations",
    "interactive websites",
    "web design",
    "GSAP",
    "React",
    "Next.js",
    "Spline",
    "Framer Motion",
  ],
  author: "Pranav Arun",
  email: "pranavarun19@gmail.com",
  site: "https://pranav-portfolio.vercel.app",

  // for github stars button
  githubUsername: "toxicbishop",
  githubRepo: "DSA-with-tsx",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/Pranav63076884",
    linkedin: "https://www.linkedin.com/in/pranav-arun/",
    instagram: "https://www.instagram.com/toxicbishop_/",
    facebook: "#",
    github: "https://github.com/toxicbishop",
    resume: "https://drive.google.com/file/d/1O97WCk2DrO9x6SHOqf7LvRbmHkMgGIb4/view?usp=sharing",
  },
};
export { config };
