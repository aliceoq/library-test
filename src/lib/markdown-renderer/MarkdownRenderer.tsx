import React from 'react'
import { Box } from '@vtex/brand-ui'
import { MDXRemote } from 'next-mdx-remote'
import { MarkdownRendererProps } from './MarkdownRenderer.types'
import components from './components'
import '@highlightjs/cdn-assets/styles/github.min.css'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MDXRemote2 = MDXRemote as any

const MarkdownRenderer = ({ serialized }: MarkdownRendererProps) => (
  <Box>
    <MDXRemote2 components={components} lazy {...serialized} />
  </Box>
)

export default MarkdownRenderer
