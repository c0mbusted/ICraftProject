import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export default (posts = [], action) => {
    switch (action.type) {
        case DELETE:
            //we r filtering post we deleted, we keep all post except the onw where id equals the action.payload
            return posts.filter((post) => post._id !== action.payload);
        case UPDATE:
            //action.payload is updated post so if id equals the updates podst then return action.payload if not just return the post with no update
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        default:
            return posts;
    }

}