import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Posts} from './posts';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Auth} from './auth';
import {Likes} from './like';
import {Comments} from './comment';
import {Profile} from './profile';
import {User} from './user';
import {OUser} from './ouser';
import {Upload} from './upload';
import {FollowingPosts} from './followingposts';
import {Delete} from './delete';
import {SearchUser} from './search';

import { createForms } from 'react-redux-form';
export const ConfigureStore=()=>{
    const store=createStore(
        combineReducers({
            posts:Posts,
            auth:Auth,
            likes:Likes,
            comments:Comments,
            profile:Profile,
            user:User,
            ouser:OUser,
            upload:Upload,
            followingposts:FollowingPosts,
            delete:Delete,
            search:SearchUser,
          

        }),
        applyMiddleware(thunk,logger)
    );
    return store;
}