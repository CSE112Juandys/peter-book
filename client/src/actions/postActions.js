import ActionTypes from 'constants/actionTypes';
import { database } from 'fireConfigs/fire';
import { encrypt, decrypt, kmsDecrypt } from 'api/crypto';

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

        const postRef = database.ref('posts/' + post.id);

        const authorRef    = database.ref('users/' + authorId + '/posts/').push();
        const recipientRef = database.ref('users/' + recipientId + '/posts/').push();

        const keyRef = database.ref('users/' + authorId + '/datakeys/' + recipientId);

        keyRef.once('value').then((snapshot) => {
            var cipher = snapshot.val();
            kmsDecrypt(sessionStorage.getItem('atok'), cipher);
            var protectedContent = content;
            var protectedMedia = media;

            const realKey = sessionStorage.getItem('plain');
            // null check
            if (content) {
              protectedContent = encrypt(content, realKey);
            }
            if (media) {
              console.log(media);
              protectedMedia = encrypt(media, realKey);
              decrypt(protectedMedia, realKey)
            }

            const dbPost = {    id,
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

            const dbCryptedPost = {     id,
                                        dbAuthor : authorRef.key,
                                        dbRecipient : recipientRef.key,
                                        author : dbAuthor,
                                        recipient : dbRecipient,
                                        content : protectedContent,
                                        media : protectedMedia,
                                        edited,
                                        created,
                                        updated,
                                        comments,
                                        likes
                                  }

            authorRef.set( dbCryptedPost )
            .then(() => {
                console.log('AUTHOR POST ADD SUCCESS');
                dispatch(addPost(dbPost));
            })
            .catch((error) => {
                console.log('AUTHOR POST ADD FAIL');
                console.log(error);
            })

            recipientRef.set( dbCryptedPost )
            .then(() => {
                console.log('RECIPIENT POST ADD SUCCESS');
            })
            .catch((error) => {
                console.log('RECIPIENT POST ADD FAIL');
                console.log(error);
            })
        }).catch((error) => {
            console.log(error);
        });
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
        const { dbAuthor, dbRecipient, author, recipient, comments } = post
        post.author.friends = null;
        post.author.posts = null;

        post.recipient.friends = null;
        post.recipient.posts = null;

        console.log(comments);
        
        const authorRef    = database.ref('users/' + author.id + '/posts/' + dbAuthor);
        const recipientRef = database.ref('users/' + recipient.id + '/posts/' + dbRecipient);
        const keyRef = database.ref('users/' + author.id + '/datakeys/' + recipient.id);

        authorRef.once('value').then((snapshot) => {
          var changed = snapshot.val();
          keyRef.once('value').then((snapshot) => {
              var cipher = snapshot.val();
              kmsDecrypt(sessionStorage.getItem('atok'), cipher);

              const realKey = sessionStorage.getItem('plain');

              for (var k in comments) {
                if (comments.hasOwnProperty(k)) {
                  if (!changed.hasOwnProperty('comments')) {
                    changed.comments = comments;
                    changed.comments[k].content = encrypt(comments[k].content, realKey);
                  }
                  else if (!changed.comments.hasOwnProperty(k)) {
                    changed.comments[k] = comments[k];
                    changed.comments[k].content = encrypt(comments[k].content, realKey);
                  }
                }
              }

              authorRef.set(changed)
              .then(() => {
                  console.log('AUTHOR POST UPDATE SUCCESS');
              })
              .catch((error) => {
                  console.log('AUTHOR POST UPDATE FAIL');
                  console.log(error);
              })

              recipientRef.set(changed)
              .then(() => {
                  console.log('RECIPIENT POST UPDATE SUCCESS');
                  dispatch(updatePost(post))
              })
              .catch((error) => {
                  console.log('RECIPIENT POST UPDATE FAIL');
                  console.log(error);
              })

          })
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
            console.log(postsDecrypt);
            postsDecrypt.map((post) => {
                const keyRef = database.ref('users/' + post.author.id + '/datakeys/' + post.recipient.id);
                if (!post.comments) {
                    post.comments = [];
                }

                keyRef.once('value').then((snapshot) => {
                    var cipher = snapshot.val();
                    kmsDecrypt(sessionStorage.getItem('atok'), cipher);

                    const realKey = sessionStorage.getItem('plain');
                    if (post.content) {
                        post.content = decrypt(post.content, realKey);
                    }
                    if (post.comments) {
                    for (var k in post.comments) {
                        if (post.comments.hasOwnProperty(k)) {
                          post.comments[k].content = decrypt(post.comments[k].content, realKey);
                        }
                      }
                    }
                    if (post.media) {
                      post.media = decrypt(post.media, realKey);
                      console.log(post.media);
                    }
                }).catch((error) => {
                    console.log(error);
                });
                return post;
            })
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
