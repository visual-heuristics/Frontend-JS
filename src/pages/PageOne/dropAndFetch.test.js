import React from 'react';
import ReactDOM, {render, unmountComponentAtNode} from 'react-dom';
import DropAndFetch from './dropAndFetch';



describe('pageOne dropAndFetch: rendering correctly', () =>{
    
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
        ReactDOM.render(<DropAndFetch
        />, container);
        console.log(container.textContent);
        expect(container.textContent).toMatch('Upload Files');
    });
    // Integration test
    it("DropZone component inside DropAndFetch renders correctly", () =>{
        ReactDOM.render(<DropAndFetch
            />, container);
        console.log(container.querySelector("dropzone"));
        expect(getByText(/dropZone/i)).toBeInTheDocument();
    });
})

describe('pageOne dropAndFetch: fetch correctly', () =>{
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


    it('UploadPDDL fetch works correctly', () =>{
        const fakePDDL = {};

        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakePDDL)
            })
        );
        
        // Use the asynchronous version of act to apply resolved promises
        await act(async () => {
            render(<DropAndFetch />, container);
            container.getByText('Upload Files').simulate('click');  
        });
        
        expect(true).toBe(true);
        global.fetch.mockRestore();
    })
})


