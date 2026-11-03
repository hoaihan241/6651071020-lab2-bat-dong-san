import { useEffect } from 'react'

export default function AboutPage() {
    useEffect(() => {
        document.title = 'Giới thiệu - Nhà Đất Việt'
        window.scrollTo(0, 0)
    }, [])

    return (
        <main className="mx-auto max-w-3xl p-4">
            <h1 className="mb-4 text-2xl font-bold">Giới thiệu</h1>
            <p className="mb-4 leading-relaxed">
                Nhà Đất Việt là website mẫu giúp tìm kiếm bất động sản gồm căn hộ, nhà phố, biệt thự và đất nền
                tại nhiều tỉnh thành. Dữ liệu trong trang là dữ liệu mẫu phục vụ bài thực hành.
            </p>
            <h2 className="mb-2 mt-6 text-xl font-bold">Tính năng chính</h2>
            <ul className="list-disc space-y-1 pl-6">
                <li>Tìm kiếm theo từ khóa (gõ không dấu vẫn tìm được) và lọc theo loại hình, thành phố, giá, số phòng ngủ.</li>
                <li>Phân trang danh sách kết quả.</li>
                <li>Giao diện sáng/tối, ghi nhớ lựa chọn của người dùng.</li>
            </ul>
        </main>
    )
}