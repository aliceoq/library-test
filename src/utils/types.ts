import { IconProps } from '@vtex/brand-ui'
import { IconComponent } from 'components/overview-card'

export type Section = {
  link: string
  title: string
  description: string
  Icon: (props: IconProps) => JSX.Element
}

export type MethodType = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'

export type DataElement = {
  link: string
  Icon: IconComponent
  description: string
}