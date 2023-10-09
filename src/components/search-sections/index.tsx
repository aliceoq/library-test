import { Box } from '@vtex/brand-ui'

import SearchSection from 'components/search-section'
import styles from './styles'
import { useContext } from 'react'
import { LibraryContext } from 'utils/context/libraryContext'

const SearchSections = () => {
  const { sidebarSections } = useContext(LibraryContext)

  return (
    <Box sx={styles.container}>
      {sidebarSections.map((sections, id) => (
        <Box
          sx={
            id < sidebarSections.length - 1
              ? styles.docsSection
              : styles.notesSection
          }
        >
          {id === 0 && <SearchSection dataElement={null} />}
          {sections.map((section, index) => (
            <SearchSection
              key={`search-section-docs-${section.title}`}
              dataElement={section}
              index={index}
            />
          ))}
        </Box>
      ))}
    </Box>
  )
}

export default SearchSections
