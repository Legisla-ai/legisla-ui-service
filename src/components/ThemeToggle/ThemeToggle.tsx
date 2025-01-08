'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import styles from './ThemeToggle.module.css'

export const ThemeToggle = () => {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        const initialTheme = savedTheme || systemTheme

        setTheme(initialTheme)
        document.documentElement.setAttribute('data-theme', initialTheme)
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', newTheme)
    }

    return (
        <button onClick={toggleTheme} className={styles.themeToggle}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            <span className={styles.srOnly}>
                {theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
            </span>
        </button>
    )
}
