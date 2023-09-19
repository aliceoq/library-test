import { Box, Flex, Text } from '@vtex/brand-ui'
import MethodCategory from 'components/method-category'
import { Dispatch, SetStateAction, useState } from 'react'

import styles from './styles'
import { MethodType } from 'utils/types'

type MethodFilter = {
  name: string
  active: boolean
}

interface MethodButtonProps {
  methodFilter: MethodFilter
}

interface SectionFilterProps {
  methodFilterList: MethodFilter[]
  setMethodFilter: Dispatch<SetStateAction<MethodFilter[]>>
}

const SectionFilter = ({
  methodFilterList,
  setMethodFilter,
}: SectionFilterProps) => {
  const [activeFilters, setActiveFilters] = useState<MethodType[]>([])

  const setFilter = (methodFilterChanged: MethodType | null) => {
    if (methodFilterChanged) {
      const index = activeFilters.indexOf(methodFilterChanged)
      index === -1
        ? setActiveFilters([...activeFilters, methodFilterChanged])
        : setActiveFilters(
            activeFilters.filter((filter) => filter !== methodFilterChanged)
          )
      setMethodFilter(
        methodFilterList.map((methodFilter) => {
          if (methodFilter.name === methodFilterChanged)
            methodFilter.active = !methodFilter.active
          return methodFilter
        })
      )
    } else {
      setActiveFilters([])
      setMethodFilter(
        methodFilterList.map((methodFilter) => {
          methodFilter.active = false
          return methodFilter
        })
      )
    }
  }

  const MethodButton = ({ methodFilter }: MethodButtonProps) => {
    return (
      <Box
        key={`filter-category-${methodFilter.name}`}
        onClick={() => setFilter(methodFilter.name as MethodType)}
      >
        <MethodCategory
          sx={styles.category}
          active={methodFilter.active}
          method={methodFilter.name as MethodType}
          origin={'filter'}
        />
      </Box>
    )
  }

  return (
    <Box sx={styles.container}>
      <Text sx={styles.text}>Filter by</Text>
      <Flex>
        {methodFilterList.map((methodFilter) => (
          <MethodButton
            key={`filter-category-${methodFilter.name}`}
            methodFilter={methodFilter}
          />
        ))}
        {activeFilters.length > 1 && (
          <Text onClick={() => setFilter(null)} sx={styles.clear}>
            Clear all
          </Text>
        )}
      </Flex>
    </Box>
  )
}

export default SectionFilter
