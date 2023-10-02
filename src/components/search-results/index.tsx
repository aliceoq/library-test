import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import { Box, Text } from '@vtex/brand-ui'

import { Configure, InstantSearch } from 'react-instantsearch-dom'
import { SearchState } from 'react-instantsearch-core'
import InfiniteHits from './infiniteHits'

import styles from './styles'
import { SearchContext } from 'utils/context/search'
import { searchClient, searchIndex } from 'config/config'

const SearchResults = () => {
  const router = useRouter()
  const { filterSelectedSection, ocurrenceCount } = useContext(SearchContext)
  const filters = filterSelectedSection
    ? `doctype: "${filterSelectedSection}"`
    : ''
  const [prevFilter, setPrevFilter] = useState('')
  const [searchState, setSearchState] = useState({})

  const updateSearchState = (currentState: SearchState) => {
    const page = filters !== prevFilter ? 1 : currentState.page || 1
    setPrevFilter(filters)
    setSearchState({
      ...currentState,
      page,
    })
  }

  return (
    <Box sx={styles.resultContainer}>
      <Text sx={styles.resultText}>
        Showing {ocurrenceCount[filterSelectedSection]} results for "
        {router.query.keyword}" in{' '}
        {!filterSelectedSection ? `all results` : filterSelectedSection}
      </Text>
      <hr />
      <Box>
        <InstantSearch
          searchClient={searchClient}
          indexName={searchIndex}
          searchState={searchState}
          onSearchStateChange={(currentState) =>
            updateSearchState(currentState)
          }
        >
          <Configure
            filters={filters}
            query={router.query.keyword}
            clickAnalytics={true}
            hitsPerPage={6}
            facets={['doctype']}
            facetingAfterDistinct={true}
          />
          <InfiniteHits />
        </InstantSearch>
      </Box>
    </Box>
  )
}

export default SearchResults
