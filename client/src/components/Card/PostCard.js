import React from 'react';
import { Comment,
         MoreVert,
        Favorite } from '@material-ui/icons';
import { withStyles,
         Avatar,
         Button,
         Card, 
         Snackbar,
         CardHeader,
         CardContent,
         Typography,
         CardActions,
         Collapse,
         Divider,
         IconButton,
         Menu,
         MenuItem,
         CardMedia} from '@material-ui/core';
import { generatePost } from 'api/mockAPI';
import cx from 'classnames';
import PostList from 'components/List/PostList'

import PostCardStyle from 'assets/jss/cl-components/postCardStyle';

class PostCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {  open : false, 
                        anchorEl : null,
                        post : props.post };
    }

    componentWillReceiveProps(newProps) {
        this.setState({ post: newProps.post})
    }

    authorIsUser = () => {
        return `${this.props.user.firstName} ${this.props.user.lastName}` === `${this.props.post.author.firstName} ${this.props.post.author.lastName}`
    }

    handleCommentSubmit = (content) => {
        if (content === "") {
            this.props.handleError();
            return
        }
        const newPost = this.state.post;
        const recipient = this.authorIsUser() ? this.state.post.recipient : this.state.post.author
        const newComment = generatePost(recipient, this.props.user);
        
        newComment.content = content;
        newPost.comments = this.state.post.comments.concat(newComment);
        this.props.updatePost(newPost);
        //this.setState({ post : newPost });
    }

    handleCollapseTriggered = () => {
        this.setState({ open : !this.state.open });
    }

    handleMenuClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    handlePostDelete = () => {
        this.props.handleDelete(this.state.post);
        this.setState({ open : false });
    }

    handlePostHide = () => {
        this.props.handleHide(this.state.post);
        this.setState({ open : false });
    }

    render() {
        const { classes, user } = this.props;
        const { open, post, anchorEl } = this.state
        const { author, recipient, content, media, updated, comments, likes } = post;        

        const authorMenuButton =    <div>
                                        <IconButton aria-haspopup="true" onClick={this.handleMenuClick}>
                                            <MoreVert />
                                        </IconButton>
                                        <Menu id="menu"
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={this.handleMenuClose}
                                            >
                                            <MenuItem onClick={this.handlePostHide}>Hide</MenuItem>
                                            <MenuItem onClick={this.handleMenuClose}>Edit</MenuItem>
                                            <MenuItem onClick={this.handlePostDelete}>Delete</MenuItem>
                                        </Menu>
                                    </div>

        const userMenuButton =      <div>
                                        <IconButton aria-haspopup="true" onClick={this.handleMenuClick}>
                                            <MoreVert />
                                        </IconButton>
                                        <Menu id="menu"
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={this.handleMenuClose}
                                            >
                                            <MenuItem onClick={this.handlePostHide}>Hide</MenuItem>
                                        </Menu>
                                    </div>

        const cardActions = <Button size="small" onClick={this.handleCollapseTriggered}>
                                <Comment    className={cx(classes.leftIcon, classes.iconSmall)}
                                                color="action" />
                                {post.comments.length || '0'}
                            </Button>

        const cardMedia = media && <CardMedia image={media} title="cardMedia" style={{height: 0, paddingTop: '56.25%'}}/>

        const authorAvatar =    author.profileImg ?
                                <img src={author.profileImg} alt="..." className={cx(classes.linkAvatar, classes.itemIcon)} /> :
                                <Avatar className={ cx( classes.whiteIcon, classes.itemIcon)}>
                                    <Typography variant="caption" className={classes.whiteFont}>
                                        {`${author.firstName[0]}${author.lastName[0]}`} 
                                    </Typography>
                                </Avatar>
        


        return (
                <div className={classes.fullWidth}>
                    <Card className={classes.card}>
                        <CardHeader avatar={authorAvatar}
                                    title={`${post.author.firstName} ${post.author.lastName}`}
                                    subheader={post.created}
                                    action={this.authorIsUser() ? authorMenuButton : userMenuButton}
                        />
                        <Divider inset/>
                        {cardMedia}
                        <CardContent>
                            <Typography component="p">
                                {post.content}
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.actions} disableActionSpacing>
                            {cardActions}
                        </CardActions>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <div className={classes.commentField}>
                                <PostList posts={post.comments} user={user} handleSubmit={this.handleCommentSubmit} handleError={this.props.handleError}/>
                            </div>
                        </Collapse>
                    </Card>
                </div>
        );
    }
}

export default withStyles(PostCardStyle)(PostCard);