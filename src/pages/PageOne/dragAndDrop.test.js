import React from 'react';
import ReactDOM from 'react-dom';
import DragAndDrop from './DragAndDrop';


it("Renders Correctly ", () => {
    const div = document.createElement("div");
    ReactDOM.render(<DragAndDrop
    />, div);
    ReactDOM.unmountComponentAtNode(div);
});
