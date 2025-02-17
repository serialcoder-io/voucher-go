import {useContext} from "react";
import {ThemeContext} from '@/store/theme'

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme doit être utilisé à l\'intérieur de ThemeProvider');
    }
    return context;
};