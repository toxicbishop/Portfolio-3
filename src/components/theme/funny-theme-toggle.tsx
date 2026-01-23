import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import { themeDisclaimers } from "@/data/constants";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function FunnyThemeToggle({
  className,
}: {
  className?: string;
}) {
  const { setTheme, theme } = useTheme();
  const [counter, setCounter] = React.useState({ dark: 0, light: 0 });
  const { toast } = useToast();
  const ref = React.useRef<HTMLButtonElement>(null);

  const toggleTheme = async (newTheme: string, event?: React.MouseEvent) => {
    // @ts-ignore
    if (!document.startViewTransition || !event) {
      setTheme(newTheme);
      return;
    }

    const { top, left, width, height } = (
      event.target as HTMLElement
    ).getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  const goLight = (e: React.MouseEvent) => {
    setCounter({ ...counter, light: counter.light + 1 });
    toggleTheme("light", e);
  };

  const goDark = (e: React.MouseEvent) => {
    const description =
      themeDisclaimers.dark[counter.dark % themeDisclaimers.dark.length];
    setCounter({ ...counter, dark: counter.dark + 1 });
    toast({
      description: description,
      className:
        "top-0 right-0 flex fixed md:max-w-[420px] md:top-16 md:right-4",
    });
    toggleTheme("dark", e);
  };

  return (
    <>
      {theme === "light" ? (
        <Button
          variant="outline"
          size="icon"
          className={cn("border-none bg-transparent", className)}
          onClick={goDark}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 pointer-events-none" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 pointer-events-none" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={cn("border-none bg-transparent", className)}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-[99999] flex flex-col items-center gap-2">
            {/* <p className="text-sm">these stunts are done by professional only</p> */}
            <p className="text-sm text-center">
              {themeDisclaimers.light[counter.light]}
            </p>
            <Button onClick={goLight}>Go Light</Button>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
