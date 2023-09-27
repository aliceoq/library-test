import { useRef, KeyboardEvent } from 'react'
import { useRouter } from 'next/router'
import { Flex } from '@vtex/brand-ui'
import { connectSearchBox } from 'react-instantsearch-dom'
import { SearchBoxProvided } from 'react-instantsearch-core'

import SearchIcon from 'components/icons/search-icon'
import styles from './styles'

interface SearchBoxProps extends SearchBoxProvided {
  changeFocus: (value: boolean) => void
}

const SearchBoxComponent = ({
  currentRefinement,
  refine,
  changeFocus,
}: SearchBoxProps) => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (inputRef.current != null) inputRef.current.focus()
  }

  const keyPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push({
        pathname: '/search',
        query: { keyword: inputRef.current?.value },
      })
      inputRef.current?.blur()
      changeFocus(false)
    }
  }

  return (
    <Flex sx={styles.searchContainer} onClick={handleClick}>
      <SearchIcon sx={styles.searchIcon} />
      <input
        style={styles.searchInput}
        ref={inputRef}
        className="searchComponent"
        type="text"
        placeholder="Search in Developers"
        value={currentRefinement}
        data-cy="search"
        onKeyDown={(e) => keyPressed(e)}
        onChange={(e) => refine(e.currentTarget.value)}
      />
    </Flex>
  )
}

const SearchBox = connectSearchBox(SearchBoxComponent)

export default SearchBox
