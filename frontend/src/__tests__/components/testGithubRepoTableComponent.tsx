import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import {GithubRepoTableComponent} from '../../components/GithubRepoTableComponent';
import mockData from '../../__mock__/mockData.json';
import { GithubRepo } from '../../types';

const createProps = () => ({
    githubRepos: (mockData.githubInfo as GithubRepo[])
})

describe("Test GithubRepoTableComponent rendering", () => {
    let props;
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        props = createProps();
        
        wrapper = shallow(<GithubRepoTableComponent {...props}/>);
    });

    it("Snapshot test with data", () => {
        expect(wrapper).toMatchSnapshot("With data");
    });

    it("Snapshot test without data", () => {
        wrapper.setProps({githubRepos: []});
        expect(wrapper).toMatchSnapshot("Without data");
    });
})