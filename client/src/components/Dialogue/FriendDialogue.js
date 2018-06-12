import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Link, PersonAdd, Close} from '@material-ui/icons';
import { Dialog, Input, withMobileDialog, withStyles, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Divider, Slide, Typography, Grid, InputAdornment, IconButton, TextField, Snackbar} from '@material-ui/core';

import friendDialogueStyle from 'assets/jss/cl-components/friendDialogueStyle';

const Transition = (props) => {
    return <Slide direction="up" {...props} />;
}

class FriendDialogue extends React.Component {

    state = { copySnackbarOpen : false, 
              friendSnackbarOpen : false,
              dupeSnackbarOpen : false,
              friendId : ""
            };
    
    handleFriendIdChange = (e) => {
        this.setState({ friendId : e.target.value });
    }

    handleOnCopy = () => {
        this.setState({ copySnackbarOpen : true });
    }

    handleCopySnackbarClose = () => {
        this.setState({ copySnackbarOpen : false });
    }

    handleDupeSnackbarClose = () => {
        this.setState({ dupeSnackbarOpen : false });
    }

    handleFriendSnackbarClose = () => {
        this.setState({ friendSnackbarOpen : false });
    }

    handleAddFriend = () => {
        const friendList = this.props.user.friends.map((friend) => {
            return friend.id;
        })
        if (friendList.includes(this.state.friendId)) {
            this.setState({ dupeSnackbarOpen : true });
            return
        }
        this.props.addFriend(this.props.user.id, this.state.friendId)
        this.setState({ friendSnackbarOpen : true });
    }

    render() {
        const { classes, user, open, handleClose, fullScreen} = this.props;

        const linkAdornment =   <CopyToClipboard text={user.id} onCopy={this.handleOnCopy}>
                                    <IconButton color="secondary">
                                        <Link />
                                    </IconButton>
                                </CopyToClipboard>

        const submitFriendLink = <IconButton color="secondary" onClick={this.handleAddFriend}>
                                    <PersonAdd />
                                </IconButton>

        return (
            <div>
            <Dialog fullScreen={fullScreen}
                    TransitionComponent={Transition}
                    open={open}
                    onClose={handleClose} >
                <DialogTitle id="friend-dialog-title">{"Add Friends"}</DialogTitle>
                <DialogContent>
                    <Typography component="p">
                        Your Friend Code
                    </Typography>
                    <DialogContentText>
                        Send this code to your friends so you can follow each other.
                    </DialogContentText>
                    <Grid container>
                        <Grid item xs={11}>
                            <Input  value={user.id}
                                    fullWidth
                                    disabled
                                    inputProps={{'aria-label': 'userCode'}}/>
                        </Grid>
                        <Grid item xs={1}>
                            {linkAdornment}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogContent>
                    <Typography component="p">
                        Input a Friend's Code
                    </Typography>
                    <DialogContentText>
                        Paste a friend's code to add them to your network
                    </DialogContentText>
                    <Grid container>
                        <Grid item xs={11}>
                            <TextField  label="friend code"
                                        value={this.state.friendId}
                                        placeholder="friend code"
                                        fullWidth
                                        onChange={this.handleFriendIdChange}
                                        inputProps={{'aria-label': 'friendCode'}}/>
                        </Grid>
                        <Grid item xs={1}>
                            {submitFriendLink}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className={classes.roseIcon}>
                        Cancel
                    </Button>
                    <Button onClick={handleClose} className={classes.whiteIcon}>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      open={this.state.copySnackbarOpen}
                      onClose={this.handleCopySnackbarClose}
                      message={<span>Copied to Clipboard!</span>} />
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      open={this.state.friendSnackbarOpen}
                      onClose={this.handleFriendSnackbarClose}
                      message={<span>Friend Added</span>} />
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      open={this.state.dupeSnackbarOpen}
                      onClose={this.handleDupeSnackbarClose}
                      message={<span>You are already friends with this user</span>} />
            </div>

        )
    }

};

export default withMobileDialog()(withStyles(friendDialogueStyle)(FriendDialogue));
