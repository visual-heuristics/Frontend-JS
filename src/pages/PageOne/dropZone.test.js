import React from 'react';
import ReactDOM from 'react-dom';
import DropZone from './dropZone';


it("Renders Correctly ", () => {
    const div = document.createElement("div");
    ReactDOM.render(<DropZone
    />, div);
    ReactDOM.unmountComponentAtNode(div);
});
