import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from '@/views/MunichView.vue'
import { EventCategory } from '@/views/MunichView.vue'

describe('MunichView.vue', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(Component)
    expect(wrapper.find('h1').text()).toBe('Münchner Bemessung')
    expect(wrapper.find('v-card-subtitle').text()).toContain(
      'Zur Festlegung des Kräfteansatzes für Sanitätsdienste auf Veranstaltungen'
    )
    expect(wrapper.find('.text-h3').text()).toBe('0')
  })

  it('updates totalPoints correctly based on input', async () => {
    const wrapper = mount(Component)

    await wrapper.setData({
      fg: {
        veranstaltungskategorie: EventCategory.soccer,
        besucher: 25000,
        gewalt: true,
        vip: false,
        erfahrung: false,
        wetter: false,
        alcohol: false,
        fire: false
      }
    })

    expect(wrapper.vm.totalPoints).toBe(9)
  })

  it('calculates risk correctly', () => {
    const wrapper = mount(Component)

    wrapper.setData({
      fg: {
        veranstaltungskategorie: EventCategory.classicalConcert,
        besucher: 5000,
        gewalt: true,
        vip: false,
        erfahrung: false,
        wetter: false,
        alcohol: false,
        fire: false
      }
    })

    expect(wrapper.vm.risk).toBe(0.8)
  })

  it('calculates addRisk correctly', () => {
    const wrapper = mount(Component)

    wrapper.setData({
      fg: {
        veranstaltungskategorie: EventCategory.classicalConcert,
        besucher: 5000,
        gewalt: true,
        vip: true,
        erfahrung: true,
        wetter: false,
        alcohol: false,
        fire: false
      }
    })

    expect(wrapper.vm.addRisk).toBe(3)
  })

  it('calculates result correctly', () => {
    const wrapper = mount(Component)

    wrapper.setData({
      fg: {
        veranstaltungskategorie: EventCategory.general,
        besucher: 60500,
        gewalt: false,
        vip: false,
        erfahrung: false,
        wetter: false,
        alcohol: false,
        fire: false
      }
    })

    expect(wrapper.vm.totalPoints).toBe(11)
    expect(wrapper.vm.sanitätshelfer).toBe(30)
    expect(wrapper.vm.rettungssanitäter).toBe(8)
    expect(wrapper.vm.ärzte).toBe(3)
    expect(wrapper.vm.notärzte).toBe(2)
    expect(wrapper.vm.sanitätsdienststationen).toBe(5)
    expect(wrapper.vm.aeds).toBe(5)
    expect(wrapper.vm.telSanitätsdienst).toBe('Ja')
    expect(wrapper.vm.sanitätsdienstkonzept).toBe('Ja')
  })

  it('can handle max values', () => {
    const wrapper = mount(Component)

    wrapper.setData({
      fg: {
        veranstaltungskategorie: EventCategory.airShow,
        besucher: 500000,
        gewalt: true,
        vip: true,
        erfahrung: true,
        wetter: true,
        alcohol: true,
        fire: true
      }
    })

    expect(wrapper.vm.totalPoints).toBeGreaterThan(25)
    expect(wrapper.vm.sanitätshelfer).toBe(86)
    expect(wrapper.vm.rettungssanitäter).toBe(23)
    expect(wrapper.vm.ärzte).toBe(7)
    expect(wrapper.vm.notärzte).toBe(6)
    expect(wrapper.vm.sanitätsdienststationen).toBe(10)
    expect(wrapper.vm.aeds).toBe(10)
    expect(wrapper.vm.telSanitätsdienst).toBe('Ja')
    expect(wrapper.vm.sanitätsdienstkonzept).toBe('Ja')
  })
})
