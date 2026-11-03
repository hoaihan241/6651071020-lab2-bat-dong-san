import { Link } from 'react-router-dom'
import type { Property } from '../types'
import { formatCurrency, truncateText } from '../utils'

export default function PropertyCard({ item }: { item: Property }) {
    return (
        <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
            <Link to={`/item/${item.id}`} className="block">
                <img src={item.image} alt={item.title} loading="lazy" className="h-44 w-full object-cover" />
                <div className="space-y-2 p-4">
                    <span className="inline-block rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
                        {item.type}
                    </span>
                    <h2 className="font-semibold leading-snug">{truncateText(item.title, 50)}</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        {item.district}, {item.city}
                    </p>
                    <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{formatCurrency(item.price)}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        {item.area} m²{item.bedrooms > 0 && ` · ${item.bedrooms} PN`}
                    </p>
                </div>
            </Link>
        </article>
    )
}