import { Image, Source } from '@unpic/react'
import { useId, type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

type Breakpoint = keyof typeof screens

type ResponsiveSource = {
  src: string
  width?: number
  height?: number
  type?: string
}

type PictureProps = ComponentProps<typeof Image> & {
  sources?: Array<{ type?: string; width?: number; height?: number; media?: string }>
} & {
  [K in Breakpoint]?: ResponsiveSource
}

/**
 * `@unpic/react` ベースの `<picture>` コンポーネント。
 * Tailwind breakpoint 名（`sm`〜`xl`）を prop に指定して画像を出し分ける。
 * `width`/`height` 省略時はベースの値を引き継ぐ。`sources` でフォーマット切り替えも併用可能。
 *
 * @example
 * <Picture
 *   src="/hero-mobile.jpg" width={400} height={300} alt="Hero"
 *   md={{ src: "/hero-md.jpg", width: 800, height: 400 }}
 *   lg={{ src: "/hero-lg.jpg", width: 1200, height: 600 }}
 * />
 */
function Picture({ sources, className, sm, md, lg, xl, ...rest }: PictureProps) {
  const { ...imageProps } = rest
  const responsive = [
    { bp: 'xl' as const, value: xl },
    { bp: 'lg' as const, value: lg },
    { bp: 'md' as const, value: md },
    { bp: 'sm' as const, value: sm },
  ]

  const id = useId().replace(/:/g, '')
  const cls = `picture-${id}`
  const hasResponsiveSize = responsive.some(({ value }) => value?.width || value?.height)

  const baseW = imageProps.width as number | undefined
  const baseH = imageProps.height as number | undefined
  const baseStyle = [
    baseW ? `width:${baseW}px;` : '',
    baseH ? `height:${baseH}px;` : '',
    'object-fit:cover;',
  ].join('')

  const responsiveStyles = hasResponsiveSize
    ? responsive
        .filter(({ value }) => value?.width || value?.height)
        .map(({ bp, value }) => {
          const w = value!.width ?? baseW
          const h = value!.height ?? baseH
          return `@media(min-width:${screens[bp]}px){.${cls}{${w ? `width:${w}px;` : ''}${h ? `height:${h}px;` : ''}}}`
        })
        .join('')
    : ''

  return (
    <>
      <style>{`.${cls}{${baseStyle}}${responsiveStyles}`}</style>
      <picture className={cn(className)}>
        {responsive.map(
          ({ bp, value }) =>
            value && (
              <Source
                key={bp}
                src={value.src}
                type={value.type}
                layout="constrained"
                media={`(min-width: ${screens[bp]}px)`}
                width={value.width ?? (baseW as number)}
                height={value.height ?? (baseH as number)}
              />
            ),
        )}
        {sources?.map((sourceProps, i) => (
          <Source
            key={i}
            src={imageProps.src}
            layout="constrained"
            width={(sourceProps.width ?? baseW) as number}
            height={(sourceProps.height ?? baseH) as number}
            type={sourceProps.type}
            media={sourceProps.media}
          />
        ))}
        <Image className={cls} unstyled {...imageProps} />
      </picture>
    </>
  )
}

export { Picture, type PictureProps, screens }
