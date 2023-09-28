/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useRef, useState } from 'react'
import { Box, Flex } from '@vtex/brand-ui'
import {
  ReactSVGPanZoom,
  UncontrolledReactSVGPanZoom,
} from 'react-svg-pan-zoom'
import mermaid from 'mermaid'
import parse from 'html-react-parser'
import { InView } from 'react-intersection-observer'

import CodeBlock from 'components/code-block'
import OverviewCard from 'components/overview-card'
import YoutubeFrame from 'components/youtube-frame'
import Steps from 'components/steps'
import LightBox from 'components/lightbox'
import WhatsNextCard from 'components/whats-next-card'

import { LibraryContext } from 'utils/context/libraryContext'
import { childrenToString, slugify } from 'utils/string-utils'
import mermaidInit from 'utils/mermaidInit'

import { Component, ObservableHeadingProps } from './MarkdownRenderer.types'
import styles from './styles.module.css'

mermaidInit()

const ObservableHeading = ({
  level,
  onEnterView,
  onLeaveView,
  ...headingProps
}: ObservableHeadingProps) => {
  const [y, setY] = useState(Infinity)
  const toSlugify = childrenToString(headingProps.children)
  const slug = slugify(toSlugify)
  return (
    <InView
      threshold={0.5}
      className="heading"
      rootMargin="0px 0px -80% 0px"
      onChange={(inView, entry) => {
        if (inView) onEnterView(slug)
        else onLeaveView(slug, entry, y)

        setY(entry.boundingClientRect.y)
      }}
    >
      {level === 2 ? (
        <h2 id={slug} className={styles.heading} {...headingProps} />
      ) : (
        <h3 id={slug} className={styles.heading} {...headingProps} />
      )}
    </InView>
  )
}

const Callout = ({ node, icon, ...props }: Component) => {
  const blockquoteType: string = icon ? icon : 'info'
  return (
    <blockquote
      className={`${styles.blockquote} ${
        blockquoteType === 'info'
          ? styles.blockquoteInfo
          : blockquoteType === 'danger'
          ? styles.blockquoteDanger
          : blockquoteType === 'warning'
          ? styles.blockquoteWarning
          : blockquoteType === 'success'
          ? styles.blockquoteSuccess
          : ''
      }`}
    >
      <p {...props} />
    </blockquote>
  )
}

const MermaidDiagram = ({ node, ...props }: Component) => {
  const viewerRef = useRef<ReactSVGPanZoom>(null)
  const ref = useRef<HTMLElement>()

  const [diagram, setDiagram] = useState('')
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (!ref.current) return
      setWidth(ref.current?.clientWidth ?? 0)
      setHeight(ref.current?.clientWidth / 2 ?? 0)
    })

    const mermaidRenderer = async function () {
      const { svg } = await mermaid.render('mermaid-id', props.children)
      setDiagram(
        svg.replace('id="mermaid-id"', '').replaceAll('#mermaid-id', '')
      )
    }

    mermaidRenderer()
    if (ref.current) resizeObserver.observe(ref.current)
  }, [])

  return (
    <Box ref={ref} className={styles.svgContainer}>
      <UncontrolledReactSVGPanZoom
        ref={viewerRef}
        width={width}
        height={height}
        miniatureProps={{
          position: 'none',
          width: 100,
          height: 80,
          background: '#616264',
        }}
        background={'rgba(0, 0, 0, 0)'}
        detectAutoPan={false}
        detectWheel={false}
      >
        <svg width={width} height={height}>
          {parse(diagram)}
        </svg>
      </UncontrolledReactSVGPanZoom>
    </Box>
  )
}

const ImageComponent = ({ node, ...props }: Component) => {
  const [srcHasError, setSrcHasError] = useState(false)
  const regularImg = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={props.src} alt={props.alt} onError={() => setSrcHasError(true)} />
  )
  const errorMessage = (
    <blockquote className={`${styles.blockquote} ${styles.blockquoteWarning}`}>
      {'ErrorMessage'} {props.src}
    </blockquote>
  )

  let data: { base64: string; img: object } = { base64: '', img: {} }
  try {
    data = JSON.parse(props.alt)
  } catch (error) {
    console.log(`Error parsing`, error)
    return errorMessage
  }
  return !srcHasError ? <LightBox>{regularImg}</LightBox> : errorMessage
}

export default {
  OverviewCard,
  WhatsNextCard,
  YoutubeFrame,
  Steps,
  Flex: ({ node, ...props }: Component) => (
    <Flex className={styles.flexWrap} {...props} />
  ),
  table: ({ node, ...props }: Component) => <table {...props} />,
  td: ({ node, ...props }: Component) => <td {...props} />,
  img: ImageComponent,
  blockquote: ({ ...props }: Component) => {
    return <Callout {...props} />
  },
  code: ({ node, ...props }: Component) => {
    return <code className={styles.code} {...props}></code>
  },
  pre: ({ ...props }: Component) => {
    if (props.className && props.className === 'mermaid')
      return <MermaidDiagram {...props} />

    return <CodeBlock {...props} />
  },
  h2: ({ node, ...props }: Component) => {
    const { activeItem, setActiveItem, goToPreviousItem } =
      useContext(LibraryContext)

    return (
      <ObservableHeading
        level={2}
        onEnterView={(slug) => {
          setActiveItem(({ item, subItem }) => ({
            item: slug,
            subItem: item !== slug ? '' : subItem,
          }))
        }}
        onLeaveView={(slug, entry, y) => {
          if (entry.boundingClientRect.y > y && activeItem.item === slug) {
            goToPreviousItem()
          }
        }}
        {...props}
      />
    )
  },
  h3: ({ node, ...props }: Component) => {
    const { activeItem, setActiveItem, goToPreviousSubItem } =
      useContext(LibraryContext)

    return (
      <ObservableHeading
        level={3}
        onEnterView={(slug) => {
          setActiveItem(({ item }) => ({
            item,
            subItem: slug,
          }))
        }}
        onLeaveView={(slug, entry, y) => {
          if (entry.boundingClientRect.y > y && activeItem.subItem === slug) {
            goToPreviousSubItem()
          }
        }}
        {...props}
      />
    )
  },
}
