import React from "react";
import { withStyles,
         Typography,
         IconButton,
         Menu,
         MenuItem,
         Grid,
         Avatar
        } from "@material-ui/core";
import { MoreVert } from '@material-ui/icons';
import cx from 'classnames';
import PropTypes from "prop-types";

import profilePaperStyle from "assets/jss/cl-components/profilePaperStyle";

class ProfilePaper extends React.Component {

  state = { anchorEl : null };

  handleMenuClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { classes, subtitle, description, footer, profilePicture, user } = this.props;
    const { anchorEl } = this.state;

    const menu =  <div >
                    <IconButton variant="raised" onClick={this.handleMenuClick} className={classes.profileMenu}>
                      <MoreVert />
                    </IconButton>
                    <Menu
                      id="profileMenu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={this.handleMenuClose}
                    >
                      <MenuItem onClick={this.handleMenuClose}>Log Out</MenuItem>
                      <MenuItem onClick={this.handleMenuClose}>Account Settings</MenuItem>
                    </Menu>
                  </div>

    const avatar = !user.profileImg ?
                  ( <Avatar className={ cx(classes.whiteIcon, classes.profileAvatar, classes.img)}>
                        <Typography variant="display2" className={classes.whiteFont}>
                            {`${user.firstName[0]}${user.lastName[0]}`} 
                        </Typography>
                    </Avatar> ) : 
                  ( <img src={user.profileImg} alt="..." className={classes.img + " " + classes.profileAvatar} /> )

    return (
      <div className={classes.profile}>
        <Grid container>
          <Grid item xs={12}>
            {menu}
          </Grid>
          <Grid item xs={12}>
            <div
              classes={{
                root: classes.profileHeader,
                avatar: classes.profileAvatar
              }}
            >
              {avatar}
            </div>
          </Grid>
        </Grid>
        <div className={classes.profileTextAlign}>
          {subtitle !== undefined ? (
            <Typography component="h6" className={classes.profileSubtitle}>
              {subtitle}
            </Typography>
          ) : null}
          <Typography component="h4" className={classes.profileTitle}>
              {`${user.firstName} ${user.lastName}`}
          </Typography>
          {description !== undefined ? (
            <Typography component="p" className={classes.profileDescription}>
              {description}
            </Typography>
          ) : null}
        </div>
        <div className={classes.profileTextAlign + " " + classes.profileActions}>
          {footer}
        </div>
      </div>
    );
  }
}

ProfilePaper.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  description: PropTypes.node,
  footer: PropTypes.node,
  avatar: PropTypes.string
};

export default withStyles(profilePaperStyle)(ProfilePaper);
