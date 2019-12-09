import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { ReadmeModal } from '../../components/GithubRepoTableComponent';

const createProps = () => ({
    onHide: jest.fn(),
    readme: `IyBHaXRodWItYW5hbHlzZXINCmh0dHBzOi8vZ2l0aHViLmNvbS9zb3VteWFtaXNocmE4OS9naXRodWItYW5hbHlzZXINCkEgZ2l0aHViIHJlcG9zaXRvcnkgYW5hbHlzZXIgd2hpY2ggdGFrZXMgaW4gb3duZXIgYW5kIHJlcG8gbmFtZSwgYW5kIHByb3ZpZGVzIGluZm8gYWJvdXQgdGhlIHJlcG9zaXRvcnkuIEl0IHdvcmtzIG9uIHB1YmxpYyByZXBvc2l0b3JpZXMgb25seQ==`
})

describe("Test ReadmeModal rendering", () => {
    let props;
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        props = createProps();
        
        wrapper = shallow(<ReadmeModal {...props}/>);
    });
    
    it("Snapshot test rendering readme modal", () => {
        expect(wrapper).toMatchSnapshot("Rendering readme modal");
    });
});