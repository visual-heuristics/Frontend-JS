import React from 'react';
import ReactDOM, {render, unmountComponentAtNode} from 'react-dom';
import DropAndFetch from './dropAndFetch';
import { act } from "react-dom/test-utils";
import { constant } from 'lodash';




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
        //Renders dropzone icon
        expect(container.querySelector("svg")).toBeInTheDocument();
    });
})

describe('pageOne dropAndFetch: fetch correctly', () =>{
    let container = null;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
        //fetch.resetMocks();
    });
      
    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });


    it('UploadPDDL fetch works correctly', async () =>{
        const fakevfg = {vfg: 'correct'};
        global.fetch = jest.fn(() =>
        Promise.resolve({
                json: () => Promise.resolve(fakevfg)
            })
        );
        
        React.useState = jest.fn()
        .mockReturnValueOnce([{domain: '',problem:'',animation:''},{}])
        .mockReturnValueOnce([false, ()=>{}])
        .mockReturnValueOnce([false, ()=>{}]);

        const handleStore = (content) => {
            expect(content).toMatch(JSON.stringify({vfg: 'correct'}));
        }

        // Use the asynchronous version of act to apply resolved promises
        await act(async () => {
            render(<DropAndFetch onStore={handleStore} newURL={''}/>, container);  
        });

        container.querySelector("button[class~='MuiButton-containedPrimary']").click();
        global.fetch.mockRestore();
    })
})


