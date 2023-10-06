import { Box, Flex } from '@vtex/brand-ui'
import SearchSections from 'components/search-sections'
import SearchResults from 'components/search-results'
import SearchFilterTabBar from 'components/search-filter-tab-bar'
import SearchContextProvider from 'utils/context/search'
import styles from './styles'
import SearchInput from 'components/search-input'

const Search = () => {
  return (
    <SearchContextProvider>
      <Box>
        <Flex sx={styles.searchBarContainer}>
          <SearchInput />
        </Flex>
        <SearchFilterTabBar />
      </Box>
      <Flex sx={styles.body}>
        <SearchSections />
        <SearchResults />
      </Flex>
    </SearchContextProvider>
  )
}

export default Search
