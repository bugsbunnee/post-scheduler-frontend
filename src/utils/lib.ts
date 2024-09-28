import dayjs from'dayjs';

export const formatDate = (date: Date | string, format: string) => {
    return dayjs(date).format(format);
};

export const getCurrentDateString = () => {
    return dayjs().format('YYYY-MM-DDTHH:mm')
}