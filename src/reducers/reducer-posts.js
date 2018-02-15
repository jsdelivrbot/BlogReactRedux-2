import {FETCH_POSTS, FETCH_POST, DELETE_POST} from '../actions'
import _ from 'lodash'



export default function(state = {}, action) {
    switch(action.type) {
        case DELETE_POST:
        //if the state object has the key of the deleted object, just drop it
            return _.omit(state, actio.payload)
        case FETCH_POSTS:
        //convert array to object with id
            return _.mapKeys(action.payload.data, 'id')
        case FETCH_POST:
            //const post = action.payload.data ES5
            //const newState = {...state}
            //newState[post.id] = post
            //return newState
            return {...state, [action.payload.data.id] : action.payload.data} //ES6
        default:
        return state
    }
}

