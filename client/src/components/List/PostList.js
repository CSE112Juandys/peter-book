import React from 'react';
import { Send } from '@material-ui/icons';
import { Avatar, Input, List, ListItem, Grid, TextField, withStyles, Typography, Divider, IconButton, InputAdornment } from '@material-ui/core';
import { Button } from 'components';
import cx from 'classnames';
import postListStyle from 'assets/jss/cl-components/postListStyle';
import PostListItem from 'components/ListItem/PostListItem';

class PostList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {  textContent : "",
                        posts       : props.posts };
    }

    componentWillReceiveProps(newProps) {
        this.setState({ posts : newProps.posts });
    }
    
    handleTextContentChange = (event) => {
        this.setState({
          textContent: event.target.value,
        });
    };

    handleSubmit = () => {
        this.setState({ textContent : "" })
        this.props.handleSubmit(this.state.textContent);
    }

    render() {
        const { classes, user } = this.props;
        const { posts } = this.state;
        const userAvatar =  user.profileImg ?
                            <img src={user.profileImg} alt="..." className={cx(classes.linkAvatar, classes.itemIcon)} /> :
                            <Avatar className={ cx( classes.whiteIcon, classes.itemIcon)}>
                                <Typography variant="caption" className={classes.whiteFont}>
                                    {`${user.firstName[0]}${user.lastName[0]}`} 
                                </Typography>
                            </Avatar>

        const postFeed = posts.map((post, index) => {
            return (<PostListItem post={post} user={user} key={index} handleError={this.props.handleError}/>);
        })
        return(
            <List>
                {postFeed}
                <ListItem>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            {userAvatar}
                        </Grid>
                        <Grid item xs={8} sm={9}>
                            <Input
                                value={this.state.textContent}
                                id="commentarea"
                                label="add a comment"
                                placeholder="add a comment"
                                multiline
                                fullWidth
                                onChange={this.handleTextContentChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <IconButton className={ cx( classes.roseIcon, classes.itemIcon)} onClick={this.handleSubmit}>
                                <Send />
                            </IconButton>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
        );
    }
}

export default withStyles(postListStyle)(PostList);