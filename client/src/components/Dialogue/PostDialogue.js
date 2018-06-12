import React from 'react';
import cx from 'classnames';
import { generatePost } from 'api/mockAPI';
import ImageUploader from 'react-images-upload';
import { Link, PersonAdd, AddAPhoto, ExpandMore } from '@material-ui/icons';
import { Dialog, MenuItem, Input, withMobileDialog, withStyles, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Divider, Slide, Typography, Grid, InputAdornment, IconButton, TextField, Collapse, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Snackbar} from '@material-ui/core';


import postDialogueStyle from 'assets/jss/cl-components/postDialogueStyle'

const Transition = (props) => {
    return <Slide direction="up" {...props} />;
}

class PostDialogue extends React.Component {

    constructor(props) {
        super(props);

        this.state = {  snackbarOpen   : false,
                        recipSnackbarOpen : false,
                        recipientName  : "hello",
                        recipient      : this.props.owner,
                        pictures       : [],
                        textContent    : ""};
    }

    handleSnackbarOpen = () => {
        this.setState({ snackbarOpen : true });
    }

    handleSnackbarClose = () => {
        this.setState({ snackbarOpen : false });
    }

    handleRecipSnackbarOpen = () => {
        this.setState({ recipSnackbarOpen : true });
    }

    handleRecipSnackbarClose = () => {
        this.setState({ recipSnackbarOpen : false });
    }


    handleSubmitPost = () => {
        const { textContent, pictures, recipient } = this.state;
        console.log(pictures);
        console.log(textContent);

        if (JSON.stringify(recipient) === JSON.stringify(this.props.user)) {
            this.handleRecipSnackbarOpen();
            return
        }

        if (textContent ===  "" && pictures.length === 0) {
            this.handleSnackbarOpen();
            return
        }

        const post = generatePost(this.state.recipient, this.props.user);

        post.content = "";

        if (pictures.length !== 0) {
            const postMedia = URL.createObjectURL(pictures[0]);
            post.media = postMedia;
        }

        if (textContent !== "") {
            post.content = textContent;
        }

        this.setState({ snackbarOpen   : false,
                        recipientName  : "hello",
                        recipient      : this.props.owner,
                        pictures       : [],
                        textContent    : ""})
        this.props.handleSubmit(post);
        this.props.handleClose();
    }

    onDrop = (pictures) => {
        this.setState({
            pictures
        });

    }
    
    handleChangeText = (event) => {
        this.setState({ textContent : event.target.value });
    }


    onChange = (event) => {
        const recipient = this.props.user.friends.filter((friend) => {
            return `${friend.firstName} ${friend.lastName}` === event.target.value;
        })[0]

        this.setState({ recipient, recipientName : event.target.value })
    }

    render() {
        const { classes, user, owner, open, handleClose, fullScreen} = this.props;
        const { friends } = user;
        const { recipientName } = this.state

        const endAdornment =    <IconButton color="secondary">
                                    <AddAPhoto />
                                </IconButton>

        return (
            <div>
            <Dialog fullScreen={fullScreen}
                    TransitionComponent={Transition}
                    open={open}
                    onClose={handleClose}>
                <DialogTitle id="friend-dialog-title">{"New Post"}</DialogTitle>
                <DialogContent >
                    {(JSON.stringify(user) === JSON.stringify(owner)) &&
                    <TextField  id="toField"
                                value={recipientName}
                                label="Select a Friend"
                                fullWidth
                                required
                                select
                                onChange={this.onChange}
                                InputProps={{startAdornment: <InputAdornment position="start">To:</InputAdornment>}}>
                        {user.friends.map((friend) => {
                            const friendName = `${friend.firstName} ${friend.lastName}`
                            return(
                            <MenuItem key={friendName} value={friendName}>
                                {friendName}
                            </MenuItem>
                        )})}
                  </TextField>}
                </DialogContent>
                <DialogContent>
                    <TextField  fullWidth
                                value={this.state.textContent}
                                id="postField"
                                label="Write content to Post"
                                multiline
                                onChange={this.handleChangeText}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Post:</InputAdornment>,
                                }}/>
                </DialogContent>
                <DialogContent>
                    <ExpansionPanel className={classes.expansionPanel}>
                        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                            <Typography variant={"caption"}>Add a photo</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <ImageUploader  withIcon={true}
                                            buttonText='Choose images'
                                            onChange={this.onDrop}
                                            withPreview
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            style={{ width: '500px', margin: "20px auto" }}
                                            maxFileSize={5242880}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className={classes.roseIcon}>
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmitPost} className={classes.whiteIcon}>
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      open={this.state.snackbarOpen}
                      onClose={this.handleSnackbarClose}
                      message={<span>Add Content to Post</span>} />
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      open={this.state.recipSnackbarOpen}
                      onClose={this.handleRecipSnackbarClose}
                      message={<span>Specify Recipient to Post</span>} />
            </div>
        )
    }

};

export default withMobileDialog()(withStyles(postDialogueStyle)(PostDialogue));
