import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { Edit } from '@material-ui/icons';
import { withStyles, Button } from '@material-ui/core';
import cx from 'classnames';
import WallView from 'views/WallView';
import { Sidebar, Header } from 'components';
import { userRoutes, friendRoutes, user } from 'routes/friends';
import { generateUsers, generatePosts } from 'api/mockAPI';
import appStyle from 'assets/jss/cl-components/appStyle';

const posts = generatePosts(user, 50);

const switchRoutes = (
    <Switch>
        {userRoutes.concat(friendRoutes).map((prop, key) => {
            if (prop.redirect) {
                return <Redirect from={prop.path} 
                                 to={prop.to} 
                                 key={key} />;
            }
            else if (prop.util) {
                return <Route path={prop.path}
                              render={() => <WallView posts={posts} owner={user} user={user}/>}
                              key={key}/>
            }
            const friendPosts = posts.filter((post) => {
                return ((prop.owner.firstName === post.author.firstName && 
                         prop.owner.lastName === post.author.lastName) ||
                        (prop.owner.firstName === post.recipient.firstName &&
                         prop.owner.lastName === post.recipient.lastName));
            });
            return <Route path={prop.path}
                          render={() => <WallView posts={friendPosts} owner={prop.owner} user={user}/>}
                          key={key}/>
        })}
    </Switch>    
)

/*
 *  App Class Component
 */
class App extends React.Component {
    state = { open      : true,
              openModal : false, };

    handleModalOpen = () => {
        this.setState({ openModal : true });
    }

    handleModalClose = () => {
        this.setState({ openModal : false });
    }

    handleDrawerToggle = () => {
        this.setState({ open : !this.state.open });
    }

    componentDidMount() {
        if(navigator.platform.indexOf('Win') > -1){
            // eslint-disable-next-line
            const ps = new PerfectScrollbar(this.refs.mainPanel);
        }
    }
    
    componentDidUpdate() {
        this.refs.mainPanel.scrollTop = 0;
    }

    render() {

        const { classes, ...rest } = this.props;

        return (
            <div className={classes.wrapper}>
                <Sidebar open={this.state.open}
                         logo={'cl-components'}
                         friendRoutes={friendRoutes}
                         utilRoutes={userRoutes}
                         user={user}
                         handleDrawerToggle={this.handleDrawerToggle}
                         {...rest}/>
                <div className={cx(classes.mainPanel, this.state.open && classes.mainPanelShift)} ref="mainPanel">
                    <div className={classes.content}>
                        <div className={classes.container}>
                            {switchRoutes}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(App);

