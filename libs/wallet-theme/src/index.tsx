import { createContext } from 'react'

// @TODO: remove later and use something generic from ui-toolkit
export const ThemeContext = createContext<'light' | 'dark'>('dark')

export const ThemeProvider = ThemeContext.Provider
