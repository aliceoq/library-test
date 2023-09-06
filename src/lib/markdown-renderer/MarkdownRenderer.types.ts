import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export type Component = {
  node: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface MarkdownRendererProps {
  serialized: MDXRemoteSerializeResult
}