import { useEffect, useRef, useState, useContext } from 'react'
import { Flex, Text, Box } from '@vtex/brand-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './styles'
import type { SidebarSectionProps } from './../sidebar-section'
import SidebarSection from './../sidebar-section'
import { iconTooltipStyle } from './functions'

import { SidebarContext } from 'utils/context/sidebar'
import { flattenJSON, getKeyByEndpoint, getParents } from 'utils/navigation-utils'
import { Section } from 'utils/types'
import Tooltip from 'components/tooltip'

interface SideBarSectionState {
  parentsArray?: string[]
}

const SidebarComponent = ({ parentsArray = [] }: SideBarSectionState) => {
  const [expandDelayStatus, setExpandDelayStatus] = useState(true)

  const {
    activeSectionName,
    setActiveSectionName,
    activeSidebarElement,
    sidebarDataMaster,
    setActiveSidebarElement,
    openSidebarElement,
    closeSidebarElements,
    isEditorPreview,
    sidebarSections,
  } = useContext(SidebarContext)

  const router = useRouter()
  const flattenedSidebar = flattenJSON(sidebarDataMaster)
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
    const timer = setTimeout(() => setExpandDelayStatus(false), 5000)
    closeSidebarElements(parentsArray)
    parentsArray.forEach((slug: string) => {
      openSidebarElement(slug)
    })
    setActiveSidebarElement(activeSlug?.replace('?endpoint=', '#'))
    return () => {
      clearTimeout(timer)
    }
  }, [activeSidebarElement, router])

  const SideBarIcon = (sectionElement: Section) => {
    const [iconTooltip, setIconTooltip] = useState(false)
    const [tooltipLabel, setTooltipLabel] = useState(sectionElement.title)
    const titleRef = useRef<HTMLElement>()

    useEffect(() => {
      const resizeObserver = new MutationObserver(function (entries) {
        const target = entries[0].target as HTMLElement
        if (target.offsetWidth < target.scrollWidth) setIconTooltip(true)
        else setIconTooltip(false)

        if (target.offsetWidth > 0) setTooltipLabel(target.innerText)
      })
      if (titleRef.current) {
        if (titleRef.current.offsetWidth < titleRef.current.scrollWidth)
          setIconTooltip(true)
        resizeObserver.observe(titleRef.current, {
          childList: true,
        })
      }
      return () => {
        resizeObserver.disconnect
      }
    }, [titleRef.current])

    return (
      <Box sx={styles.linkContainer}>
        <Tooltip
          sx={iconTooltipStyle(iconTooltip)}
          placement="right"
          label={tooltipLabel}
        >
          <Link
            href={!isEditorPreview ? sectionElement.link : '/'}
            onClick={(e) => {
              if (isEditorPreview) {
                e.preventDefault()
              }
              setActiveSectionName(sectionElement.title)
            }}
            passHref
            aria-label={sectionElement.title}
          >
            <Flex
              sx={
                activeSectionName === sectionElement.title
                  ? styles.iconBoxActive
                  : styles.iconBox
              }
            >
              <sectionElement.Icon
                sx={
                  activeSectionName === sectionElement.title
                    ? styles.iconActive
                    : styles.icon
                }
              />
              <Text
                className={expandDelayStatus ? 'iconDescriptionExpanded' : ''}
                ref={titleRef}
                sx={styles.iconTitle}
              >
                {sectionElement.title}
              </Text>
            </Flex>
          </Link>
        </Tooltip>
      </Box>
    )
  }

  return (
    <Flex sx={styles.sidebar}>
      <Flex
        className={expandDelayStatus ? 'iconContainerExpanded' : ''}
        sx={styles.sidebarIcons}
      >
        {sidebarSections.map((section, id) => {
          return (
            <>
              {id > 0 && (
                <Box sx={styles.sectionDivider}>
                  <hr />
                </Box>
              )}
              <Flex sx={styles.sidebarIconsContainer}>
                {section.map((element) => (
                  <SideBarIcon
                    {...element}
                    key={`sidebar-icon-${element.title}`}
                  />
                ))}
              </Flex>
            </>
          )
        })}
      </Flex>
      {activeSectionName ? (
        <SidebarSection
          {...(Array.isArray(sidebarDataMaster)
            ? sidebarDataMaster?.find(
                (section: SidebarSectionProps) =>
                  section.documentation === activeSectionName
              )
            : null)}
        />
      ) : null}
    </Flex>
  )
}

export default SidebarComponent
