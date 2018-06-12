import React from 'react';
import { Provider } from 'react-redux';
import store from 'store/configureStore';
import DashboardContainer from 'containers/DashboardContainer';
import Dashboard from 'layouts/Dashboard';

const main = ({...props}) => {
    console.log(props);
    const { location, match, history } = props;

    return(
        <Provider store={store}>
            <Dashboard location={location} match={match} history={history}/>
        </Provider>
    );
}
const indexRoutes = [{ path: '/', component: main }];

export default indexRoutes;