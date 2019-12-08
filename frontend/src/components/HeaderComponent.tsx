import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../types';
import PackageJson from '../../package.json';
import api from '../services/remote/api';
import { connect } from 'react-redux';
import GithubRepoFormComponent from './GithubRepoFormComponent';

interface Props {
    pingLoginStatus: () => void
}
class HeaderComponent extends React.PureComponent<Props, any> {

    componentDidMount() {
       this.props.pingLoginStatus();
    }

    render() {     
        
        return(
            <Navbar fixed="top" bg="dark" variant="dark" expand="lg">                   
                <Navbar.Brand>
                    Github Analyser <sup>{PackageJson.version}</sup>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="mr-auto" />   
                    <GithubRepoFormComponent />
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, any>) => ({
    pingLoginStatus: () => dispatch(api.pingLoginStatus())
})

export default connect(null, mapDispatchToProps)(HeaderComponent);