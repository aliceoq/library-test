import { Section } from "./types";

export const getIcon = (doc: string, sections: Section[][]) => {
  for (const section of sections) {
    return section.find((icon) => icon.title === doc)?.Icon;
  }
};
