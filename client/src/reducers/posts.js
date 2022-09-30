import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export default (state = [], action) => {
    switch (action.type) {
        case DELETE:
            //we r filtering post we deleted, we keep all post except the onw where id equals the action.payload
            return state.filter((post) => post._id !== action.payload);
        case UPDATE:
            //action.payload is updated post so if id equals the updates podst then return action.payload if not just return the post with no update
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload};
        case CREATE:
            return [...state, action.payload];
        default:
            return state;
    }

};