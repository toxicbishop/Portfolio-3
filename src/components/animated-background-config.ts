export type Section = "hero" | "about" | "skills" | "experience" | "projects" | "contact";

export const STATES = {
  hero: {
    desktop: {
      scale: { x: 0.20, y: 0.20, z: 0.20 },
      position: { x: 225, y: -100, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.30, y: 0.30, z: 0.30 },
      position: { x: 0, y: -200, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  about: {
    desktop: {
      scale: { x: 0.4, y: 0.4, z: 0.4 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 12,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.4, y: 0.4, z: 0.4 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 6,
        z: 0,
      },
    },
  },
  experience: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: Math.PI / 12, // Slight tilt forward
        y: -Math.PI / 4, // Rotate opposite to skills
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: Math.PI / 6,
        y: -Math.PI / 6,
        z: 0,
      },
    },
  },
  skills: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 12,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 6,
        z: 0,
      },
    },
  },
  projects: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
    mobile: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: 150, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
  },
  contact: {
    desktop: {
      scale: { x: 0.2, y: 0.2, z: 0.2 },
      position: { x: 350, y: -250, z: 0 },
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: 150, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
  },
};

export const getKeyboardState = ({
  section,
  isMobile,
}: {
  section: Section;
  isMobile: boolean;
}) => {
  const baseTransform = STATES[section][isMobile ? "mobile" : "desktop"];

  const getScaleOffset = () => {
    const width = window.innerWidth;
    // Reference widths for "ideal" size
    // Using 1024 for desktop to maintain backward compatibility with previous look
    const DESKTOP_REF_WIDTH = 1280;
    const MOBILE_REF_WIDTH = 390;

    const targetScale = isMobile
      ? width / MOBILE_REF_WIDTH
      : width / DESKTOP_REF_WIDTH;

    // Clamp values to prevent extremes
    const minScale = isMobile ? 0.5 : 0.5;
    const maxScale = isMobile ? 0.6 : 1.15;

    return Math.min(Math.max(targetScale, minScale), maxScale);
  };

  const scaleOffset = getScaleOffset();

  return {
    ...baseTransform,
    scale: {
      x: Math.abs(baseTransform.scale.x * scaleOffset),
      y: Math.abs(baseTransform.scale.y * scaleOffset),
      z: Math.abs(baseTransform.scale.z * scaleOffset),
    },
  };
};
