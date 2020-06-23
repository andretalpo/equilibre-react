import moment from 'moment';

class Formatter {
    getDay = (date) => {
        if (date) {
            return moment(date).utc().format('DD');
        }
        return null;
    }

    getMonthYear = (date) => {
        if (date) {
            return '\n' + moment(date).utc().format('MMM/YY');
        }
        return null;
    }

    formatValue = (value) => {
        if (value) {
            return value.toFixed(2).replace('.', ',');
        }
        return '';
    }
}

export default new Formatter();