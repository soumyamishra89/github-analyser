import React from 'react';
import { LoggedStatus, AppState } from '../types';
import { connect } from 'react-redux';
import GithubRepoTableComponent from '../components/GithubRepoTableComponent';
import { mapGithubDispatchToProps } from '../redux/dispatchMapping';

interface Props {
    loggedStatus: LoggedStatus,
    loadGithubRepos: () => void,
}

class HomePage extends React.PureComponent<Props> {
    componentDidUpdate(prevProps: Props) {
        if (prevProps.loggedStatus === LoggedStatus.LOGGED_OUT && this.props.loggedStatus === LoggedStatus.LOGGED_IN) {
            this.props.loadGithubRepos();
        }
    }

    render() {
        return (
            <div className="page">
            {this.props.loggedStatus === LoggedStatus.LOGGED_OUT ? <a className="btn btn-social btn-github" href="/auth/github-login">
                <span className="fa fa-github"></span>
                {"Login with Github"}</a> :    
                <GithubRepoTableComponent />
                }
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    loggedStatus: state.loggedStatus
});

export default connect(mapStateToProps, mapGithubDispatchToProps)(HomePage);