import { useContext, useEffect } from 'react'
import Link from 'next/link.js'
import { Box, Text } from '@vtex/brand-ui'
import AnimateHeight from 'react-animate-height'

import { removeHTML } from 'utils/string-utils'
import { Item } from './TableOfContents.types'

import { LibraryContext } from 'utils/context/libraryContext'

import styles from './styles'

const TableOfContents = () => {
  const { headingItems, activeItem, setHeadingItems, setActiveItem } = useContext(LibraryContext)

  useEffect(() => {
    let headings: Item[] = []
    if (!headings.length) {
      document.querySelectorAll('h2, h3').forEach((heading) => {
        const headingSlug = heading.id
        const item = {
          title: removeHTML(heading.innerHTML).replace(':', ''),
          slug: headingSlug,
        }
  
        if (heading.tagName === 'H2') {
          headings.push({ ...item, children: [] })
        } else {
          headings[headings.length - 1].children.push({ ...item })
        }

      })
      setHeadingItems(headings)
    }
  }, [])

  const Item = ({
    title,
    slug,
    level,
    active,
  }: {
    title: string
    slug: string
    level: number
    active: boolean
  }) => {
    return (
      <Link
        href={`#${slug}`}
        onClick={() => {
          setActiveItem(({ item }) => ({
            item: level === 1 ? slug : item,
            subItem: level === 1 ? '' : slug,
          }))
        }}
      >
        <Text sx={styles.item(level, active)}>{title}</Text>
      </Link>
    )
  }

  return (
    <Box sx={styles.itemsContainer} data-cy="table-of-contents">
      {headingItems.map((item) => (
        <Box key={item.slug}>
          <Item
            title={item.title}
            slug={item.slug}
            level={1}
            active={item.slug === activeItem.item}
          />
          <AnimateHeight
            duration={300}
            height={item.slug === activeItem.item ? 'auto' : 0}
          >
            <Box sx={styles.subItemsContainer}>
              {item.children.map((subItem) => (
                <Item
                  key={subItem.slug}
                  title={subItem.title}
                  slug={subItem.slug}
                  level={2}
                  active={subItem.slug === activeItem.subItem}
                />
              ))}
            </Box>
          </AnimateHeight>
        </Box>
      ))}
    </Box>
  )
}

export default TableOfContents
