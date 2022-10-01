import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, UPDATE, COMMENT, DELETE } from '../constants/actionTypes';

export default (state = { isLoading:true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true};
        case END_LOADING:
            return { ...state, isLoading: false};
        case DELETE:
            //we r filtering post we deleted, we keep all post except the onw where id equals the action.payload
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload)};
        case UPDATE:
            //action.payload is updated post so if id equals the updates podst then return action.payload if not just return the post with no update
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};
        case COMMENT:
            return {
                ...state, posts: state.posts.map((post) => {
                    //change post that received comment
                    if(post._id === action.payload._id) {
                        return action.payload;
                    }
                    //return all the posts normally
                    return post;
                }),
            };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_POST:
            return { ...state, post: action.payload};
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload};
        case CREATE:
            return { ...state, posts: [...state, action.payload]};
        default:
            return state;
    }

};