import React from 'react';
import { Grid, Hidden, Snackbar, Button, Slide, IconButton, Card} from '@material-ui/core';
import { PhotoCamera, People, Edit, AddAPhoto, PersonAdd } from '@material-ui/icons';
import { generatePost } from 'api/mockAPI';
import GridCard from 'components/Card/GridCard';
import ProfileCard from 'components/Card/ProfileCard'
import PostCard from 'components/Card/PostCard';
import AdCard from 'components/Card/AdCard';
import WritePostCard from 'components/Card/WritePostCard';
import PostDialogue from 'components/Dialogue/PostDialogue';
import FriendDialogue from 'components/Dialogue/FriendDialogue';

const buttonStyle =   {
                    position: 'fixed',
                    right: '20px',
                    bottom: '20px',
                    zIndex: 1039,
                }

class WallView extends React.Component {

    constructor(props) {
        super(props);

        const { posts, owner, user} = this.props;

        this.state = { posts, owner, user, openPostModal : false, openFriendModal : false, snackbarOpen : false };
    }

    componentWillReceiveProps(newProps) {
        this.setState({ posts : newProps.posts });
    }

    userIsOwner = () => {
        return JSON.stringify(this.state.user) === JSON.stringify(this.state.owner);
    }

    handleSubmitPost = (post) => {
        const newPosts = this.state.posts;
        // newPosts.unshift(post);
        // this.setState({ posts : newPosts });
        this.props.addPost(post)
    }

    handleFriendModalOpen = () => {
        this.setState({ openFriendModal : true });
    }

    handleFriendModalClose = () => {
        this.setState({ openFriendModal : false });
    }

    handlePostModalOpen = () => {
        this.setState({ openPostModal : true });
    }

    handlePostModalClose = () => {
        this.setState({ openPostModal : false });
    }

    handleSnackbarOpen = () => {
        this.setState({ snackbarOpen : true });
    }

    handleSnackbarClose = () => {
        this.setState({ snackbarOpen : false });
    };

    handlePostDelete = (postToDelete) => {
        this.props.removePost(postToDelete);
    }

    handlePostHide = (postToHide) => {
        const newPosts = this.state.posts.filter((post) => {
            return (JSON.stringify(post) !== JSON.stringify(postToHide));
        });

        this.setState({ posts : newPosts });
    }

    render() {
        console.log(this.props);
        const { posts, owner, user} = this.state;



        const infoView =   <div><ProfileCard user={user} owner={owner} removeFriend={this.props.removeFriend} updateUser={this.props.updateUser}/></div>


        var postFeed = posts.map((post, key) => {
            return <PostCard post={post} 
                            user={user} 
                            key={key} 
                            handleError={this.handleSnackbarOpen} 
                            handleHide={this.handlePostHide} 
                            handleDelete={this.handlePostDelete}
                            updatePost={this.props.updatePost}/>;
        })

        if (postFeed.length === 0) {
            postFeed =  <div style={{height: '100%', width: '100%', textAlign: 'center', verticalAlign: 'middle'}}>
                            Share a Post with a friend to see more content.
                        </div>
        }

        /* for random number ads randomly spread throughout posts */
        /*
        for (var i = 0; i < Math.floor(Math.random() * Math.floor(posts.length * 0.5)); i++) {
            postFeed.splice(Math.floor(Math.random() * postFeed.length), 0, <AdCard/>);
        }
        */

        /* for ads every n posts */
        for (var i = 1; i < posts.length; i++) {
            if (i % 2 === 0) {
                postFeed.splice(i, 0, <AdCard/>);
            }
        }

        const postView =    <div style={{marginRight:'10px'}}>
                                {postFeed}
                            </div>

        return (
            <div>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Hidden mdUp>
                            {infoView}
                        </Hidden>
                        <Hidden smDown>
                            {postView}
                        </Hidden>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Hidden mdUp>
                            {postView}
                        </Hidden>
                        <Hidden smDown>
                            {infoView}
                        </Hidden>
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={this.state.snackbarOpen}
                    onClose={this.handleSnackbarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="postFailureSnackbar">Write content to post!</span>}
                />
                <Button variant="fab" color="secondary" style={buttonStyle} onClick={this.handlePostModalOpen}>
                    <Edit />
                </Button>
                <PostDialogue open={this.state.openPostModal} 
                              user={user} 
                              owner={owner} 
                              handleClose={this.handlePostModalClose} 
                              handleSubmit={this.handleSubmitPost}/>
                <FriendDialogue open={this.state.openFriendModal} 
                                handleClose={this.handleFriendModalClose}
                                user={user} 
                                addFriend={this.props.addFriend}/>
            </div>
        );
    }
}

export default WallView;