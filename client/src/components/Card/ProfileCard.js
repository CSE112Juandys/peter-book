import React from 'react';
import cx from 'classnames';
import { Public, MoreVert } from '@material-ui/icons';
import { withStyles, Card, CardMedia, CardHeader, Avatar, CardContent, Typography, Grid, IconButton , Menu, MenuItem } from '@material-ui/core';
import { Button } from 'components';

import profileCardStyle from 'assets/jss/cl-components/profileCardStyle';

class ProfileCard extends React.Component {

    state = { anchorEl : null};

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
        const { classes, owner } = this.props;
        const { anchorEl } = this.state;

        const avatar = <Avatar className={classes.whiteIcon}>
                            <Public />
                        </Avatar >

        const menu =    <div style={{float:'right'}}>
                            <IconButton variant="raised" onClick={this.handleMenuClick} className={classes.profileMenu}>
                                <MoreVert />
                            </IconButton>
                            <Menu id="friendMenu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleMenuClose}>
                                <MenuItem onClick={this.handleMenuClose}>Remove Friend</MenuItem>
                            </Menu>
                        </div>

        const cardAvatar = !owner.profileImg ?
                            ( <Avatar className={ cx(classes.whiteIcon, classes.cardAvatar, classes.img)}>
                                <Typography variant="display2" className={classes.whiteFont}>
                                    {`${owner.firstName[0]}${owner.lastName[0]}`} 
                                </Typography>
                            </Avatar> ) : 
                            ( <img src={owner.profileImg} alt="..." className={classes.img + " " + classes.cardAvatar} /> )

        const cardTitle =   <Typography component="h4" className={classes.profileTitle}>
                                {`${owner.firstName} ${owner.lastName}`}
                            </Typography>
        return (
            <div className={classes.fullWidth}>
                <Card className={classes.card}>
                    <CardHeader avatar={cardAvatar}
                                title={cardTitle} 
                                action={menu}/>
                    <CardHeader avatar={avatar}
                                title='intro' />
                    <CardContent>
                            {owner.profileInfo}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withStyles(profileCardStyle)(ProfileCard);

