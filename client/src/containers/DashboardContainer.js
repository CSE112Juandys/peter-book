import { connect } from 'react-redux';
import { updateFirebaseStore } from 'actions/updateFirebaseStoreActions';
import Dashboard from 'layouts/Dashboard';

function mapStateToProps(state) {
    return {
        firebaseStore : state.firebaseStore
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onUpdateFirebaseStore : (dataToAdd) => dispatch(updateFirebaseStore(dataToAdd))
    };
}

const dashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default dashboardContainer;