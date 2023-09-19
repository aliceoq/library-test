import React, { useEffect, useState } from 'react'
// import { HashLink } from 'react-router-hash-link'
import Link from 'next/link.js'
import { Box, Text } from '@vtex/brand-ui'
import AnimateHeight from 'react-animate-height'

import { removeHTML } from '../../utils/string-utils'
import { useHeadingObserver } from '../../utils/hooks/useHeadingObserver'
import { ActiveItem, Item } from './TableOfContents.types'

import styles from './styles'

const TableOfContents = () => {
  // const [OnThisPageOpenStatus, setOnThisPageOpenStatus] = useState(false)
  // const [activeItem, setActiveItem] = useState<ActiveItem>()
  const [headings, setHeadings] = useState<Item[]>([])
  const { activeItem, updateActiveItem } = useHeadingObserver(headings)


  useEffect(() => {
    document.querySelectorAll('h2, h3').forEach((heading) => {
      // const toSlugify = childrenToString(headingProps.children)
      const slug = heading.id
      const item = {
        title: removeHTML(heading.innerHTML).replace(':', ''),
        slug: slug,
      }

      setHeadings((headings) => {
        if (heading.tagName === 'H2') {
          return [...headings, { ...item, children: [] }]
        }

        const { title, slug, children } = headings[headings.length - 1]
        return [
          ...headings.slice(0, -1),
          { title, slug, children: [...children, item] },
        ]
      })
    })
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
      // <HashLink
      //   smooth
      //   to={`/#${slug}`}
      //   onClick={() => {
      //     // setOnThisPageOpenStatus(false)
      //     updateActiveItem(slug, level)
      //   }}
      // >
      //   <Text sx={styles.item(level, active)}>{title}</Text>
      // </HashLink>
      <Link
        href={`#${slug}`}
        onClick={() => {
          // setOnThisPageOpenStatus(false)
          updateActiveItem(slug, level)
          // setActiveItem(({ item }) => ({
          //   item: level === 1 ? slug : item,
          //   subItem: level === 1 ? '' : slug,
          // }))
        }}
      >
        <Text sx={styles.item(level, active)}>{title}</Text>
      </Link>
    )
  }

  return (
    <Box sx={styles.itemsContainer} data-cy="table-of-contents">
      {headings.map((item) => (
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
