import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vite-plus/test'

import { Image } from './image'

const SRC = 'https://res.cloudinary.com/demo/image/upload/sample.jpg'

afterEach(cleanup)

describe('Image', () => {
  it('img要素をレンダリングする', () => {
    const { container } = render(<Image src={SRC} width={400} height={300} alt="test" />)
    const img = container.querySelector('img')
    expect(img).toBeTruthy()
    expect(img!.getAttribute('alt')).toBe('test')
  })

  it('srcset属性が生成される', () => {
    const { container } = render(<Image src={SRC} width={400} height={300} alt="test" />)
    const img = container.querySelector('img')
    expect(img!.getAttribute('srcset')).toBeTruthy()
  })

  it('priority指定でloading=eagerになる', () => {
    const { container } = render(<Image src={SRC} width={400} height={300} alt="test" priority />)
    const img = container.querySelector('img')
    expect(img!.getAttribute('loading')).toBe('eager')
  })

  it('デフォルトでloading=lazyになる', () => {
    const { container } = render(<Image src={SRC} width={400} height={300} alt="test" />)
    const img = container.querySelector('img')
    expect(img!.getAttribute('loading')).toBe('lazy')
  })
})
