import {
    card,
    defaultFont,
    cardActions,
    grayColor,
    roseColor
} from "assets/jss/cl-components.js";

const postListStyle = theme => ({
    itemIcon: {
        width: "35px",
        height: "35px",
        float: "center",
        textAlign: "center",
        verticalAlign: "middle",
        backgroundColor: roseColor,
        color: 'white'
    },
    itemIcon: {
        width: "35px",
        height: "35px",
        float: "center",
        textAlign: "center",
        verticalAlign: "middle",
        backgroundColor: roseColor,
        color: 'white'
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
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

export default postListStyle;