import dayjs from'dayjs';

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