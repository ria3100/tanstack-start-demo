import { render } from '@testing-library/react'
import { describe, expect, it } from 'vite-plus/test'

import { Picture, screens } from './picture'

describe('Picture', () => {
  it('picture要素内にimg要素をレンダリングする', () => {
    const { container } = render(
      <Picture src="https://example.com/mobile.jpg" width={400} height={300} alt="test" />,
    )
    const picture = container.querySelector('picture')
    expect(picture).toBeTruthy()
    expect(picture!.querySelector('img')).toBeTruthy()
  })

  it('breakpoint指定でsource要素が生成される', () => {
    const { container } = render(
      <Picture
        src="https://example.com/mobile.jpg"
        width={400}
        height={300}
        alt="responsive"
        md={{ src: 'https://example.com/tablet.jpg', width: 800, height: 400 }}
        lg={{ src: 'https://example.com/desktop.jpg', width: 1200, height: 600 }}
      />,
    )
    const sources = container.querySelectorAll('picture source')
    expect(sources.length).toBe(2)
  })

  it('source要素に正しいmedia属性が設定される', () => {
    const { container } = render(
      <Picture
        src="https://example.com/mobile.jpg"
        width={400}
        height={300}
        alt="media"
        md={{ src: 'https://example.com/tablet.jpg' }}
        lg={{ src: 'https://example.com/desktop.jpg' }}
      />,
    )
    const sources = container.querySelectorAll('picture source')
    const mediaValues = Array.from(sources).map((s) => s.getAttribute('media'))
    expect(mediaValues).toContain(`(min-width: ${screens.lg}px)`)
    expect(mediaValues).toContain(`(min-width: ${screens.md}px)`)
  })

  it('source要素はlg, mdの順（大きいbreakpointが先）で並ぶ', () => {
    const { container } = render(
      <Picture
        src="https://example.com/mobile.jpg"
        width={400}
        height={300}
        alt="order"
        sm={{ src: 'https://example.com/sm.jpg' }}
        lg={{ src: 'https://example.com/lg.jpg' }}
      />,
    )
    const sources = container.querySelectorAll('picture source')
    expect(sources[0].getAttribute('media')).toBe(`(min-width: ${screens.lg}px)`)
    expect(sources[1].getAttribute('media')).toBe(`(min-width: ${screens.sm}px)`)
  })

  it('breakpoint未指定時はsource要素が生成されない', () => {
    const { container } = render(
      <Picture src="https://example.com/mobile.jpg" width={400} height={300} alt="no-source" />,
    )
    const sources = container.querySelectorAll('picture source')
    expect(sources.length).toBe(0)
  })

  it('breakpointのwidth/height省略時はレスポンシブstyleが生成されない', () => {
    const { container } = render(
      <Picture
        src="https://example.com/mobile.jpg"
        width={400}
        height={300}
        alt="inherit"
        md={{ src: 'https://example.com/tablet.jpg' }}
      />,
    )
    const style = container.querySelector('style')
    expect(style?.textContent).not.toContain('@media')
  })

  it('style要素にベースサイズが含まれる', () => {
    const { container } = render(
      <Picture src="https://example.com/mobile.jpg" width={400} height={300} alt="style" />,
    )
    const style = container.querySelector('style')
    expect(style?.textContent).toContain('width:400px')
    expect(style?.textContent).toContain('height:300px')
  })

  it('breakpoint指定時にレスポンシブなstyleが生成される', () => {
    const { container } = render(
      <Picture
        src="https://example.com/mobile.jpg"
        width={400}
        height={300}
        alt="responsive-style"
        md={{ src: 'https://example.com/tablet.jpg', width: 800, height: 400 }}
      />,
    )
    const style = container.querySelector('style')
    expect(style?.textContent).toContain(`@media(min-width:${screens.md}px)`)
    expect(style?.textContent).toContain('width:800px')
    expect(style?.textContent).toContain('height:400px')
  })

  it('sources指定でフォーマット用のsource要素が生成される', () => {
    const { container } = render(
      <Picture
        src="https://example.com/photo.jpg"
        width={800}
        height={600}
        alt="format"
        sources={[{ type: 'image/webp', width: 800, height: 600 }]}
      />,
    )
    const source = container.querySelector('picture source[type="image/webp"]')
    expect(source).toBeTruthy()
  })

  it('classNameがpicture要素に適用される', () => {
    const { container } = render(
      <Picture
        src="https://example.com/mobile.jpg"
        width={400}
        height={300}
        alt="class"
        className="my-picture"
      />,
    )
    const picture = container.querySelector('picture')
    expect(picture?.classList.contains('my-picture')).toBe(true)
  })
})
