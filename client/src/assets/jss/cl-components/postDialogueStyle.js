import {
    card,
    defaultFont,
    cardActions,
    grayColor,
    roseColor
} from "assets/jss/cl-components";

const postDialogueStyle = theme => ({
    dialog: {
        minWidth: '600px',
    },
    expansionPanel: {
        boxShadow: 'none'
    },
    margin: {
        margin: theme.spacing.unit * 2,
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
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 300,
      },
})

export default postDialogueStyle;