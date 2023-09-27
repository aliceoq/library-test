import { SxStyleProp } from '@vtex/brand-ui'

const container: SxStyleProp = {
  display: ['none', 'none', 'none', 'initial'],
  height: '100%',
  width: '242px',
  border: '1px solid #E7E9EE',
  borderRadius: '4px',
  mr: ['32px', '32px', '32px', '32px', '32px', '32px', '64px'],
  mt: '96px',
}

const notesSection: SxStyleProp = {
  px: '8px',
  paddingTop: '8px',
}

const sectionDivider: SxStyleProp = {
  px: '8px',
  marginTop: '16px',
  hr: {
    border: '1px solid #E7E9EE',
    borderTop: 'none',
  },
}

export default {
  container,
  notesSection,
  sectionDivider,
}
