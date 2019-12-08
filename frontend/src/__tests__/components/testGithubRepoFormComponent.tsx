import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import {GithubRepoFormComponent} from '../../components/GithubRepoFormComponent';

const createProps = () => ({
    isGithubReposLoading: false,
    loadGithubRepos: jest.fn()
})

describe("Test GithubRepoFormComponent rendering", () => {
    let props;
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        props = createProps();
        
        wrapper = shallow(<GithubRepoFormComponent {...props}/>);
    });

    it("Snapshot test without loading", () => {
        expect(wrapper).toMatchSnapshot("Without Loading");
    });

    it("Snapshot test with loading", () => {
        wrapper.setState({loading: true});
        expect(wrapper).toMatchSnapshot("With Loading");
    });
})