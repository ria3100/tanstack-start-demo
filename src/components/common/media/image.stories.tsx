import type { Meta, StoryObj } from '@storybook/react-vite'
import { Image } from './image'

const SRC = 'https://res.cloudinary.com/demo/image/upload/cld-sample-2.jpg'

const meta = {
  title: 'Common/Media/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

export const Constrained: Story = {
  args: {
    src: SRC,
    width: 600,
    height: 400,
    alt: 'Constrained image',
  },
}

export const Fixed: Story = {
  args: {
    src: SRC,
    layout: 'fixed',
    width: 300,
    height: 200,
    alt: 'Fixed image',
  },
}

export const FullWidth: Story = {
  args: {
    src: SRC,
    layout: 'fullWidth',
    alt: 'Full width image',
  },
}

export const Priority: Story = {
  args: {
    src: SRC,
    width: 600,
    height: 400,
    alt: 'Priority image',
    priority: true,
  },
}
