import React from 'react';
import { Menu, MenuItem, withStyles, Card, CardHeader, Avatar, GridList, GridListTile, CardContent, Divider } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';


import gridCardStyle from 'assets/jss/cl-components/gridCardStyle';

class GridCard extends React.Component {

    state = { anchorEl : null};

    handleMenuClick = event => {
        this.setState({
          anchorEl: event.currentTarget,
        });
    };
    
    handleMenuClose = () => {
        this.setState({
          anchorEl: null,
        });
    };

    render() {

        const { classes, icon, title, photos } = this.props;
        const { anchorEl } = this.state;

        const bull = <span className={classes.bullet}>•</span>;

        const avatar =  <Avatar className={classes.whiteIcon}>
                            {icon}
                        </Avatar>

        const grid =    <GridList cellHeight={100} className={classes.gridList} cols={3}>
                            {photos.map((photo) => {
                                return(
                                <GridListTile key={photo.img} cols={1}>
                                    <img src={photo.img} alt={photo.title} />
                                </GridListTile>);
                            })}
                        </GridList>

        return(
            <div className={classes.fullWidth}>
                <Card className={classes.card}>
                    <CardHeader avatar={avatar}
                                title={`${title} • ${photos.length}`} />
                    <CardContent className={classes.cardContent}>
                        <div>
                            {grid}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(gridCardStyle)(GridCard);