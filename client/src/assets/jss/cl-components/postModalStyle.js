// ##############################
// // // Modal styles
// #############################

import { drawerWidth, transition, container } from "assets/jss/cl-components.js";

  const postModalStyle = theme => ({
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '50%',
        height: '50%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
  });

  export default postModalStyle;