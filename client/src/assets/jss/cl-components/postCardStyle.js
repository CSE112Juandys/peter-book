import {
    card,
    defaultFont,
    cardActions,
    grayColor,
    roseColor
} from "assets/jss/cl-components.js";

const postCardStyle = theme => ({
    card: {
        textAlign: 'left',
        minWidth: '300px',
        maxWidth: '500px',
        ...card
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
    fullWidth: {
        textAlign: 'center',
        width: '100%',
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
    actions: {
        display: 'flex',
    },
    commentField : {
        margin: '10px',
        width: '100%'
    },
    avatar: {
        backgroundColor: roseColor,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

export default postCardStyle;