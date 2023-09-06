import React from 'react'
import { Box } from '@vtex/brand-ui'
import styles from './styles'

export interface StepsProps {
  children: string
}
const Steps = ({ children }: StepsProps) => {
  return <Box sx={styles.steps}>{children}</Box>
}
export default Steps
