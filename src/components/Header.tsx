import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.tsx'

const tabs = [
    { to: '/', label: 'Trang chủ', end: true },
    { to: '/gioi-thieu', label: 'Giới thiệu', end: false },
    { to: '/lien-he', label: 'Liên hệ', end: false },
]

const tabCls = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-emerald-700 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
    }`

export default function Header() {
    return (
        <header className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 p-4">
                <Link to="/" className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                    Nhà Đất Việt
                </Link>
                <nav aria-label="Menu chính" className="order-last flex w-full gap-1 sm:order-none sm:w-auto">
                    {tabs.map(t => (
                        <NavLink key={t.to} to={t.to} end={t.end} className={tabCls}>
                            {t.label}
                        </NavLink>
                    ))}
                </nav>
                <ThemeToggle />
            </div>
        </header>
    )
}