import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import data from '../data/data.json'
import type { Property } from '../types'
import PropertyCard from '../components/PropertyCard'
import { formatCurrency } from '../utils'

const properties: Property[] = data
const linkCls =
    'font-medium text-emerald-700 underline hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300'

export default function DetailPage() {
    const { id } = useParams()
    const item = properties.find(p => p.id === Number(id))

    useEffect(() => {
        document.title = item ? `${item.title} - Nhà Đất Việt` : 'Không tìm thấy - Nhà Đất Việt'
        window.scrollTo(0, 0)
    }, [item])

    if (!item) {
        return (
            <main className="mx-auto max-w-3xl p-4">
                <h1 className="mb-2 text-2xl font-bold">Không tìm thấy bất động sản này</h1>
                <Link className={linkCls} to="/">Quay lại danh sách</Link>
            </main>
        )
    }

    const rows: [string, string][] = [
        ['Loại hình', item.type],
        ['Khu vực', `${item.district}, ${item.city}`],
        ['Diện tích', `${item.area} m²`],
        ...(item.bedrooms > 0 ? [['Phòng ngủ', String(item.bedrooms)] as [string, string]] : []),
        ...(item.bathrooms > 0 ? [['Phòng tắm', String(item.bathrooms)] as [string, string]] : []),
        ['Giá mỗi m²', formatCurrency(Math.round(item.price / item.area))],
        ['Ngày đăng', new Date(item.postedAt).toLocaleDateString('vi-VN')],
    ]

    const related = properties.filter(p => p.type === item.type && p.id !== item.id).slice(0, 3)

    return (
        <main className="mx-auto max-w-6xl p-4">
            <nav aria-label="Đường dẫn" className="mb-4 text-sm">
                <Link className={linkCls} to="/">Trang chủ</Link>
                <span aria-hidden="true"> / </span>
                <span>{item.title}</span>
            </nav>

            <div className="grid gap-6 md:grid-cols-2">
                <img src={item.image} alt={`Hình ảnh ${item.title}`} className="h-72 w-full rounded-xl object-cover md:h-full" />

                <div>
                    <span className="inline-block rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
                        {item.type}
                    </span>
                    <h1 className="mt-2 text-2xl font-bold">{item.title}</h1>
                    <p className="mt-2 text-3xl font-bold text-emerald-700 dark:text-emerald-400">{formatCurrency(item.price)}</p>
                    <p className="mt-4 text-slate-700 dark:text-slate-300">{item.description}</p>

                    <dl className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-800">
                        {rows.map(([label, value]) => (
                            <div key={label} className="flex justify-between gap-4 px-4 py-3">
                                <dt className="text-slate-600 dark:text-slate-300">{label}</dt>
                                <dd className="font-medium">{value}</dd>
                            </div>
                        ))}
                    </dl>

                    <Link to="/" className="mt-6 inline-block rounded-lg bg-emerald-700 px-5 py-2.5 font-medium text-white hover:bg-emerald-800">
                        ← Quay lại danh sách
                    </Link>
                </div>
            </div>

            {related.length > 0 && (
                <section className="mt-12" aria-labelledby="lien-quan">
                    <h2 id="lien-quan" className="mb-4 text-xl font-bold">Có thể bạn quan tâm</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map(p => <PropertyCard key={p.id} item={p} />)}
                    </div>
                </section>
            )}
        </main>
    )
}