import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import data from '../data/data.json'
import type { Property } from '../types'
import PropertyCard from '../components/PropertyCard'
import Pagination from '../components/Pagination'
import { debounce } from '../utils'

const properties: Property[] = data
const PAGE_SIZE = 6
const TY = 1_000_000_000

const PRICE_RANGES = [
    { label: 'Mọi mức giá', min: 0, max: Infinity },
    { label: 'Dưới 3 tỷ', min: 0, max: 3 * TY },
    { label: '3 – 7 tỷ', min: 3 * TY, max: 7 * TY },
    { label: '7 – 15 tỷ', min: 7 * TY, max: 15 * TY },
    { label: 'Trên 15 tỷ', min: 15 * TY, max: Infinity },
]
const types = [...new Set(properties.map(p => p.type))]
const cities = [...new Set(properties.map(p => p.city))]

// Bỏ dấu để gõ "can ho" vẫn tìm ra "Căn hộ"
const normalize = (s: string) =>
    s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').toLowerCase()

const inputCls =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-800'

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <label className="block text-sm font-medium">
            <span className="mb-1 block">{label}</span>
            {children}
        </label>
    )
}

export default function ListPage() {
    const [keyword, setKeyword] = useState('') // hiện ngay trong ô nhập
    const [search, setSearch] = useState('')   // dùng để lọc, trễ 300ms
    const [type, setType] = useState('')
    const [city, setCity] = useState('')
    const [priceIdx, setPriceIdx] = useState(0)
    const [minBeds, setMinBeds] = useState(0)
    const [sort, setSort] = useState('moi')
    const [page, setPage] = useState(1)

    const applySearch = useMemo(
        () => debounce((value: string) => { setSearch(value); setPage(1) }, 300),
        [],
    )

    const filtered = useMemo(() => {
        const q = normalize(search.trim())
        const range = PRICE_RANGES[priceIdx]
        const result = properties.filter(p =>
            (!q || normalize(`${p.title} ${p.district} ${p.city}`).includes(q)) &&
            (!type || p.type === type) &&
            (!city || p.city === city) &&
            p.price >= range.min && p.price < range.max &&
            p.bedrooms >= minBeds,
        )
        if (sort === 'gia-tang') result.sort((a, b) => a.price - b.price)
        else if (sort === 'gia-giam') result.sort((a, b) => b.price - a.price)
        else if (sort === 'dt-giam') result.sort((a, b) => b.area - a.area)
        else result.sort((a, b) => b.postedAt.localeCompare(a.postedAt))
        return result
    }, [search, type, city, priceIdx, minBeds, sort])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const currentPage = Math.min(page, totalPages)
    const items = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

    const resetAll = () => {
        setKeyword(''); setSearch(''); setType(''); setCity('')
        setPriceIdx(0); setMinBeds(0); setSort('moi'); setPage(1)
    }

    return (
        <main className="mx-auto max-w-6xl p-4">
            <h1 className="mb-4 text-2xl font-bold">Bất động sản</h1>

            <section aria-label="Tìm kiếm và bộ lọc" className="mb-6 space-y-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                <Field label="Tìm kiếm">
                    <input
                        type="search"
                        className={inputCls}
                        placeholder="Tên dự án, quận, thành phố..."
                        value={keyword}
                        onChange={e => { setKeyword(e.target.value); applySearch(e.target.value) }}
                    />
                </Field>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <Field label="Loại hình">
                        <select className={inputCls} value={type} onChange={e => { setType(e.target.value); setPage(1) }}>
                            <option value="">Tất cả</option>
                            {types.map(t => <option key={t}>{t}</option>)}
                        </select>
                    </Field>
                    <Field label="Thành phố">
                        <select className={inputCls} value={city} onChange={e => { setCity(e.target.value); setPage(1) }}>
                            <option value="">Tất cả</option>
                            {cities.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </Field>
                    <Field label="Khoảng giá">
                        <select className={inputCls} value={priceIdx} onChange={e => { setPriceIdx(Number(e.target.value)); setPage(1) }}>
                            {PRICE_RANGES.map((r, i) => <option key={r.label} value={i}>{r.label}</option>)}
                        </select>
                    </Field>
                    <Field label="Số phòng ngủ tối thiểu">
                        <select className={inputCls} value={minBeds} onChange={e => { setMinBeds(Number(e.target.value)); setPage(1) }}>
                            <option value={0}>Bất kỳ</option>
                            {[1, 2, 3, 4].map(n => <option key={n} value={n}>Từ {n} phòng</option>)}
                        </select>
                    </Field>
                    <Field label="Sắp xếp">
                        <select className={inputCls} value={sort} onChange={e => { setSort(e.target.value); setPage(1) }}>
                            <option value="moi">Mới đăng nhất</option>
                            <option value="gia-tang">Giá tăng dần</option>
                            <option value="gia-giam">Giá giảm dần</option>
                            <option value="dt-giam">Diện tích lớn nhất</option>
                        </select>
                    </Field>
                    <div className="flex items-end">
                        <button type="button" onClick={resetAll} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-medium dark:border-slate-600">
                            Xóa bộ lọc
                        </button>
                    </div>
                </div>
            </section>

            <p className="mb-3 text-sm" role="status">Tìm thấy {filtered.length} bất động sản</p>

            {items.length === 0 ? (
                <p className="py-12 text-center">Không có kết quả phù hợp. Hãy thử bỏ bớt bộ lọc.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map(p => <PropertyCard key={p.id} item={p} />)}
                </div>
            )}

            <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
        </main>
    )
}