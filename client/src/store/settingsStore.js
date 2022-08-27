import create from 'zustand'
import { persist } from 'zustand/middleware'


let settingsStore = set => ({
  theme: null,
  setTheme: (theme) => set(() => ({ theme: theme }))
})

settingsStore = persist(settingsStore, { name: 'theme' })
const useSettingsStore = create(settingsStore)


export default useSettingsStore