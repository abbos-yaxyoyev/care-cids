import moment from "moment"

export const getDaysRange = (date) => {
    return {
        start: moment(date).startOf('day').toDate(),
        end: moment(date).endOf('day').toDate()
    }
}