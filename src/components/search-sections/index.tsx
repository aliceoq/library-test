import { Box } from "@vtex/brand-ui";

import SearchSection from "components/search-section";
import styles from "./styles";
import { useContext } from "react";
import { LibraryContext } from "utils/context/libraryContext";

const SearchSections = () => {
  const { sidebarSections } = useContext(LibraryContext);

  return (
    <Box sx={styles.container}>
      {sidebarSections.map((sections, id) => (
        <>
          {id > 0 && (
            <Box sx={styles.sectionDivider}>
              <hr />
            </Box>
          )}
          <Box sx={styles.notesSection}>
            {sections.map((section, index) => (
              <SearchSection
                key={`search-section-docs-${section.title}`}
                dataElement={section}
                index={index}
              />
            ))}
          </Box>
        </>
      ))}
    </Box>
  );
};

export default SearchSections;
