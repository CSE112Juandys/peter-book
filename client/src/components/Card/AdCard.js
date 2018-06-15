import React from 'react'
import { MoreVert } from '@material-ui/icons';
import { Card, CardContent, Typography, withStyles, CardHeader, IconButton, Divider, Menu, MenuItem, CardMedia } from '@material-ui/core';

import AdCardStyle from 'assets/jss/cl-components/adCardStyle';
import { database, storage } from 'fireConfigs/fire';
 
class AdCard extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            image: "",
            company: "",
            text: "",
        }
    }

    componentDidMount = () => {
        this.chooseRandomAd();
    }

    chooseRandomAd = () => {

        // reference to ad database
        database.ref().child("Advertisements").once("value", snapshot => {
    
          // get all the ads, throw them in an array
          var returnArr = [];
          snapshot.forEach(function(snapshot) {
            var item = snapshot
            returnArr.push(item);
          });
    
          // randomly choose an ad from the array
          var chosenAds = returnArr[Math.floor(Math.random()*returnArr.length)];
    
          // parse out the data
          var company = chosenAds.child("Company").val()
          var addText = chosenAds.child("Text").val()
          var dataURL = chosenAds.child("ImageURL").val()
    
        // get the image hosting URL
        storage.ref().child(dataURL).getDownloadURL().then( (url) => {
    
          // Save add object to state
          this.setState({image: url,
                         company: company,
                         text: addText})
          console.log(this.state)
         })
        })
    };
    

    render() {
        const { classes, ...rest } = this.props;


        return (
            <div className={classes.fullWidth}>
                <Card className={classes.card}>
                    <CardHeader title={this.state.company} />
                    <Divider />
                    <CardMedia image={this.state.image} title="adMedia" style={{height: 0, paddingTop: '56.25%'}}/>
                    <CardContent>
                        {this.state.text}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withStyles(AdCardStyle)(AdCard);