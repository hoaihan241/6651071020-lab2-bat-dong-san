import { useEffect } from 'react'

const rows: [string, string][] = [
    ['Hotline', '0900 000 000'],
    ['Email', 'lienhe@nhadatviet.example'],
    ['Địa chỉ', 'Thủ Đức, TP. Hồ Chí Minh'],
    ['Giờ làm việc', '8:00 – 17:30, thứ Hai đến thứ Bảy'],
]

export default function ContactPage() {
    useEffect(() => {
        document.title = 'Liên hệ - Nhà Đất Việt'
        window.scrollTo(0, 0)
    }, [])

    return (
        <main className="mx-auto max-w-3xl p-4">
            <h1 className="mb-4 text-2xl font-bold">Liên hệ</h1>
            <dl className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-800">
                {rows.map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 px-4 py-3">
                        <dt className="text-slate-600 dark:text-slate-300">{label}</dt>
                        <dd className="font-medium">{value}</dd>
                    </div>
                ))}
            </dl>
        </main>
    )
}