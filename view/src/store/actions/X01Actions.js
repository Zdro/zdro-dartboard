export function addDart(dart) {
    return (dispatch, getState, getFirebase) => {
        dispatch(addDartBegin());
        return fetch('http://google.fr')
    }
}

export const addTodo = content => ({
    type: 'ADD_TODO',
    payload: {
        id: 50,
        content
    }
})


function userLoggedIn() {
    return {
        type: 'USER_LOGGED_IN',
        username: 'dave'
    };
}

export const addDartBegin = () => ({
    type: 'ADD_DART_BEGIN'
});

export const addDartSuccess = dart => ({
    type: 'ADD_DART_SUCCESS',
    payload: { dart }
});

export const addDartFailure = error => ({
    type: 'ADD_DART_FAILURE',
    payload: { error }
});