import { Link } from 'react-router-dom'
import data from '../data/data.json'
import type { Property } from '../types'

const properties: Property[] = data

export default function ListPage() {
    return (
        <main className="mx-auto max-w-6xl p-4">
            <h1 className="mb-4 text-2xl font-bold text-emerald-600">Bất động sản ({properties.length})</h1>
            <ul className="space-y-2">
                {properties.map(p => (
                    <li key={p.id}>
                        <Link className="text-emerald-700 hover:underline" to={`/item/${p.id}`}>{p.title}</Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}