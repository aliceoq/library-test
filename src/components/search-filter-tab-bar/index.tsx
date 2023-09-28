import { useContext } from 'react'
import { Flex, Text } from '@vtex/brand-ui'

import styles from './styles'
import { SearchContext } from 'utils/context/search'
import { LibraryContext } from 'utils/context/libraryContext'

const SearchFilterTab = ({ filter }: { filter: string }) => {
  const { filterSelectedSection, changeFilterSelectedSection, ocurrenceCount } =
    useContext(SearchContext)

  return (
    <Flex
      sx={styles.tab(filterSelectedSection === filter)}
      onClick={() => changeFilterSelectedSection(filter)}
    >
      <Text sx={styles.tabTitle(filterSelectedSection === filter)}>
        {filter || 'All Results'}
      </Text>
      <Text sx={styles.tabCount}>{ocurrenceCount[filter] || 0}</Text>
    </Flex>
  )
}

const SearchFilterTabBar = () => {
  const { sidebarSections } = useContext(LibraryContext)
  return (
    <Flex sx={styles.container}>
      <SearchFilterTab filter="" />
      {sidebarSections.flat().map((section) => {
        ;<SearchFilterTab key={section.title} filter={section.title} />
      })}
    </Flex>
  )
}

export default SearchFilterTabBar
