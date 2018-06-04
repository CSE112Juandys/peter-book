import React from 'react';
import cx from 'classnames';
import { generatePost } from 'api/mockAPI';
import { InsertPhoto, Send } from '@material-ui/icons'
import ImageUploader from 'react-images-upload';
import { Grid, FormControl, InputLabel, Input, TextField, Button, Card, Divider, IconButton, Avatar, Typography, withStyles, CardHeader, CardActions, CardContent } from '@material-ui/core';
import writePostCardStyle from 'assets/jss/cl-components/writePostCardStyle';

class WritePostCard extends React.Component {

    state = { textContent : ""  };

    handleTextContentChange = (event) => {
        this.setState({
          textContent: event.target.value,
        });
    };

    handleSubmit = () => {
        if (this.state.textContent === "") {
            this.props.handleError();
            return;
        }
        this.setState({ textContent : "" })
        this.props.handleSubmit(this.state.textContent);
    }

    render() {

        const { classes, user, owner, ...rest} = this.props;

        const userAvatar =  user.profileImg ?
                                <img src={user.profileImg} alt="..." className={cx(classes.linkAvatar, classes.itemIcon)} /> :
                                <Avatar className={ cx( classes.whiteIcon, classes.itemIcon)}>
                                    <Typography variant="caption" className={classes.whiteFont}>
                                        {`${user.firstName[0]}${user.lastName[0]}`} 
                                    </Typography>
                                </Avatar>

        return (
            <div className={classes.fullWidth} >
                <Card className={classes.card} >
                    <CardContent>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                {userAvatar}
                            </Grid>
                            <Grid item xs={8} sm={9}>
                                <Input
                                    value={this.state.textContent}
                                    id="commentarea"
                                    label={`post to ${owner.firstName}'s wall`}
                                    placeholder={`post to ${owner.firstName}'s wall`}
                                    multiline
                                    fullWidth
                                    onChange={this.handleTextContentChange}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions >
                        <Button variant="contained" component="span" className={classes.roseIcon} >
                            <InsertPhoto />
                        </Button>
                        <Button className={classes.roseIcon} onClick={this.handleSubmit}>
                            <Send />
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default withStyles(writePostCardStyle)(WritePostCard);