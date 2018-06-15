import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
// import PerfectScrollbar from "perfect-scrollbar";
// import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles } from '@material-ui/core';
import cx from 'classnames';
import WallView from 'views/WallView';
import { Sidebar } from 'components';
import appStyle from 'assets/jss/cl-components/appStyle';

import { connect } from 'react-redux';
import { updateFirebaseStore } from 'actions/updateFirebaseStoreActions';
import { dbDeleteFriend, dbAddFriend, dbReadAllFriends} from 'actions/friendActions';
import { dbAddPost, dbDeletePost, dbUpdatePost, dbReadAllPosts } from 'actions/postActions';
import { dbUpdateUser } from 'actions/userActions';
import { dbSignUpUser, dbLogInUser, dbLogOutUser } from 'actions/authActions';
import Auth from 'layouts/Auth';
import FriendDialogue from '../components/Dialogue/FriendDialogue';
import { decrypt } from 'api/crypto';


/*
 *  App Class Component
 */
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {  open            : true,
                        openFriendModal : false,
                        user            : null,
                        friends         : [],
                        posts           : [],
                        auth            : false };
    }

    componentWillReceiveProps(newProps) {
        console.log("NEW PROPS RECEIVED")
        const { friends, posts, user, auth } = newProps;
        const newUser = user;
        newUser.friends = friends;
        if (auth && !this.state.auth) {
            this.props.onGetFriends(user.id);
            this.props.onGetPosts(user);
        }

        this.setState({user: newUser, auth, posts});
        if (!auth && this.state.auth) {
            this.setState ({
                  open            : true,
                    openFriendModal : false,
                    user            : null,
                    friends         : [],
                    posts           : [],
                    auth            : false });
            }
    }

    handleFriendModalOpen = () => {
        this.setState({ openFriendModal : true });
    }

    handleFriendModalClose = () => {
        this.setState({ openFriendModal : false });
    }

    handleDrawerToggle = () => {
        this.setState({ open : !this.state.open });
    }

    handleChangeWall = () => {
        this.refs.mainPanel.scrollTop = 0;
    }

    componentDidMount() {
        // scrollbar
        // if(navigator.platform.indexOf('Win') > -1){
        //     // eslint-disable-next-line
        //     const ps = new PerfectScrollbar(this.refs.mainPanel);
        // }

        // this.props.onGetFriends(this.state.user.id);
        // this.props.onGetPosts(this.state.user);
        // push dummy user objects to firebase
        //this.props.onUpdateFirebaseStore(generateUsers());
    }

    render() {
        console.log(this.props);
        console.log(this.state);
        const { user, posts } = this.state;

        if (this.props.auth) {
            const userRoutes = [{   owner       : user,
                                    util        : true,
                                    path        : '/profile',
                                    sidebarName : 'User Profile',
                                    navbarName  : 'User Profile',
                                    icon        : `${user.firstName[0]}${user.lastName[0]}`,
                                    component   : WallView    }];

            const friendRoutes = this.props.friends.map((friend, key) => {
                return {
                    owner       : friend,
                    util        : false,
                    path        : `/${friend.firstName}${friend.lastName}`,
                    sidebarName : `${friend.firstName} ${friend.lastName}`,
                    navbarName  : `${friend.firstName} ${friend.lastName}`,
                    icon        : `${friend.firstName[0]}${friend.lastName[0]}`,
                    component   : WallView
                };
            });

            friendRoutes.push({ redirect: true,
                                path: "/",
                                to: "/profile",
                                navbarName: "Redirect" });

            const switchRoutes = (
                <Switch>
                    {userRoutes.concat(friendRoutes).map((prop, key) => {
                        if (prop.redirect) {
                            return <Redirect from={prop.path}
                                            to={prop.to}
                                            key={key} />;
                        }
                        else if (prop.util) {
                            return <Route path={prop.path}
                                        render={() => <WallView posts={posts}
                                                                owner={user}
                                                                user={user}
                                                                addFriend={this.props.onAddFriend}
                                                                removeFriend={this.props.onRemoveFriend}
                                                                addPost={this.props.onAddPost}
                                                                removePost={this.props.onRemovePost}
                                                                updatePost={this.props.onUpdatePost}
                                                                updateUser={this.props.onUpdateUser}/>}
                                        key={key}/>
                        }
                        const friendPosts = posts.filter((post) => {
                            return ((prop.owner.firstName === post.author.firstName &&
                                    prop.owner.lastName === post.author.lastName) ||
                                    (prop.owner.firstName === post.recipient.firstName &&
                                    prop.owner.lastName === post.recipient.lastName));
                        });
                        return <Route path={prop.path}
                                    render={() => <WallView posts={friendPosts}
                                                            owner={prop.owner}
                                                            user={user}
                                                            addFriend={this.props.onAddFriend}
                                                            removeFriend={this.props.onRemoveFriend}
                                                            addPost={this.props.onAddPost}
                                                            removePost={this.props.onRemovePost}
                                                            updatePost={this.props.onUpdatePost}
                                                            updateUser={this.props.onUpdateUser}/>}
                                    key={key}/>
                    })}
                </Switch>
            )

            const { classes, ...rest } = this.props;

            return (
                <div className={classes.wrapper}>
                    <Sidebar open={this.state.open}
                            logo={'cl-components'}
                            friendRoutes={friendRoutes}
                            utilRoutes={userRoutes}
                            user={user}
                            handleChangeWall={this.handleChangeWall}
                            handleDrawerToggle={this.handleDrawerToggle}
                            handleModalOpen={this.handleFriendModalOpen}
                            handleLogOut={this.props.onLogOut}
                            {...rest}/>
                    <div className={cx(classes.mainPanel, this.state.open && classes.mainPanelShift)} ref="mainPanel">
                        <div className={classes.content}>
                            <div className={classes.container}>
                                {switchRoutes}
                            </div>
                        </div>
                    </div>
                    <FriendDialogue open={this.state.openFriendModal}
                                    handleClose={this.handleFriendModalClose}
                                    user={user}
                                    addFriend={this.props.onAddFriend}/>
                </div>
            );
        }
        return (
            <Auth signUp={this.props.onSignUp} logIn={this.props.onLogIn}/>
        )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const { user, friends, posts, auth } = state;
    return {
        user,
        friends,
        posts,
        auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onUpdateFirebaseStore : (dataToAdd) => dispatch(updateFirebaseStore(dataToAdd)),
        //FRIENDS--------------------------------------------------------------
        onGetFriends    : (userId) => dispatch(dbReadAllFriends(userId)),
        onAddFriend     : (friendIdA, friendIdB) => dispatch(dbAddFriend(friendIdA, friendIdB)),
        onRemoveFriend  : (friendA, friendB) => dispatch(dbDeleteFriend(friendA, friendB)),
        //USER-----------------------------------------------------------------
        onUpdateUser : (newUser) => dispatch(dbUpdateUser(newUser)),
        //POSTS----------------------------------------------------------------
        onAddPost     : (post) => dispatch(dbAddPost(post)),
        onRemovePost  : (post) => dispatch(dbDeletePost(post)),
        onUpdatePost  : (post) => dispatch(dbUpdatePost(post)),
        onGetPosts    : (user) => dispatch(dbReadAllPosts(user)),
        //AUTH-----------------------------------------------------------------
        onSignUp    : (userToSignUp) => dispatch(dbSignUpUser(userToSignUp)),
        onLogIn     : (userToLogIn) => dispatch(dbLogInUser(userToLogIn)),
        onLogOut    : () => dispatch(dbLogOutUser())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(App));
