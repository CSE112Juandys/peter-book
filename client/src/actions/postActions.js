import ActionTypes from 'constants/actionTypes';
import { database } from 'fireConfigs/fire';

export function dbAddPost(post) {
    console.log('yun');
    return dispatch => {
        const { id, author, recipient, content, media, edited, created, updated, comments, likes } = post;

        const dbAuthor = {  id          : author.id,
                            firstName   : author.firstName,
                            lastName    : author.lastName,
                         }

        if (author.profileImg) {
            dbAuthor.profileImg = author.profileImg
        }
        
        const dbRecipient = {   id          : recipient.id,
                                firstName   : recipient.firstName,
                                lastName    : recipient.lastName,
                            }

        if (recipient.profileImg) {
            dbRecipient.profileImg = recipient.profileImg
        }

        const authorId    = author.id;
        const recipientId = recipient.id;
        
        const authorRef    = database.ref('users/' + authorId + '/posts/').push();
        const recipientRef = database.ref('users/' + recipientId + '/posts/').push();

        const dbPost = {    id : authorRef.key + recipientRef.key, 
                            dbAuthor : authorRef.key,
                            dbRecipient : recipientRef.key,
                            author : dbAuthor, 
                            recipient : dbRecipient, 
                            content,
                            media, 
                            edited,
                            created,
                            updated,
                            comments,
                            likes
                        }

        authorRef.set( dbPost )
        .then(() => {
            console.log('AUTHOR POST ADD SUCCESS');
            dispatch(addPost(dbPost));
        })
        .catch((error) => {
            console.log('AUTHOR POST ADD FAIL');
            console.log(error);
        })

        recipientRef.set( dbPost )
        .then(() => {
            console.log('RECIPIENT POST ADD SUCCESS');
        })
        .catch((error) => {
            console.log('RECIPIENT POST ADD FAIL');
            console.log(error);
        })

    }
}

export function dbDeletePost(post) {
    return dispatch => {
        const { dbAuthor, dbRecipient, author, recipient } = post
        
        const authorRef    = database.ref('users/' + author.id + '/posts/' + dbAuthor);
        const recipientRef = database.ref('users/' + recipient.id + '/posts/' + dbRecipient);

        // Update author's list of post ids
        authorRef.remove()
        .then(() => {
            console.log('AUTHOR POST REMOVE SUCCESS');
        })
        .catch((error) => {
            console.log('AUTHOR POST REMOVE FAIL');
            console.log(error);
        })

        // Update author's list of post ids
        recipientRef.remove()
        .then(() => {
            console.log('RECIPIENT POST REMOVE SUCCESS');
            dispatch(deletePost(post));
        })
        .catch((error) => {
            console.log('RECIPIENT POST REMOVE FAIL');
            console.log(error);
        })
    }
}

export function dbUpdatePost(post) {
    return dispatch => {
        const { dbAuthor, dbRecipient, author, recipient } = post
        post.author.friends = null;
        post.author.posts = null;

        post.recipient.friends = null;
        post.recipient.posts = null;
        
        const authorRef    = database.ref('users/' + author.id + '/posts/' + dbAuthor);
        const recipientRef = database.ref('users/' + recipient.id + '/posts/' + dbRecipient);

        authorRef.set(post)
        .then(() => {
            console.log('AUTHOR POST UPDATE SUCCESS');
        })
        .catch((error) => {
            console.log('AUTHOR POST UPDATE FAIL');
            console.log(error);
        })

        recipientRef.set(post)
        .then(() => {
            console.log('RECIPIENT POST UPDATE SUCCESS');
            dispatch(updatePost(post))
        })
        .catch((error) => {
            console.log('RECIPIENT POST UPDATE FAIL');
            console.log(error);
        })
    }
}

export function dbReadAllPosts(forUser) {
    return dispatch => {
        const userRef = database.ref('users/' + forUser.id + '/posts/');
        userRef.once('value')
        .then((snapshot) => {
            //DECRYPT HERE
            const postsDecrypt = Object.values(snapshot.val());
            postsDecrypt.map((post) => {
                if (!post.comments) {
                    post.comments = [];
                }
                return post;
            })
            //
            dispatch(readAllPosts(postsDecrypt.reverse()));
        })
        .catch((error) => {
            
        })
    }
}

function addPost(post) {
    return {
        type: ActionTypes.ADD_POST,
        post
    }
}

function deletePost(post) {
    return {
        type: ActionTypes.DELETE_POST,
        post
    }
}

function updatePost(post) {
    return {
        type : ActionTypes.UPDATE_POST,
        post
    };
}

export function readAllPosts(posts) {
    return {
        type : ActionTypes.READ_ALL_POSTS,
        posts,
    }
}