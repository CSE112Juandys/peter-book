import React from 'react'
import { MoreVert } from '@material-ui/icons';
import { Card, CardContent, Typography, withStyles, CardHeader, IconButton, Divider, Menu, MenuItem } from '@material-ui/core';

import AdCardStyle from 'assets/jss/cl-components/adCardStyle';

class AdCard extends React.Component {

    state = { anchorEl : null };

    handleMenuClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes, ...rest } = this.props;
        const { anchorEl } = this.state;

        const menuButton =  <div >
                                <IconButton aria-haspopup="true" onClick={this.handleMenuClick}>
                                    <MoreVert />
                                </IconButton>
                                <Menu id="menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={this.handleMenuClose}
                                    >
                                    <MenuItem onClick={this.handleMenuClose}>Hide</MenuItem>
                                    <MenuItem onClick={this.handleMenuClose}>Don't Like the Ads?</MenuItem>
                                </Menu>
                            </div>

        return (
            <div className={classes.fullWidth}>
                <Card className={classes.card}>
                    <CardHeader subheader="Ad"
                                action={ menuButton }
                    />
                    <Divider />
                    <CardContent style={{width:'100%', height:'400px'}}>
                        <script data-cfasync='false' type='text/javascript' src='//p290496.clksite.com/adServe/banners?tid=290496_564395_0'></script>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withStyles(AdCardStyle)(AdCard);