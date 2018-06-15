import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import { Dashboard,
         ChevronRight } from '@material-ui/icons';
import { List,
         ListItem,
         ListItemText,
         Drawer,
         Divider,
         IconButton,
         Collapse,
         withStyles, 
         Avatar,
         Typography} from '@material-ui/core';

import avatar from 'assets/img/marc.jpg';
import { ProfilePaper, Button } from 'components';

import sidebarStyle from 'assets/jss/cl-components/sidebarStyle';

const Sidebar = ({ ...props }) => {
    // verifies if routeName is the one active (in browser input)
    function activeRoute(routeName) {
        return props.location.pathname.indexOf(routeName) > -1 ? true : false;
    }

    const { classes, user, friendRoutes, utilRoutes } = props;

    const utilLinks = (
        <List>
            {utilRoutes.map((prop, key) => {
                if (prop.redirect) {
                    return null;
                }
                const listItemClasses = cx({ [" " + classes['blue']]: activeRoute(prop.path) });
                const whiteFontClasses = cx({ [" " + classes.whiteFont]: activeRoute(prop.path) });

                return (
                    <div>
                        <NavLink to={prop.path} activeClassName="active" key={key} onClick={props.handleChangeWall}>
                            <ListItem button className={listItemClasses}>
                                <Dashboard className={activeRoute(prop.path) ? classes.whiteFont : classes.roseFont}/> 
                                <ListItemText primary={prop.sidebarName} className={classes.itemText + whiteFontClasses} disableTypography={true}/>
                            </ListItem>
                        </NavLink>
                    </div>
                );
            })}
        </List>
    );

    const friendLinks = (
        <List>
            {friendRoutes.map((prop, key) => {
                if (prop.redirect) {
                    return null;
                }
                const listItemClasses = cx({ [" " + classes['blue']]: activeRoute(prop.path) });
                const whiteFontClasses = cx({ [" " + classes.whiteFont]: activeRoute(prop.path) });

                return (
                    <div>
                        <NavLink to={prop.path} activeClassName="active" key={key} onClick={props.handleChangeWall}>
                            <ListItem button className={listItemClasses}>
                                {!prop.owner.profileImg ?  (
                                <Avatar className={ cx(activeRoute(prop.path) ? classes.roseIcon : classes.whiteIcon, classes.itemIcon)}>
                                    <Typography variant="caption" className={activeRoute(prop.path) ? classes.roseFont : classes.whiteFont}>
                                        {prop.icon} 
                                    </Typography>
                                </Avatar>
                                ):<img src={prop.owner.profileImg} alt="..." className={classes.linkAvatar} />}
                                <ListItemText primary={prop.sidebarName} className={classes.itemText + whiteFontClasses} disableTypography={true}/>
                            </ListItem>
                        </NavLink>
                    </div>
                );
            })}
        </List>
    );

    const toggle = props.handleDrawerToggle &&
                    (<IconButton onClick={props.handleDrawerToggle} className={cx(classes.grayFont, classes.expand, props.open && classes.expandOpen)}>
                        <ChevronRight/>
                    </IconButton>);
                    
    var profile = <ProfilePaper user={user}
                                footer={<Button color="rose" round onClick={props.handleModalOpen}>Add Friends</Button>}
                                handleLogOut={props.handleLogOut}/>
    return (
        <Drawer variant="permanent"
                classes={{paper: cx(classes.drawerPaper, !props.open && classes.drawerPaperClose)}}
                open={props.open}>
            <div className={classes.toolbar}>
                {toggle}
            </div>
            <div>
                <Collapse className={classes.item} in={props.open} timeout="auto" unmountOnExit>
                    <Divider />
                    {profile}
                </Collapse>
            </div>
            <Divider/>
            {utilLinks}
            <Divider/>
            {friendLinks}
        </Drawer>
    );
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired
};
  
export default withStyles(sidebarStyle)(Sidebar);
  