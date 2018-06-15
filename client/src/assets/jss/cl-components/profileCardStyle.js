
import { card, boxShadow, roseColor, grayColor, defaultFont } from "assets/jss/cl-components.js";

const profileCardStyle = theme => ({
    card: {
        textAlign: "center",
        maxWidth: '400px',
        minWidth: '300px',
        textAlign: 'left',
        ...card
    },
    cardHeader: {
        display: "inline-block",
        width: "100%",
        padding: "0px"
    },
    cardAvatar: {
        width: "130px",
        height: "130px",
        maxWidth : "130px",
        maxHeight : '130px',
        marginBottom: '10px',
        borderRadius: "50%",
        ...boxShadow
    },
    img: {
        width: "100%",
        height: "auto",
        verticalAlign: "middle",
        border: "0"
    },
    textAlign: {
        textAlign: "center"
    },
    cardSubtitle: {
        color: grayColor,
        ...defaultFont,
        fontSize: "1em",
        textTransform: "uppercase",
        marginTop: "10px",
        marginBottom: "10px"
    },
    cardTitle: {
        ...defaultFont,
        fontSize: "1.3em",
        marginTop: "10px",
        marginBottom: "10px"
    },
    cardDescription: {
        ...defaultFont,
        padding: "15px 20px",
        margin: "0 0 10px"
    },
    cardActions: {
        height: "auto",
        display: "inline"
    },
    profileTitle: {
        color: grayColor,
        ...defaultFont,
        fontSize: "1.3em",
        marginTop: "10px",
        marginBottom: "10px"
    },
    typography: {
        margin: theme.spacing.unit * 2,
    },
    whiteFont: {
        color: 'white'
    },
    whiteIcon: {
        color: 'white',
        backgroundColor: roseColor
    },
    roseIcon: {
        color: roseColor,
        backgroundColor: 'white'
    },
    fullWidth: {
        textAlign: 'center',
        width: '100%',
    },
    media: {
        height: '200px',
    },
});

export default profileCardStyle;