/**
 * Định dạng ngày giờ theo chuẩn tiếng Việt
 * @param {string} isoString - ISO date string
 * @param {'full' | 'short' | 'time'} [format='full']
 * @returns {string} - Chuỗi đã định dạng
 */
export const formatEventDate = (isoString, format = 'full') => {
    const date = new Date(isoString);

    const formats = {
        full: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Ho_Chi_Minh'
        },
        short: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Ho_Chi_Minh'
        },
        time: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Ho_Chi_Minh'
        }
    };

    if (format === 'time') {
        return date.toLocaleTimeString('vi-VN', formats[format]);
    }

    return date.toLocaleDateString('vi-VN', formats[format]);
};
