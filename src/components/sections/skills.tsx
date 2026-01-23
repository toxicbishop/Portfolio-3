import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const SkillsSection = () => {
  return (
    <SectionWrapper id="skills" className="w-full h-screen md:h-[150dvh] pointer-events-none">
      <SectionHeader id='skills' title="Tech Stack" desc="(hint: press a key)" />
    </SectionWrapper>
  );
};

export default SkillsSection;
