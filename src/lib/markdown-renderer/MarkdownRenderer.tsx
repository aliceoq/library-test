import { Box } from '@vtex/brand-ui'
import { MDXRemote } from 'next-mdx-remote'
import { MarkdownRendererProps } from './MarkdownRenderer.types'
import { LibraryContext } from 'utils/context/test'
import components from './components'
import { useContext, useEffect } from 'react'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MDXRemote2 = MDXRemote as any

const MarkdownRenderer = ({ serialized }: MarkdownRendererProps) => {
  const { setTestValue } = useContext(LibraryContext)
  
  useEffect(() => {
    setTestValue('AAAAAAAAAAAAAAA')
  }, [])

  return (
  <Box>
    <MDXRemote2 components={components} lazy {...serialized} />
  </Box>
)}

export default MarkdownRenderer
