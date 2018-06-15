import {
    card,
    defaultFont,
    grayColor,
    roseColor
} from "assets/jss/cl-components.js";

const authStyle = theme => ({
    card: {
        maxWidth: '500px',
        maxHeight: '500px',
        verticalAlign: 'middle',
        position: 'absolute',
        justifyContent: 'center',
        ...card
    },
    roseIcon: {
        color: roseColor,
        backgroundColor: 'white'
    },
    whiteIcon: {
        color: 'white',
        backgroundColor: roseColor,
        "&:hover": {
            backgroundColor: roseColor,
          }
    },
});

export default authStyle