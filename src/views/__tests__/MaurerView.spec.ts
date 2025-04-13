import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from '@/views/MaurerView.vue'
import { EventCategory } from '@/views/MaurerView.vue'

describe('MaurerView.vue', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(Component)
    expect(wrapper.find('h1').text()).toBe('Maurer Schema')
    expect(wrapper.find('v-card-subtitle').text()).toContain(
      'Für die Ermittlung der Personalstärke und Qualifikation beim Sanitätswachdienst'
    )
    expect(wrapper.find('.text-h3').text()).toBe('0')
  })

  it('calculates correct factor for event categories', () => {
    const wrapper = mount(Component)
    const vm = wrapper.vm as any

    expect(vm.factor(EventCategory.sport)).toBe(0.3)
    expect(vm.factor(EventCategory.rock)).toBe(1.2)
    expect(vm.factor(EventCategory.opera)).toBe(0.2)
    expect(vm.factor(999)).toBe(0.2)
  })

  it('returns correct event category name', () => {
    const wrapper = mount(Component)
    const vm = wrapper.vm as any

    expect(vm.eventCategoryName(EventCategory.fireworks)).toBe('Feuerwerk')
    expect(vm.eventCategoryName(EventCategory.karnevalParade)).toBe('Karnevalsumzug')
  })

  it('computes visitor points correctly', () => {
    const wrapper = mount(Component)
    const vm = wrapper.vm as any

    expect(vm.visitorPoints(300)).toBe(1)
    expect(vm.visitorPoints(1500)).toBe(3)
    expect(vm.visitorPoints(25000)).toBe(8)
  })

  it('computes points and resources based on input', async () => {
    const wrapper = mount(Component)
    const vm = wrapper.vm as any

    vm.fg.maxBesucher = 8000
    vm.fg.besucher = 7000
    vm.fg.indoor = true
    vm.fg.gewalt = true
    vm.fg.vips = 3
    vm.fg.veranstaltungskategorie = EventCategory.fireworks

    await wrapper.vm.$nextTick()

    expect(vm.visitors).toBe(26)
    expect(vm.rg).toBe(0.4)
    expect(vm.risk).toBe(16)
    expect(vm.points).toBe(26)
    expect(vm.helfer).toBe(20)
    expect(vm.ktw).toBe(3)
    expect(vm.rtw).toBe(2)
    expect(vm.na).toBe(1)
    expect(vm.uhs).toBe(0)
    expect(vm.el).toBe('keine stabsmäßige Einsatzleitung')
  })

  it('computes Einsatzleitung text correctly', async () => {
    const wrapper = mount(Component)
    const vm = wrapper.vm as any

    vm.fg.maxBesucher = 10000
    vm.fg.besucher = 10000
    vm.fg.indoor = false
    vm.fg.gewalt = true
    vm.fg.vips = 15
    vm.fg.veranstaltungskategorie = EventCategory.rock

    await wrapper.vm.$nextTick()

    expect(vm.el).toBe('voll stabsmäßige Einsatzleitung')
  })
})
