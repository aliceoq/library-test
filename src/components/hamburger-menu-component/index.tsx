import {
  Header,
  HamburgerMenu as VtexHamburgerMenu,
  Box,
  IconCaret,
  Button,
} from '@vtex/brand-ui'
import styles from './styles'


import { useContext, useState } from 'react'
import { SidebarContext } from 'utils/context/sidebar'
import DocumentationCard from 'components/documentation-card'
import SidebarSection, { SidebarSectionProps } from 'components/sidebar-section'
import { updateOpenPage } from 'utils/sidebar-utils'


const HamburgerMenuComponent = () => {  
  const context = useContext(SidebarContext)
  const {
    sidebarDataMaster,
    sidebarSectionHidden,
    activeSidebarTab,
    setActiveSidebarTab,
    setSidebarSectionHidden,
    sidebarSections,
  } = context

  updateOpenPage({context})

  return (
    <Header.ActionButton>
      <VtexHamburgerMenu sx={styles.hamburgerContainer}>
        <VtexHamburgerMenu.Menu sx={styles.innerHambugerContainer}>
          <Box sx={styles.menuContainer}>
            <Box sx={styles.cardContainer}>
              {/*<Box sx={styles.hamburgerSearchContainer}>
                <SearchInput />
              </Box>*/}
              {sidebarSections.map((section, id) => {
                return (
                  <>
                    {id > 0 && (
                      <Box sx={styles.sectionDivider}>
                        <hr />
                      </Box>
                    )}
                    <Box
                      sx={styles.documentationContainer}
                      data-cy="dropdown-menu-first-section"
                    >
                      {section.map((card) => (
                        <Box sx={styles.innerCardContainer} key={card.title}>
                          <DocumentationCard containerType="mobile" {...card} />
                          <Button
                            aria-label={'Open sidebar'}
                            size="regular"
                            variant="tertiary"
                            icon={() => (
                              <IconCaret direction="right" size={32} />
                            )}
                            sx={
                              activeSidebarTab === card.title &&
                              !sidebarSectionHidden
                                ? styles.arrowIconActive
                                : styles.arrowIcon
                            }
                            onClick={() => {
                              setActiveSidebarTab(card.title)
                              setSidebarSectionHidden(false)
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </>
                )
              })}
            </Box>
            <Box
              className={
                sidebarSectionHidden || !activeSidebarTab ? '' : 'menuHidden'
              }
              sx={styles.sideMenuContainer}
            >
              {activeSidebarTab ? (
                <SidebarSection
                  isHamburgerMenu={true}
                  {...(Array.isArray(sidebarDataMaster)
                    ? sidebarDataMaster?.find(
                        (section: SidebarSectionProps) =>
                          section.documentation === activeSidebarTab
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

export default HamburgerMenuComponent
