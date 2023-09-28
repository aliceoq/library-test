export type ActiveItem = {
  item: string
  subItem: string
}

interface SubItem {
  title: string
  slug: string
}

export interface Item extends SubItem {
  children: SubItem[]
}
