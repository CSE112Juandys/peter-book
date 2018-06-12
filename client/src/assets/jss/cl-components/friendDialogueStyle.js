import {
    card,
    defaultFont,
    cardActions,
    grayColor,
    roseColor
} from "assets/jss/cl-components";

const friendDialogueStyle = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        flexBasis: 200,
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
})

export default friendDialogueStyle;