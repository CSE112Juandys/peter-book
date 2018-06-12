import React from 'react';
import { Grid, Hidden, Snackbar, Button, Slide, IconButton} from '@material-ui/core';
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

    userIsOwner = () => {
        return JSON.stringify(this.state.user) === JSON.stringify(this.state.owner);
    }

    handleSubmitPost = (post) => {
        const newPosts = this.state.posts;
        newPosts.unshift(post);
        this.setState({ posts : newPosts });
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

    handlePostSubmit = (content) => {
        const post = generatePost(this.state.owner, this.state.user);
        post.content = content;
        const newPosts = this.state.posts
        newPosts.unshift(post);
        this.setState({ posts : newPosts });
        console.log(this.state.posts);
    }

    handlePostDelete = (postToDelete) => {
        this.handlePostHide(postToDelete);
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

        const photoIcon = <PhotoCamera />;
        const peopleIcon = <People />;

        const friendPhotos = owner.friends.map((friend) => {
            return friend.profileImg;
        })

        const postFeed = posts.map((post, key) => {
            return <PostCard post={post} 
                             user={user} 
                             key={key} 
                             handleError={this.handleSnackbarOpen} 
                             handleHide={this.handlePostHide} 
                             handleDelete={this.handlePostDelete}/>;
        })

        /* for random number ads randomly spread throughout posts */
        /*
        for (var i = 0; i < Math.floor(Math.random() * Math.floor(posts.length * 0.5)); i++) {
            postFeed.splice(Math.floor(Math.random() * postFeed.length), 0, <AdCard/>);
        }
        */

        /* for ads every n posts */
        for (var i = 1; i < posts.length; i++) {
            if (i % 6 === 0) {
                postFeed.splice(i, 0, <AdCard/>);
            }
        }

        const photoGridAction = this.userIsOwner() && 
                                <IconButton color="secondary" onClick={this.handlePostModalOpen}>
                                    <AddAPhoto />
                                </IconButton>

        const friendGridAction =this.userIsOwner() && 
                                <IconButton color="secondary" onClick={this.handleFriendModalOpen}>
                                    <PersonAdd />
                                </IconButton>

        const postView =    <div>
                                {postFeed}
                            </div>
        const infoView =    <div>
                                <ProfileCard user={user} owner={owner} removeFriend={this.props.removeFriend}/>
                                <GridCard icon={peopleIcon} title={"Friends"} photos={friendPhotos} action={friendGridAction}/>
                                <GridCard icon={photoIcon} title={"Photos"} photos={owner.photos} action={photoGridAction}/>
                            </div>

        const writePost = `${user.firstName} ${user.lastName}` !== `${owner.firstName} ${owner.lastName}` && <WritePostCard user={user} owner={owner} handleSubmit={this.handlePostSubmit} handleError={this.handleSnackbarOpen}/>


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
                <PostDialogue open={this.state.openPostModal} user={user} owner={owner} handleClose={this.handlePostModalClose} handleSubmit={this.handleSubmitPost}/>
                <FriendDialogue open={this.state.openFriendModal} 
                                handleClose={this.handleFriendModalClose}
                                user={user} 
                                addFriend={this.props.addFriend}/>
            </div>
        );
    }
}

export default WallView;