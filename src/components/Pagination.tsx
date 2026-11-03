interface Props {
    page: number
    totalPages: number
    onChange: (page: number) => void
}

const btn = 'min-w-10 rounded-lg border border-slate-300 px-3 py-2 disabled:opacity-40 dark:border-slate-600'

export default function Pagination({ page, totalPages, onChange }: Props) {
    if (totalPages <= 1) return null
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <nav aria-label="Phân trang" className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button type="button" className={btn} disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Trang trước">‹</button>
            {pages.map(n => (
                <button
                    key={n}
                    type="button"
                    onClick={() => onChange(n)}
                    aria-current={n === page ? 'page' : undefined}
                    className={`${btn} ${n === page ? 'border-emerald-700 bg-emerald-700 text-white' : ''}`}
                >
                    {n}
                </button>
            ))}
            <button type="button" className={btn} disabled={page === totalPages} onClick={() => onChange(page + 1)} aria-label="Trang sau">›</button>
        </nav>
    )
}