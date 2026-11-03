// Định dạng tiền, mặc định VND: 150000 -> "150.000 ₫"
export function formatCurrency(amount: number, currency: string = 'VND'): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(amount);
}

// Cắt chuỗi dài hơn maxLength và thêm "..."
export function truncateText(text: string, maxLength: number): string {
    return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
}

// Email hợp lệ: có phần trước @, tên miền và đuôi (abc@com là sai)
export function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Gọi hàm 1 lần sau khi người dùng ngừng thao tác `delay` ms
export function debounce<T extends (...args: never[]) => void>(fn: T, delay: number): T {
    let timer: ReturnType<typeof setTimeout> | undefined;
    return ((...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    }) as unknown as T;
}