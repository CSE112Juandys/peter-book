import React from 'react';
import { Modal, Typography, withStyles } from '@material-ui/core';

import postModalStyle from 'assets/jss/cl-components/postModalStyle';

class PostModal extends React.Component {

    render() {
        
        const { classes, open, handleClose, ...rest } = this.props;

        return (
            <Modal  aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}>
                 <div className={classes.paper}>
                    <Typography variant="title" id="modal-title">
                    Text in a modal
                    </Typography>
                    <Typography variant="subheading" id="simple-modal-description">
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </div>
            </Modal>
        );
    }
}

export default withStyles(postModalStyle)(PostModal);