import { create } from 'zustand'
import { Appearance, ColorSchemeName } from 'react-native'
import { light, dark } from "@/constants/Colors"

interface ThemeState {
    themeMode: 'auto' | 'light' | 'dark'
    systemTheme: ColorSchemeName
    setThemeMode: (themeMode: 'auto' | 'light' | 'dark') => void
    getTheme: () => typeof light // or: typeof light | typeof dark
}

const useThemeStore = create<ThemeState>((set, get) => ({
    themeMode: 'auto',
    systemTheme: Appearance.getColorScheme(),
    setThemeMode: (mode) => set({ themeMode: mode }),
    getTheme: () => {
        const { themeMode, systemTheme } = get()
        const isDark = themeMode === 'dark' || (themeMode === 'auto' && systemTheme === 'dark')
        return isDark ? dark : light
    },
}))

export default useThemeStore

