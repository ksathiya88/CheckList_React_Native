import { RADIO_SET } from '../constant';

export const radioSet = value => {
    console.log('inside radio Set action', value);
    return {
        type: RADIO_SET,
        payload: value,
    };
};
