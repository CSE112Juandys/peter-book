import React from 'react';
import { ListItem, Avatar, Typography, withStyles, Card, CardHeader, CardContent } from '@material-ui/core';
import cx from 'classnames';
import { generatePost } from 'api/mockAPI';

import postListItemStyle from 'assets/jss/cl-components/postListItemStyle';

  
class PostListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {  open : false, 
                        post : props.post };
    }

    authorIsUser = () => {
        return `${this.props.user.firstName} ${this.props.user.lastName}` === `${this.props.post.author.firstName} ${this.props.post.author.lastName}`
    }

    handleCommentSubmit = (content) => {
        if (content === "") {
            this.props.handleError();
            return;
        }
        const newPost = this.state.post;
        const recipient = this.authorIsUser() ? this.state.post.recipient : this.state.post.author
        const newComment = generatePost(recipient, this.props.user);
        newComment.content = content;
        newPost.comments = this.state.post.comments.concat(newComment);
        this.setState({ post : newPost });
        console.log(this.state.post);

    }

    handleCollapseTriggered = () => {
        this.setState({ open: !this.state.open });
    };

    render() {
        const { classes, user } = this.props;
        const { open, post } = this.state;
        const { author, recipient, content, image, updated, comments } = post;

        const avatar =  author.profileImg ?
                        <img src={author.profileImg} alt="..." className={cx(classes.linkAvatar, classes.itemIcon)} /> :
                        <Avatar className={ cx( classes.whiteIcon, classes.itemIcon)}>
                            <Typography variant="caption" className={classes.whiteFont}>
                                {`${author.firstName[0]}${author.lastName[0]}`} 
                            </Typography>
                        </Avatar>

        return(
            <div>
                <ListItem >
                    <Card className={classes.cardPaper}>
                        <CardHeader avatar={avatar} 
                                    title={`${author.firstName} ${author.lastName}`}
                                    subheader={post.created} />
                        <CardContent>
                            <Typography component="p">
                                {content}
                            </Typography>
                        </CardContent>
                    </Card>
                </ListItem >
            </div>
        );
    }
}


  
export default withStyles(postListItemStyle)(PostListItem);