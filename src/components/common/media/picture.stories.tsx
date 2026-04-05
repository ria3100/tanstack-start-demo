import type { Meta, StoryObj } from '@storybook/react-vite'

import { Picture } from './picture'

const MOBILE = 'https://res.cloudinary.com/demo/image/upload/cld-sample-2.jpg'
const TABLET = 'https://res.cloudinary.com/demo/image/upload/cld-sample-4.jpg'
const DESKTOP = 'https://res.cloudinary.com/demo/image/upload/balloons.jpg'

const meta = {
  title: 'Common/Media/Picture',
  component: Picture,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Picture>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: MOBILE,
    width: 400,
    height: 300,
    alt: 'Sample image',
  },
}

export const Responsive: Story = {
  args: {
    src: MOBILE,
    width: 400,
    height: 300,
    alt: 'Responsive image',
    md: { src: TABLET, width: 800, height: 400 },
    lg: { src: DESKTOP, width: 1200, height: 600 },
  },
}

export const FullWidth: Story = {
  args: {
    src: MOBILE,
    layout: 'fullWidth',
    alt: 'Full width image',
    md: { src: TABLET },
    lg: { src: DESKTOP },
  },
}

export const WithFormatSources: Story = {
  args: {
    src: MOBILE,
    width: 800,
    height: 600,
    alt: 'Format sources',
    sources: [{ type: 'image/webp', width: 800, height: 600 }],
  },
}
