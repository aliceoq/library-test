import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react'
import { createContext, useState } from 'react'
import { SWRConfig } from 'swr'
import { Section } from '../types'

export type SidebarContextType = {
  isEditorPreview: boolean
  sidebarSectionHidden: boolean
  activeSectionName: string
  activeSidebarElement: string
  activeSidebarTab: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sidebarDataMaster: any
  sidebarElementStatus: Map<string, boolean>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSidebarDataMaster: Dispatch<SetStateAction<any>>
  setIsEditorPreview: Dispatch<SetStateAction<boolean>>
  setSidebarSectionHidden: Dispatch<SetStateAction<boolean>>
  setActiveSectionName: Dispatch<SetStateAction<string>>
  setActiveSidebarElement: Dispatch<SetStateAction<string>>
  setActiveSidebarTab: Dispatch<SetStateAction<string>>
  toggleSidebarElementStatus: (title: string) => void
  openSidebarElement: (title: string) => void
  closeSidebarElements: (parentsArray: string[]) => void
  sidebarSections: Section[][]
  setSidebarSections: Dispatch<SetStateAction<Section[][]>>
}

export const SidebarContext = createContext<SidebarContextType>({
  isEditorPreview: false,
  sidebarSectionHidden: false,
  activeSectionName: '',
  activeSidebarElement: '',
  activeSidebarTab: '',
  sidebarDataMaster: {},
  setIsEditorPreview: () => undefined,
  sidebarElementStatus: new Map(),
  setSidebarDataMaster: () => undefined,
  setSidebarSectionHidden: () => undefined,
  setActiveSectionName: () => undefined,
  setActiveSidebarElement: () => undefined,
  setActiveSidebarTab: () => undefined,
  toggleSidebarElementStatus: () => undefined,
  openSidebarElement: () => undefined,
  closeSidebarElements: () => undefined,
  sidebarSections: [],
  setSidebarSections: () => undefined,
})

interface Props extends Partial<SidebarContextType> {
  children: ReactNode
  fallback?: any //eslint-disable-line
  sections: Section[][]
  isPreview: boolean
  sectionSelected: string
}

const SidebarContextProvider = ({ children, ...props }: Props) => {
  const [activeSectionName, setActiveSectionName] = useState(
    props.sectionSelected
  )
  const [sidebarSectionHidden, setSidebarSectionHidden] = useState(false)
  const [activeSidebarElement, setActiveSidebarElement] = useState('')
  const [activeSidebarTab, setActiveSidebarTab] = useState('')
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

  return (
    <SidebarContext.Provider
      value={{
        isEditorPreview,
        setIsEditorPreview,
        sidebarSectionHidden,
        activeSectionName,
        activeSidebarElement,
        activeSidebarTab,
        sidebarElementStatus,
        setActiveSectionName,
        setSidebarSectionHidden,
        setActiveSidebarElement,
        setActiveSidebarTab,
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
    </SidebarContext.Provider>
  )
}

export default SidebarContextProvider
