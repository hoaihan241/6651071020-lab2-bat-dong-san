import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Header() {
    return (
        <header className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
            <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
                <Link to="/" className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                    Nhà Đất Việt
                </Link>
                <ThemeToggle />
            </div>
        </header>
    )
}