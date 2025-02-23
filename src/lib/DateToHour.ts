export function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    if (isNaN(date.getTime())) {
        return "Tanggal tidak valid";
    }

    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
        return `${diffDays} hari yang lalu`;
    } else if (diffHours > 0) {
        return `${diffHours} jam yang lalu`;
    } else if (diffMinutes > 0) {
        return `${diffMinutes} menit yang lalu`;
    } else {
        return "Baru saja";
    }
}
