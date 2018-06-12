import React from 'react';
import { Button, Modal, withStyles } from '@material-ui/core';
import database from 'database';

import friendModalStyle from 'assets/jss/cl-components/friendModalStyle';

class FriendModal extends React.Component {

    handleAddFriend =(event) => {

        // read the val from the input
        const friend_val = (document.getElementById('friend_id').value)

        // cant be empty, can't be you
        if (friend_val !== "" && this.props.user !== friend_val) {
            database.ref(friend_val+"/Name").once("value").then((friend_snap) => {
                // // friend has to acually exist in the database
                // if (friend_snap.val() == null) {
                //     console.log("User not found")
                //     //no user found popup maybe
                // }

                //else {
                    // generate the shared key (sherman)
                    const key = "GeneratedKey"

                    // set your friend data, structured so we can use it later
                    database.ref(this.props.user+"/Friends/"+friend_val).set({
                        DataKey: key,
                        Name: friend_snap.val(),
                        Posts : "None"
                    });

                    // set friends data, structured so we can use it later
                    database.ref(friend_val+"/Friends/"+this.props.user).set({
                        DataKey: key,
                        Name: this.props.name,
                        Posts : "None"
                    });
                //}
            })
        }
    }

    /*
     * handler for generating friend codes
     */
    genFriendCode = (event) => {
        // Probably a better way of doing this.  Just want to display the value to the input
        const disp_ele = (document.getElementById('friend_id'))
        disp_ele.value = this.props.user

        //Copying to clipboard for user, makes it less effort for them
        disp_ele.select()
        document.execCommand('copy')
    }

    render() {
        
        const { classes, open, handleClose, ...rest } = this.props;

        return (
            <Modal 
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open = {open}
                onClose = {handleClose}>

                <div className={classes.paper}>
                    <Button variant="contained" color="secondary" onClick={this.genFriendCode}>Generate Friend Code</Button>
                    <Button variant="contained" color="secondary" onClick={this.handleAddFriend}>Add Friend</Button><br/>
                    <input id="friend_id" label="Friend Code"/>
                </div>
            </Modal>
        );
    }
}

export default withStyles(friendModalStyle)(FriendModal);
