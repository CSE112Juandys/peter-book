// ##############################
// // // Sidebar styles
// #############################

import {
    primaryColor,
    drawerWidth,
    defaultFont,
    secondaryColor,
    grayColor,
    roseColor,
  } from "assets/jss/cl-components.js";
  
  const sidebarStyle = theme => ({
    drawerPaper: {
        backgroundColor: 'white',
        position: 'fixed',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    profilePaper: {
        position: "relative",
        display: "block",
        marginRight: '25px',
    }, 
    linkAvatar: {
        width: "35px",
        height: "35px",
        marginLeft: '-5px',
        float: "center",
        textAlign: "center",
        verticalAlign: "middle",
        borderRadius: "50%",
    },
    utilLinks: {
        position: "relative",
        display: "block",
        marginBottom: '10px'
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },  
    item: {
        position: "relative",
        display: "block",
        textDecoration: "none",
    },
    itemLink: {
        width: 'auto',
        transition: "all 300ms linear",
        margin: "10px 15px 0",
        borderRadius: "3px",
        position: "relative",
        display: "block",
        padding: "10px 15px",
        backgroundColor: "transparent",
        ...defaultFont
    },
    itemIcon: {
        width: "35px",
        height: "35px",
        marginLeft: '-5px',
        float: "center",
        textAlign: "center",
        verticalAlign: "middle",
        backgroundColor: roseColor,
        color: 'white'
    },
    itemText: {
        ...defaultFont,
        marginLeft: "40px",
        lineHeight: "30px",
        fontSize: "14px",
        color: grayColor
    },
    whiteFont: {
        color: 'white'
    },
    grayFont: {
        color: grayColor
    },
    roseFont: {
        color: roseColor
    },
    roseIcon: {
        color: roseColor,
        backgroundColor: 'white'
    },
    whiteIcon: {
        color: 'white',
        backgroundColor: roseColor
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 5px',
        [theme.breakpoints.up('md')]: {
            padding: '0 10px',
        },
        ...theme.mixins.toolbar,
    },
    blue: {
        backgroundColor: roseColor,
        "&:hover": {
          backgroundColor: roseColor,
        }
    },
    sidebarWrapper: {
        position: "relative",
        height: "calc(100vh - 75px)",
        overflow: "auto",
        width: "300px",
        overflowScrolling: 'touch'
    },
});
  
export default sidebarStyle;
  