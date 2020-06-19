class Formatter {
    formatDate = (date) => {
        if (date) {
            return new Date(date).getUTCDate();
        }
        return null;
    }

    formatValue = (value) => {
        if (value) {
            return value.toFixed(2).replace('.', ',');
        }
        return null;
    }
}

export default new Formatter();