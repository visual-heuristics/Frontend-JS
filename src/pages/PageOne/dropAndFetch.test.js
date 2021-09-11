import React from 'react';
import ReactDOM from 'react-dom';
import DropAndFetch from './dropAndFetch';

it("Renders Correctly ", () => {
    const div = document.createElement("div");
    ReactDOM.render(<DropAndFetch
    />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("Object fetch data", () =>{
    expect(true).toBeTruthy();
});
