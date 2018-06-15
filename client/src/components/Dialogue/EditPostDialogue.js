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

class EditPostDialogue extends React.Component {

    constructor(props) {
        super(props);

        this.state = {  snackbarOpen   : false,
                        picture       : this.props.post.media,
                        textContent    : this.props.post.content }
    }

    handleSnackbarOpen = () => {
        this.setState({ snackbarOpen : true });
    }

    handleSnackbarClose = () => {
        this.setState({ snackbarOpen : false });
    }


    handleSubmitPost = () => {
        const { textContent, picture } = this.state;

        if (textContent ===  "" && !picture) {
            this.handleSnackbarOpen();
            return
        }

        const postContent = {};

        if (picture) {
            postContent.media = picture;
        }

        if (textContent !== "") {
            postContent.content = textContent;
        }

        this.setState({ snackbarOpen   : false,
                        picture        : null,
                        textContent    : ""})
        this.props.handleUpdate(postContent);
        this.props.handleClose();
    }

    onDrop = (pictures) => {
        var reader = new FileReader();
        reader.readAsDataURL(pictures[0]);
        reader.onload = () => {
            this.setState({picture : reader.result})
        }
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
    }
    
    handleChangeText = (event) => {
        this.setState({ textContent : event.target.value });
    }

    render() {
        const { classes, user, post, open, handleClose, fullScreen} = this.props;

        return (
            <div>
            <Dialog fullScreen={fullScreen}
                    TransitionComponent={Transition}
                    open={open}
                    onClose={handleClose}>
                <DialogTitle id="friend-dialog-title">{"New Post"}</DialogTitle>
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
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      open={this.state.snackbarOpen}
                      onClose={this.handleSnackbarClose}
                      message={<span>Add Content to Post</span>} />
            </div>
        )
    }

};

export default withMobileDialog()(withStyles(postDialogueStyle)(EditPostDialogue));
