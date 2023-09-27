import { IconProps } from '@vtex/brand-ui'

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

export type IconComponent = (props: IconProps) => JSX.Element
