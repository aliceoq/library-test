import { useEffect, useRef, useState } from "react"
import { ActiveItem, Item } from "lib/table-of-contents/TableOfContents.types"

export function useHeadingObserver(headings: Item[]) {
  const [y, setY] = useState(Infinity)
  const observer = useRef<IntersectionObserver>()
  const [activeItem, setActiveItem] = useState<ActiveItem>({
    item: '',
    subItem: '',
  })

  const goToPreviousItem = () => {
    setActiveItem(({ item, subItem }) => {
      const index = headings.findIndex((heading) => heading.slug === item)
      if (index === -1) return { item, subItem }

      const previousItem = !index ? '' : headings[index - 1].slug
      const previousChildren = !index ? [] : headings[index - 1].children
      const previousSubItem = !previousChildren.length
        ? ''
        : previousChildren.slice(-1)[0].slug

      return {
        item: previousItem,
        subItem: previousSubItem,
      }
    })
  }

  const updateActiveItem = (slug: string, level: number) => {
    setActiveItem(({item}) => ({
      item: level === 1 ? slug : item,
      subItem: level === 1 ? '' : slug,
    }))
  }

  
  
  useEffect(() => {
    const handleObsever = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const currentY = entry.target.getBoundingClientRect().y
        if (entry?.isIntersecting) {
          const slug = entry.target.id 
          setY(currentY)
          if(entry.target.tagName === 'H2') {
            setActiveItem(({ item, subItem }) => ({
              item: slug,
              subItem: item !== slug ? '' : subItem,
            }))
          } else {
            setActiveItem(({ item }) => ({
              item,
              subItem: slug,
            }))
          }
        } else if (activeItem?.item === entry.target.id && currentY > y) {
          goToPreviousItem()
        }
      })
    }
  
    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: "0px 0px -80% 0px", threshold: 0.5}
    )
  
    const elements = document.querySelectorAll("h2, h3")
    elements.forEach((elem) => observer.current?.observe(elem))
    return () => observer.current?.disconnect()
  }, [])

  return { activeItem, updateActiveItem }
}