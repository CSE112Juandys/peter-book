import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { Edit } from '@material-ui/icons';
import { withStyles, Button } from '@material-ui/core';
import cx from 'classnames';
import WallView from 'views/WallView';
import { Sidebar, Header } from 'components';
import { userRoutes, user } from 'routes/friends';
import { generateUsers, generateFriends, generatePosts } from 'api/mockAPI';
import appStyle from 'assets/jss/cl-components/appStyle';
import FriendModal from 'components/Modal/FriendModal';

import { connect } from 'react-redux';
import { updateFirebaseStore } from 'actions/updateFirebaseStoreActions';
import { dbDeleteFriend, dbAddFriend } from 'actions/friendActions';
import FriendDialogue from '../components/Dialogue/FriendDialogue';

const posts = generatePosts(user, 50);
//const posts = [];



/*
 *  App Class Component
 */
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {  open           : true,
                        openFriendModal : false,
                        friends        : null };
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        const { friends } = newProps;
        this.setState({ friends });
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
        if(navigator.platform.indexOf('Win') > -1){
            // eslint-disable-next-line
            const ps = new PerfectScrollbar(this.refs.mainPanel);
        }

        // push dummy user objects to firebase
        //this.props.onUpdateFirebaseStore(generateUsers());
    }

    render() {
        console.log(this.props);

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
                                      render={() => <WallView posts={posts} owner={user} user={user} addFriend={this.props.onAddFriend} removeFriend={this.props.onRemoveFriend}/>}
                                      key={key}/>
                    }
                    const friendPosts = posts.filter((post) => {
                        return ((prop.owner.firstName === post.author.firstName && 
                                 prop.owner.lastName === post.author.lastName) ||
                                (prop.owner.firstName === post.recipient.firstName &&
                                 prop.owner.lastName === post.recipient.lastName));
                    });
                    return <Route path={prop.path}
                                  render={() => <WallView posts={friendPosts} owner={prop.owner} user={user} addFriend={this.props.onAddFriend} removeFriend={this.props.onRemoveFriend}/>}
                                  key={key}/>
                })}
            </Switch>    
        )

        console.log(this.props);
        console.log(this.state);

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
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    console.log(state);
    return {
        //user    : state.user,
        friends : state.friends,
        //posts   : state.posts,
        //auth    : state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onUpdateFirebaseStore : (dataToAdd) => dispatch(updateFirebaseStore(dataToAdd)),
        onAddFriend : (friendIdA, friendIdB) => dispatch(dbAddFriend(friendIdA, friendIdB)),
        onRemoveFriend : (friendIdA, friendIdB) => dispatch(dbDeleteFriend(friendIdA, friendIdB)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(App));

