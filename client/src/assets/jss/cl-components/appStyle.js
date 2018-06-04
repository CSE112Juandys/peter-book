// ##############################
// // // App styles
// #############################

import { drawerWidth, transition, container } from "assets/jss/cl-components.js";

  const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    width: `calc(100% - ${theme.spacing.unit * 7}px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${theme.spacing.unit * 9}px)`,
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflow: "auto",
    position: "relative",
    float: "right",
    maxHeight: "100%",
    overflowScrolling: 'touch'
  },
  mainPanelShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  button: {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    zIndex: 1039,
  },
  content: {
    marginTop: "10px",
    padding: "30px 15px",
    minHeight: "calc(100% - 123px)"
  },
  container,
  map: {
    marginTop: "70px"
  }
});

export default appStyle;
