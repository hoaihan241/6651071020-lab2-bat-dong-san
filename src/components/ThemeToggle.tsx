import { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const [dark, setDark] = useState<boolean>(() => {
        const saved = localStorage.getItem('theme')
        if (saved) return saved === 'dark'
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark)
        localStorage.setItem('theme', dark ? 'dark' : 'light')
    }, [dark])

    return (
        <button
            type="button"
            onClick={() => setDark(d => !d)}
            aria-label={dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
            className="rounded-full border border-slate-300 px-3 py-1.5 text-lg dark:border-slate-600"
        >
            {dark ? '☀️' : '🌙'}
        </button>
    )
}