import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useState } from 'react'
import { Item } from 'lib/table-of-contents/TableOfContents.types'

interface Props extends Partial<ContextType> {
  children: ReactNode
}

type ContextType = {
  headingItems: Item[]
  setHeadingItems: Dispatch<SetStateAction<Item[]>>
  activeItem: ActiveItem
  setActiveItem: Dispatch<SetStateAction<ActiveItem>>
  goToPreviousItem: () => void
  goToPreviousSubItem: () => void
}

type ActiveItem = {
  item: string
  subItem: string
}

export const LibraryContext = createContext<ContextType>({
  headingItems: [],
  setHeadingItems: () => undefined,
  activeItem: {
    item: '',
    subItem: '',
  },
  setActiveItem: () => undefined,
  goToPreviousItem: () => undefined,
  goToPreviousSubItem: () => undefined,
})

const LibraryContextProvider = ({ children, ...props }: Props) => {
  const [headingItems, setHeadingItems] = useState<Item[]>([])
  const [activeItem, setActiveItem] = useState<ActiveItem>({
    item: '',
    subItem: '',
  })

  const goToPreviousItem = () => {
    setActiveItem(({ item, subItem }) => {
      const index = headingItems.findIndex((heading) => heading.slug === item)
      if (index === -1) return { item, subItem }

      const previousItem = !index ? '' : headingItems[index - 1].slug
      const previousChildren = !index ? [] : headingItems[index - 1].children
      const previousSubItem = !previousChildren.length
        ? ''
        : previousChildren.slice(-1)[0].slug

      return {
        item: previousItem,
        subItem: previousSubItem,
      }
    })
  }

  const goToPreviousSubItem = () => {
    setActiveItem(({ item, subItem }) => {
      const heading = headingItems.find((heading) => heading.slug === item)
      const index = heading?.children.findIndex(
        (child) => child.slug === subItem
      )

      if (!heading || index === -1) return { item, subItem }

      return {
        item,
        subItem: !index ? '' : heading.children[index - 1].slug,
      }
    })
  }

  return (
    <LibraryContext.Provider
      value={{
        headingItems,
        activeItem,
        setHeadingItems,
        setActiveItem,
        goToPreviousItem,
        goToPreviousSubItem,
        ...props,
      }}
    >
      {children}
    </LibraryContext.Provider>
  )
}

export default LibraryContextProvider
