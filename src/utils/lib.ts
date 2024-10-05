import dayjs from'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatDate = (date: Date | string, format: string) => {
    return dayjs(date).format(format);
};

export const getCurrentDateString = () => {
    return dayjs().format('YYYY-MM-DDTHH:mm')
};

export const paginate = <T>(items: T[], currentPage: number, totalPages: number) => {
	const startIndex: number = (currentPage - 1) * totalPages;
	return items.slice(startIndex).filter((_, index) => index < totalPages);
};

export const getRelativeTimeFromTimestamp = (timestamp: number) => {
    return dayjs.unix(timestamp).fromNow();
}

export const summarize = (text: string, limit: number = 30) => {
    if (text.length <= limit) return text;

    return text.substring(0, limit) + '...';
};