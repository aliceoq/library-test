import HamburgerMenuComponent from "components/hamburger-menu-component"
import SidebarContextProvider from "utils/context/sidebar"
import { Section } from "utils/types"

interface Props {
  parentsArray?: string[]
  sectionSelected?: string
  sections: Section[][]
  navigation: any //eslint-disable-line
  isPreview: boolean
}

const HamburgerMenu = ({
  sectionSelected,
  sections,
  navigation,
  isPreview,
}: Props) => {
  return (
    <SidebarContextProvider
      sections={sections}
      isPreview={isPreview}
      sectionSelected={sectionSelected ?? ''}
      fallback={navigation}
    >
      <HamburgerMenuComponent />
    </SidebarContextProvider>
  )
}

export default HamburgerMenu
