import { userConstants } from '../constants/userConstants';
const initialState = {
    currentUser : null,
    user_id: '',
    userinfo:[{
        first_name:'Arshii',
        last_name:'Sethi',
        gender:'F',
        email:'arshii@gmail.com',
        address:'abc',
        city:'San Jose',
        state:'California',
        zip:'95112'
    }],
};
export function users(state = initialState, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case 'LOGIN_SUCCESS':
            return {
                items: action.user
            };
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case userConstants.USER_DETAILS:
            return{
                ...state,
                userdetails:action.user
            };
        case 'SET_USER':
            console.log(action);
            return{
                ...state,
                //currentUser:action.user_id,
                user_id:action
            };
        default:
            return state
    }
}