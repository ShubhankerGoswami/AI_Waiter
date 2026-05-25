import client from './client'

export const onboardingApi = {
  async step1(data) {
    const form = new FormData()
    form.append('restaurant_name', data.restaurant_name)
    form.append('restaurant_type', data.restaurant_type)
    form.append('location_state', data.location_state)
    form.append('location_city', data.location_city)
    form.append('is_chain', data.is_chain)
    if (data.logo) form.append('logo', data.logo)
    const res = await client.post('/onboarding/step1', form)
    return res.data
  },

  async step2(menuFile) {
    const form = new FormData()
    if (menuFile) form.append('menu', menuFile)
    const res = await client.post('/onboarding/step2', form)
    return res.data
  },

  async complete() {
    const res = await client.post('/onboarding/complete')
    return res.data
  },
}
