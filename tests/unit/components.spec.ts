import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BasePill from '@/components/ui/BasePill.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import IconButton from '@/components/ui/IconButton.vue'
import StatTile from '@/components/ui/StatTile.vue'

describe('BasePill', () => {
  it('renders default button element with slot text', () => {
    const wrapper = mount(BasePill, {
      slots: { default: 'Test Pill' },
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.text()).toBe('Test Pill')
    expect(wrapper.classes()).toContain('rounded-lg')
  })

  it('applies active styling when active is true', () => {
    const wrapper = mount(BasePill, {
      props: { active: true },
      slots: { default: 'Active' },
    })
    expect(wrapper.classes()).toContain('bg-ink')
    expect(wrapper.classes()).toContain('text-on-ink')
  })
})

describe('BaseCard', () => {
  it('renders card with rounded styling and variant class', () => {
    const wrapper = mount(BaseCard, {
      props: { variant: 'dark' },
      slots: { default: '<p>Content</p>' },
    })
    expect(wrapper.classes()).toContain('rounded-card')
    expect(wrapper.classes()).toContain('bg-ink')
  })
})

describe('IconButton', () => {
  it('renders button with accessible aria-label', () => {
    const wrapper = mount(IconButton, {
      props: { ariaLabel: 'Search site' },
      slots: { default: '<span>Icon</span>' },
    })
    expect(wrapper.attributes('aria-label')).toBe('Search site')
    expect(wrapper.classes()).toContain('rounded-lg')
  })
})

describe('StatTile', () => {
  it('renders label and initial value', () => {
    const wrapper = mount(StatTile, {
      props: { label: '0-100 km/h', value: 1.9, unit: 'sec', decimals: 1 },
    })
    expect(wrapper.text()).toContain('0-100 km/h')
    expect(wrapper.text()).toContain('sec')
  })
})
