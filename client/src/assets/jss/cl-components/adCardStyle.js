import {
    card,
    defaultFont,
    grayColor,
    roseColor
} from "assets/jss/cl-components.js";

const adCardStyle = theme => ({
    card: {
        minWidth: '300px',
        maxWidth: '500px',
        ...card
    },
    fullWidth: {
        textAlign: 'center',
        width: '100%',
    },
});

export default adCardStyle