import { Link, useParams } from 'react-router-dom'
import data from '../data/data.json'
import type { Property } from '../types'

const properties: Property[] = data

export default function DetailPage() {
    const { id } = useParams()
    const item = properties.find(p => p.id === Number(id))

    if (!item) {
        return (
            <main className="mx-auto max-w-3xl p-4">
                <p>Không tìm thấy bất động sản này.</p>
                <Link className="text-emerald-700 underline" to="/">Quay lại danh sách</Link>
            </main>
        )
    }

    return (
        <main className="mx-auto max-w-3xl p-4">
            <Link className="text-emerald-700 hover:underline" to="/">← Quay lại danh sách</Link>
            <h1 className="mt-4 text-2xl font-bold">{item.title}</h1>
            <img className="my-4 w-full rounded-lg" src={item.image} alt={item.title} />
            <p>{item.description}</p>
        </main>
    )
}