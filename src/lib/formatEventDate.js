/**
 * Formats a date string into VietNam format
 * @param {string} isoString - The ISO date string to format
 * @param {('full'|'short'|'time')} [format='full'] - The format type to use
 * @returns {string} The formatted date string in VietNam
 * 
 * @example
 * // returns "Senin, 1 Januari 2024"
 * formatEventDate("2024-01-01T00:00:00.000Z", "full")
 * 
 * // returns "1 Januari 2024"
 * formatEventDate("2024-01-01T00:00:00.000Z", "short")
 * 
 * // returns "00:00"
 * formatEventDate("2024-01-01T00:00:00.000Z", "time")
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

    // VietNam month names mapping
    const monthsVietNam = {
        'January': 'Tháng 1',
        'February': 'Tháng 2',
        'March': 'Tháng 3',
        'April': 'Tháng 4',
        'May': 'Tháng 5',
        'June': 'Tháng 6',
        'July': 'Tháng 7',
        'August': 'Tháng 8',
        'September': 'Tháng 9',
        'October': 'Tháng 10',
        'November': 'Tháng 11',
        'December': 'Tháng 12'
    };

    // VietNam day names mapping
    const daysVietNam = {
        'Sunday': 'Chủ nhật',
        'Monday': 'Thứ 2',
        'Tuesday': 'Thứ 3',
        'Wednesday': 'Thứ 4',
        'Thursday': 'Thứ 5',
        'Friday': 'Thứ 6',
        'Saturday': 'Thứ 7'
    };

    let formatted = date.toLocaleDateString('vi-VN', formats[format]);

    // Handle time format separately
    if (format === 'time') {
        return date.toLocaleTimeString('vi-VN', formats[format]);
    }

    // Replace English month and day names with VietNam ones
    Object.keys(monthsVietNam).forEach(english => {
        formatted = formatted.replace(english, monthsVietNam[english]);
    });

    Object.keys(daysVietNam).forEach(english => {
        formatted = formatted.replace(english, daysVietNam[english]);
    });

    // Format adjustment for full date
    if (format === 'full') {
        // Convert "Hari, Tanggal Bulan Tahun" format
        const parts = formatted.split(', ');
        if (parts.length === 2) {
            formatted = `${parts[0]}, ${parts[1]}`;
        }
    }

    return formatted;
};
