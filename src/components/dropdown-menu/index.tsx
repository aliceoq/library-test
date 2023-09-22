import { Box } from "@vtex/brand-ui";

import DocumentationCard from "components/documentation-card";

import { Section } from "utils/types";
import styles from "./styles";

interface Props {
  isEditor: boolean;
  sections: Section[][];
  editorSections?: Section[][];
}

const DropdownMenu = ({ isEditor, sections, editorSections = [] }: Props) => {
  const dropdownSections = isEditor ? editorSections : sections;

  return (
    <Box sx={styles.outerContainer}>
      <Box sx={styles.innerContainer} data-cy="dropdown-menu">
        {dropdownSections.map((section, id) => (
          <>
            {id > 0 && (
              <Box sx={styles.sectionDivider}>
                <hr />
              </Box>
            )}
            <Box
              sx={styles.documentationContainer}
              data-cy="dropdown-menu-first-section"
            >
              {section.map((card) => (
                <DocumentationCard
                  containerType="dropdown"
                  key={card.title}
                  {...card}
                />
              ))}
            </Box>
          </>
        ))}
      </Box>
    </Box>
  );
};

export default DropdownMenu;
