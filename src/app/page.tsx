"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import SkillsSection from "@/components/sections/skills";
import EducationSection from "@/components/sections/education";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";
import ErrorBoundary from "@/components/error-boundary";

import { usePathname } from "next/navigation";

// Lazy load the heavy 3D animated background
const AnimatedBackground = dynamic(
  () => import("@/components/animated-background"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-gradient-to-b from-background to-background/80 -z-10" />
    ),
  },
);

function MainPage() {
  const pathname = usePathname();

  React.useEffect(() => {
    // Force scroll to top on refresh if not a section link
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (pathname && pathname !== "/") {
      const sectionId = pathname.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <SmoothScroll>
      <ErrorBoundary
        fallback={
          <div className="fixed inset-0 bg-gradient-to-b from-background to-background/80 -z-10" />
        }>
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-gradient-to-b from-background to-background/80 -z-10" />
          }>
          <AnimatedBackground />
        </Suspense>
      </ErrorBoundary>
      <main
        className={cn("bg-slate-100 dark:bg-transparent canvas-overlay-mode")}>
        <HeroSection />
        <SkillsSection />
        <EducationSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}

export default MainPage;
