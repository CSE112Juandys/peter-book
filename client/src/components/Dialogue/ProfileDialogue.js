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

class ProfileDialogue extends React.Component {

    constructor(props) {
        super(props);

        this.state = {  snackbarOpen   : false,
                        picture        : null,
                        textContent    : this.props.user.profileInfo};
    }

    handleSnackbarOpen = () => {
        this.setState({ snackbarOpen : true });
    }

    handleSnackbarClose = () => {
        this.setState({ snackbarOpen : false });
    }


    handleSubmitPost = () => {
        const { textContent, picture, recipient } = this.state;
        const { user } = this.props;
        const updatedUser = user;
        // console.log(pictures);
        // console.log(textContent);

        if (textContent ===  "") {
            this.handleSnackbarOpen();
            return
        }

        updatedUser.profileInfo = textContent;

        if (picture) {
            const profilePic = picture;
            updatedUser.profileImg = profilePic;
        }

        this.setState({ snackbarOpen : false,
                        picture       : null,
                        textContent  : updatedUser.profileInfo
                     })

        this.props.updateUser(updatedUser);
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
        const { classes, user, open, handleClose, fullScreen} = this.props;
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
                <DialogTitle id="profile-dialog-title">{"Edit Profile"}</DialogTitle>
                <DialogContent>
                    <TextField  fullWidth
                                value={this.state.textContent}
                                id="profileInfoField"
                                label="Update your profile info"
                                multiline
                                onChange={this.handleChangeText}/>
                </DialogContent>
                <DialogContent>
                    <ExpansionPanel className={classes.expansionPanel}>
                        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                            <Typography variant={"caption"}>Add a profile pic</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <ImageUploader  withIcon={true}
                                            buttonText='Update Profile Picture'
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
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      open={this.state.snackbarOpen}
                      onClose={this.handleSnackbarClose}
                      message={<span>Pleeeease update your profile info</span>} />
            </div>
        )
    }

};

export default withMobileDialog()(withStyles(postDialogueStyle)(ProfileDialogue));
