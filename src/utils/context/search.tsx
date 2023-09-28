import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

export type FilterType = string

type OcurrenceType = {
  [key: string]: number
}

type SearchContextType = {
  filterSelectedSection: FilterType
  changeFilterSelectedSection: Dispatch<SetStateAction<FilterType>>
  ocurrenceCount: OcurrenceType
  updateOcurrenceCount: (resultsData: OcurrenceType) => void
}

export const SearchContext = createContext<SearchContextType>({
  filterSelectedSection: '',
  changeFilterSelectedSection: () => undefined,
  ocurrenceCount: {},
  updateOcurrenceCount: () => undefined,
})

interface Props {
  children: ReactNode
}

const SearchContextProvider = ({ children }: Props) => {
  const [filterSelectedSection, changeFilterSelectedSection] =
    useState<FilterType>('')
  const [ocurrenceCount, changeOcurrenceCount] = useState({})

  const updateOcurrenceCount = (resultsData: OcurrenceType) => {
    changeOcurrenceCount(resultsData)
  }

  return (
    <SearchContext.Provider
      value={{
        filterSelectedSection,
        changeFilterSelectedSection,
        ocurrenceCount,
        updateOcurrenceCount,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider
