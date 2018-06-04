import {
    card,
    defaultFont,
    grayColor,
    roseColor
} from "assets/jss/cl-components.js";

const gridCardStyle = theme => ({
    card: {
        maxWidth: '400px',
        minWidth: '300px',
        display: 'inline-block',
        textAlign: 'left',
        ...card
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
    fullWidth: {
        textAlign: 'center',
        width: '100%',
    },
    itemIcon: {
        width: "35px",
        height: "35px",
        float: "center",
        textAlign: "center",
        verticalAlign: "middle",
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    whiteIcon: {
        color: 'white',
        backgroundColor: roseColor
    },
});

export default gridCardStyle