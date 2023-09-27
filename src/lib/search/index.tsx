import { NextPage, GetStaticProps } from 'next'
import { Box, Flex } from '@vtex/brand-ui'
import SearchSections from 'components/search-sections'
import SearchResults from 'components/search-results'
import SearchFilterTabBar from 'components/search-filter-tab-bar'
import SearchContextProvider from 'utils/context/search'
import styles from './styles'

const Search: NextPage = () => {
  return (
    <SearchContextProvider>
      <Box>
        <Flex sx={styles.searchBarContainer}></Flex>
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
