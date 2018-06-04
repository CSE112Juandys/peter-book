
import { card, boxShadow, roseColor, grayColor, defaultFont } from "assets/jss/cl-components.js";

const profilePaperStyle = theme => ({
    profile: {
        marginTop: "20px",
        marginBottom: "20px",
        textAlign: "center",
    },
    profileMenu: {
        float: 'left',
    },
    profileHeader: {
        display: "inline-block",
        width: "100%",
        padding: "0px"
    },
    profileAvatar: {
        width: "130px",
        height: "130px",
        margin: "5px auto 0",
        borderRadius: "50%",
        overflow: "hidden",
        ...boxShadow
    },
    profileImg: {
        width: "100%",
        height: "auto",
        verticalAlign: "middle",
        border: "0"
    },
    profileTextAlign: {
        textAlign: "center"
    },
    profileSubtitle: {
        color: grayColor,
        ...defaultFont,
        fontSize: "1em",
        textTransform: "uppercase",
        marginTop: "5px",
        marginBottom: "5px"
    },
    profileTitle: {
        color: grayColor,
        ...defaultFont,
        fontSize: "1.3em",
        marginTop: "10px",
        marginBottom: "10px"
    },
    profileDescription: {
        ...defaultFont,
        padding: "15px 20px",
        margin: "0 0 10px"
    },
    profileActions: {
        height: "auto",
        display: "inline"
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
});

export default profilePaperStyle;