import React from 'react';
import { Grid, Hidden, Snackbar } from '@material-ui/core';
import { PhotoCamera, People } from '@material-ui/icons';
import { generatePost } from 'api/mockAPI';
import GridCard from 'components/Card/GridCard';
import photoGridImg from 'assets/img/photoGridImg/photoGridImg';
import friendGridImg from 'assets/img/friendGridImg/friendGridImg';
import ProfileCard from 'components/Card/ProfileCard'
import PostCard from 'components/Card/PostCard';
import AdCard from 'components/Card/AdCard';
import WritePostCard from 'components/Card/WritePostCard';

class WallView extends React.Component {

    constructor(props) {
        super(props);

        const { posts, owner, user} = this.props;

        this.state = { posts, owner, user, snackbarOpen : false };
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
        const { posts, owner, user} = this.state;

        const photoIcon = <PhotoCamera />;
        const peopleIcon = <People />;

        const friendPhotos = owner.friends.map((friend) => {
            return {
                        img   : friend.profileImg,
                        title : friend.firstName,
                        cols  : 1
            };
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

        const postView =    <div>
                                {postFeed}
                            </div>
        const infoView =    <div>
                                <ProfileCard owner={owner}/>
                                <GridCard icon={peopleIcon} title={"Friends"} photos={friendPhotos} />
                                <GridCard icon={photoIcon} title={"Photos"} photos={owner.photos} />
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
                            {writePost}
                            {postView}
                        </Hidden>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Hidden mdUp>
                            {writePost}
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
            </div>
        );
    }
}

export default WallView;