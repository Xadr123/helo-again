const initialState = {
    user_id: 0,
    username: '',
    profile_pic: ''
}

const GET_USER = 'GET_USER'

export function getUser(userObj) {
    return {
        type: GET_USER,
        payload: userObj
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}