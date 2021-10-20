import React from 'react';
import ReactDOM, {render, unmountComponentAtNode} from 'react-dom';
import PageTwo from './index';

describe('pageTwo: rendering correctly', () =>{
    
    let container = null;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
    });
      
    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });
    // Unit test
    it("DropAndFetch component renders correctly ", () => {
        ReactDOM.render(<PageTwo
        />, container);
        expect(container.textContent).toMatch('Drag and drop a file here');
    });
})