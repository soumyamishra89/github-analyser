import React from 'react';
import api from '../services/remote/api';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { mapGithubDispatchToProps } from '../redux/dispatchMapping';
import { AppState } from '../types';

interface Props {
    loadGithubRepos: () => void,
    isGithubReposLoading: boolean;
}

interface State {
    owner: string,
    reponame: string,
    validated?: boolean,
    loading?: boolean
} 

export class GithubRepoFormComponent extends React.PureComponent<Props, State> {

    state: State = {
        owner: '',
        reponame: '',
        loading: false
    };

    componentDidUpdate(prevProps: Props) {
        if (prevProps.isGithubReposLoading === true && this.props.isGithubReposLoading === false) {
            this.setState({loading: false})
        }
    }

    postGithubInfo = async (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const { owner, reponame } = this.state;
            if (owner && reponame) {
                this.setState({loading: true});
                const resp = await api.postGithubInfo(owner, reponame);
                if (resp.status === 202) {
                    this.props.loadGithubRepos();
                } else {
                    this.setState({loading: false});
                    alert('Invalid github repo');
                }
            }
        }

        this.setState({validated: true});
    }

    onOwnerChange = (event: any) => {
        event.preventDefault();
        const value = event.target.value;
        this.setState({owner: value, validated: false});
    }

    onRepoChange = (event: any) => {
        event.preventDefault();
        const value = event.target.value;
        this.setState({reponame: value, validated: false});
    }

    render() {     
        
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.postGithubInfo}>
                <Form.Group>
                    <Form.Row>
                        <Col >
                            <Form.Control placeholder="Owner" required onChange={this.onOwnerChange} value={this.state.owner}/>
                        </Col>
                        <Col>
                            <Form.Control placeholder="Repo name" required onChange={this.onRepoChange} value={this.state.reponame}/>
                        </Col>
                        <Col>
                        <Button variant={this.state.loading ? "secondary" : "primary"} type="submit" className="position-relative d-flex justify-content-center align-items-center" disabled={this.state.loading}>
                            {this.state.loading && <div className="position-absolute button-loader"></div>}
                            Submit
                        </Button>
                        </Col>
                    </Form.Row>

                </Form.Group>
                <div className="d-flex justify-content-center">
                
                </div>
            </Form>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    isGithubReposLoading: state.isGithubReposLoading
});

export default connect(mapStateToProps, mapGithubDispatchToProps)(GithubRepoFormComponent);