export default function dartReducer(state = {}, action) {
    console.log(action.type);
    switch (action.type) {
        case 'ADD_DART_BEGIN':
            console.log('ADD_DART_BEGIN')
            return {
                ...state,
                loading: true
            };
        case 'ADD_DART_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
            };
        case 'ADD_DART_FAILURE':
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}