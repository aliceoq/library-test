import { Section } from "./types";
import { flattenJSON, getKeyByEndpoint, getParents } from "./navigation-utils";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ContextType } from "./context/libraryContext";

export const getIcon = (doc: string, sections: Section[][]) => {
  for (const section of sections) {
    return section.find((icon) => icon.title === doc)?.Icon;
  }
};

interface updateOpenPageProps {
  parentsArray?: string[]
  context: ContextType
  setExpandDelayStatus?: Dispatch<SetStateAction<boolean>>
}
export const updateOpenPage = ({ parentsArray = [], context, setExpandDelayStatus }: updateOpenPageProps) => {
  const {
    activeSidebarElement,
    sidebarDataMaster,
    setActiveSidebarElement,
    openSidebarElement,
    closeSidebarElements,
  } = context
  const flattenedSidebar = flattenJSON(sidebarDataMaster)
  const router = useRouter()

  let activeSlug = ''
  const querySlug = router.query.slug

  if (querySlug && router.pathname === '/docs/api-reference/[slug]') {
    activeSlug = router.asPath.replace('/docs/api-reference/', '')
    const docPath = activeSlug.split('/')
    const hasHashTag = router.asPath.indexOf('#') > -1
    const apiSlug = docPath[0].split(hasHashTag ? '#' : '?endpoint=')[0]
    const endpoint = '/' + docPath.splice(1, docPath.length).join('/')
    let keyPath
    if (endpoint == '/') {
      activeSlug = apiSlug
      keyPath = getKeyByEndpoint(flattenedSidebar, '', apiSlug)
    } else {
      const method = docPath[0]
        .split(hasHashTag ? '#' : '?endpoint=')[1]
        .split('-')[0]
      keyPath = getKeyByEndpoint(flattenedSidebar, endpoint, apiSlug, method)
    }
    parentsArray.push(activeSlug)
    if (keyPath) {
      getParents(keyPath, 'slug', flattenedSidebar, parentsArray)
    }
  } else {
    activeSlug = parentsArray[parentsArray.length - 1]
  }

  useEffect(() => {
    const timer = setTimeout(() => setExpandDelayStatus && setExpandDelayStatus(false), 5000)
    closeSidebarElements(parentsArray)
    parentsArray.forEach((slug: string) => {
      openSidebarElement(slug)
    })
    setActiveSidebarElement(activeSlug?.replace('?endpoint=', '#'))
    return () => {
      clearTimeout(timer)
    }
  }, [activeSidebarElement, router])
}