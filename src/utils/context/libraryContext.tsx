import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useEffect, useState } from 'react'
import { Item } from 'lib/table-of-contents/TableOfContents.types'
import { Section } from 'utils/types'
import { SWRConfig } from 'swr'

interface Props extends Partial<ContextType> {
  children: ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fallback?: any
  sections: Section[][]
  isPreview: boolean
  sectionSelected: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

export type ContextType = {
  headingItems: Item[]
  setHeadingItems: Dispatch<SetStateAction<Item[]>>
  activeItem: ActiveItem
  setActiveItem: Dispatch<SetStateAction<ActiveItem>>
  goToPreviousItem: () => void
  goToPreviousSubItem: () => void
  isEditorPreview: boolean
  sidebarSectionHidden: boolean
  activeSectionName: string
  activeSidebarElement: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sidebarDataMaster: any
  sidebarElementStatus: Map<string, boolean>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSidebarDataMaster: Dispatch<SetStateAction<any>>
  setIsEditorPreview: Dispatch<SetStateAction<boolean>>
  setSidebarSectionHidden: Dispatch<SetStateAction<boolean>>
  setActiveSectionName: Dispatch<SetStateAction<string>>
  setActiveSidebarElement: Dispatch<SetStateAction<string>>
  toggleSidebarElementStatus: (title: string) => void
  openSidebarElement: (title: string) => void
  closeSidebarElements: (parentsArray: string[]) => void
  sidebarSections: Section[][]
  setSidebarSections: Dispatch<SetStateAction<Section[][]>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  isEditorPreview: false,
  sidebarSectionHidden: false,
  activeSectionName: '',
  activeSidebarElement: '',
  sidebarDataMaster: {},
  setIsEditorPreview: () => undefined,
  sidebarElementStatus: new Map(),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  setSidebarDataMaster: (_: any) => undefined,
  setSidebarSectionHidden: () => undefined,
  setActiveSectionName: () => undefined,
  setActiveSidebarElement: () => undefined,
  toggleSidebarElementStatus: () => undefined,
  openSidebarElement: () => undefined,
  closeSidebarElements: () => undefined,
  sidebarSections: [],
  setSidebarSections: () => undefined,
})

const LibraryContextProvider = ({ children, ...props }: Props) => {
  const [headingItems, setHeadingItems] = useState<Item[]>([])
  const [activeItem, setActiveItem] = useState<ActiveItem>({
    item: '',
    subItem: '',
  })

  const [activeSectionName, setActiveSectionName] = useState(
    props.sectionSelected
  )
  const [sidebarSectionHidden, setSidebarSectionHidden] = useState(false)
  const [activeSidebarElement, setActiveSidebarElement] = useState('')
  const [sidebarElementStatus, setSidebarElementStatus] = useState(new Map())
  const [sidebarDataMaster, setSidebarDataMaster] = useState(props.fallback)
  const [isEditorPreview, setIsEditorPreview] = useState(props.isPreview)
  const [sidebarSections, setSidebarSections] = useState(props.sections)

  useEffect(() => {
    setSidebarDataMaster(props.fallback)
  }, [props.fallback])

  useEffect(() => {
    if (props.sectionSelected === '') setSidebarSectionHidden(true)
    else if (props.sectionSelected !== activeSectionName)
      setActiveSectionName(props.sectionSelected)
  }, [props.sectionSelected])

  const { fallback } = props

  const toggleSidebarElementStatus = (title: string) => {
    setSidebarElementStatus((sidebarElementStatus) => {
      const open =
        sidebarElementStatus.has(title) === false
          ? true
          : !sidebarElementStatus.get(title)

      return new Map(sidebarElementStatus.set(title, open))
    })
  }

  const closeSidebarElements = (parentsArray: string[]) => {
    sidebarElementStatus.forEach((_value, key) => {
      if (!parentsArray.includes(key)) {
        setSidebarElementStatus((sidebarElementStatus) => {
          return new Map(sidebarElementStatus.set(key, false))
        })
      }
    })
  }

  const openSidebarElement = (title: string) => {
    setSidebarElementStatus((sidebarElementStatus) => {
      return new Map(sidebarElementStatus.set(title, true))
    })
  }

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
        isEditorPreview,
        setIsEditorPreview,
        sidebarSectionHidden,
        activeSectionName,
        activeSidebarElement,
        sidebarElementStatus,
        setActiveSectionName,
        setSidebarSectionHidden,
        setActiveSidebarElement,
        toggleSidebarElementStatus,
        openSidebarElement,
        closeSidebarElements,
        sidebarDataMaster,
        setSidebarDataMaster,
        sidebarSections,
        setSidebarSections,
        ...props,
      }}
    >
      <SWRConfig
        value={{
          fallback: {
            '/api/navigation': fallback ? fallback : [],
          },
        }}
      >
        {children}
      </SWRConfig>
    </LibraryContext.Provider>
  )
}

export default LibraryContextProvider
