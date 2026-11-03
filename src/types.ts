export interface Property {
    id: number
    title: string
    type: string        // Căn hộ | Nhà phố | Biệt thự | Đất nền
    city: string
    district: string
    price: number       // VND
    area: number        // m²
    bedrooms: number
    bathrooms: number
    image: string
    description: string
    postedAt: string    // ISO date
}