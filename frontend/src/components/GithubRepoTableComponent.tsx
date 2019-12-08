import React from 'react';
import { GithubRepo, AppState } from '../types';
import { Table, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import Markdown from 'react-markdown';

interface Props {
    githubRepos: GithubRepo[]
}

interface State {
    readmeToShow?: string
}

class GithubRepoTableComponent extends React.PureComponent<Props, State> {

    state: State = {};

    showReadme = (evt: any, readme?: string) => {
        evt.preventDefault();
        if (!readme) {
            alert('No readme to show');
        } else {
            this.setState({readmeToShow: atob(readme)});
        }
    }

    hideReadme = () => {
        this.setState({readmeToShow: undefined});
    }

    render() {
        const { githubRepos } = this.props;
        if (githubRepos.length === 0) {
        return (<div className="d-flex justify-content-center align-item-center">
                Add a repository from github to show analysis
            </div>);
        }
        
        return (
            <>
                <table className="ml-2 mr-2 table table-striped table-bordered table-hover table-layout" >
                    <thead>
                        <tr>
                            <th>Owner</th>
                            <th>Repo name</th>
                            <th>Url</th>
                            <th>Commits</th>
                            <th>Open pull requests</th>
                            <th>Readme</th>
                        </tr>
                    </thead>
                    <tbody>
                        {githubRepos.map((gr, index) => (<tr key={index}>
                            <td>{gr.owner}</td>
                            <td>{gr.name}</td>
                            <td><a href={gr.url}>{gr.url}</a></td>
                            <td>{gr.commits}</td>
                            <td>{gr.openPullRequests}</td>
                            <td><button className="link-button" onClick={(evt: any) => this.showReadme(evt, gr.readme)}>Show Readme</button></td>
                        </tr>))}                    
                    </tbody>
                </table>
                {this.state.readmeToShow && <ReadmeModal onHide={this.hideReadme} readme={this.state.readmeToShow}/>}
            </>
        )
    }
}

interface ReadmeProps {
    onHide: () => void,
    readme: string
}

function ReadmeModal(props: ReadmeProps) {
    return (
        <Modal
            show={true}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className="pl-2 pr-2">
                <Markdown source={props.readme} />
            </div>
        </Modal>
    )
}

const mapStateToProps = (state: AppState) => ({
    githubRepos: state.githubRepos
});

export default connect(mapStateToProps)(GithubRepoTableComponent);