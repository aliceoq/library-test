import SidebarComponent from "components/sidebar-component"
import SidebarContextProvider from "utils/context/sidebar"
import { Section } from "utils/types"

interface Props {
  parentsArray?: string[]
  sectionSelected?: string
  sections: Section[][]
  navigation: any //eslint-disable-line
  isPreview: boolean
}

const Sidebar = ({
  parentsArray,
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
      <SidebarComponent parentsArray={parentsArray} />
    </SidebarContextProvider>
  )
}

export default Sidebar
