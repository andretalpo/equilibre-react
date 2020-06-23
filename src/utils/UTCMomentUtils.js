import MomentUtils from '@date-io/moment';
import moment from 'moment';

class UTCMomentUtils extends MomentUtils {
    format(value, formatString) {
        return moment(value)
            .format(formatString);
    }
}

export default UTCMomentUtils;