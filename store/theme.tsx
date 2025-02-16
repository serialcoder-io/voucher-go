import React, { createContext, useContext, useState, useMemo } from 'react';
import { Appearance } from 'react-native';
import { light, dark } from '@/constants/Colors';

type ThemeMode = 'auto' | 'light' | 'dark';

interface ThemeContextProps {
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    theme: typeof light;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
    const systemTheme = Appearance.getColorScheme();

    const theme = useMemo(() => {
        const isDark = themeMode === 'dark' || (themeMode === 'auto' && systemTheme === 'dark');
        return isDark ? dark : light;
    }, [themeMode, systemTheme]);

    return (
        <ThemeContext.Provider value={{ themeMode, setThemeMode, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme doit être utilisé à l\'intérieur de ThemeProvider');
    }
    return context;
};
