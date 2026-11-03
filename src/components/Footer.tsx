import { Link } from 'react-router-dom'

const linkCls = 'hover:underline text-slate-700 dark:text-slate-200'

export default function Footer() {
    return (
        <footer className="mt-12 border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
            <div className="mx-auto grid max-w-6xl gap-6 p-6 sm:grid-cols-3">
                <div>
                    <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">Nhà Đất Việt</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Tìm kiếm căn hộ, nhà phố, biệt thự và đất nền trên toàn quốc.
                    </p>
                </div>

                <nav aria-label="Liên kết nhanh">
                    <p className="font-semibold">Liên kết nhanh</p>
                    <ul className="mt-2 space-y-1 text-sm">
                        <li><Link className={linkCls} to="/">Trang chủ</Link></li>
                        <li><Link className={linkCls} to="/gioi-thieu">Giới thiệu</Link></li>
                        <li><Link className={linkCls} to="/lien-he">Liên hệ</Link></li>
                    </ul>
                </nav>

                <div>
                    <p className="font-semibold">Liên hệ</p>
                    <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                        <li>Hotline: 0900 000 000</li>
                        <li>Email: lienhe@nhadatviet.example</li>
                        <li>Thủ Đức, TP. Hồ Chí Minh</li>
                    </ul>
                </div>
            </div>
            <p className="border-t border-slate-200 py-4 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
                © 2026 Nhà Đất Việt. Dữ liệu mẫu phục vụ bài thực hành.
            </p>
        </footer>
    )
}