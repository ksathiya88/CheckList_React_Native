import { RADIO_SET } from '../constant';

const INITIAL_STATE = { selectedOption: 'USE' };

export default (state = INITIAL_STATE, action) => {
    console.log('radio Reducer', state, action);
    switch (action.type) {
        case RADIO_SET:
            return { selectedOption: action.payload };
        default:
            return state;
    }
};
