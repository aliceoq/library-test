import {
  Header,
  HamburgerMenu as VtexHamburgerMenu,
  Box,
  IconCaret,
  Button,
} from '@vtex/brand-ui'
import styles from './styles'

import { useContext } from 'react'
import DocumentationCard from 'components/documentation-card'
import SidebarSection, { SidebarSectionProps } from 'components/sidebar-section'
import { updateOpenPage } from 'utils/sidebar-utils'
import { LibraryContext } from 'utils/context/libraryContext'

interface HamburgerMenuProps {
  parentsArray?: string[]
}

const HamburgerMenu = ({ parentsArray = [] }: HamburgerMenuProps) => {
  const context = useContext(LibraryContext)
  const {
    sidebarDataMaster,
    sidebarSectionHidden,
    activeSectionName,
    setActiveSectionName,
    setSidebarSectionHidden,
    sidebarSections,
  } = context

  updateOpenPage({ parentsArray, context })

  return (
    <Header.ActionButton>
      <VtexHamburgerMenu sx={styles.hamburgerContainer}>
        <VtexHamburgerMenu.Menu sx={styles.innerHambugerContainer}>
          <Box sx={styles.menuContainer}>
            <Box sx={styles.cardContainer}>
              <Box sx={styles.hamburgerSearchContainer}>
                {/* <SearchInput /> */}
              </Box>
              {sidebarSections.map((section, id) => (
                <Box
                  sx={
                    id > 0
                      ? styles.updatesContainer
                      : styles.documentationContainer
                  }
                  key={id}
                  data-cy="dropdown-menu-first-section"
                >
                  {section.map((card) => (
                    <Box sx={styles.innerCardContainer} key={card.title}>
                      <DocumentationCard containerType="mobile" {...card} />
                      <Button
                        aria-label={'Open sidebar'}
                        size="regular"
                        variant="tertiary"
                        icon={() => <IconCaret direction="right" size={32} />}
                        sx={
                          activeSectionName === card.title &&
                          !sidebarSectionHidden
                            ? styles.arrowIconActive
                            : styles.arrowIcon
                        }
                        onClick={() => {
                          setActiveSectionName(card.title)
                          setSidebarSectionHidden(false)
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
            <Box
              className={
                sidebarSectionHidden || !activeSectionName ? '' : 'menuHidden'
              }
              sx={styles.sideMenuContainer}
            >
              {activeSectionName ? (
                <SidebarSection
                  isHamburgerMenu={true}
                  {...(Array.isArray(sidebarDataMaster)
                    ? sidebarDataMaster?.find(
                        (section: SidebarSectionProps) =>
                          section.documentation === activeSectionName
                      )
                    : null)}
                />
              ) : null}
            </Box>
          </Box>
        </VtexHamburgerMenu.Menu>
      </VtexHamburgerMenu>
    </Header.ActionButton>
  )
}

export default HamburgerMenu
