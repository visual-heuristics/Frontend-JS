import React, { Component } from "react";
import "./styles.css";

class DragAndDrop extends React.Component {
  /*
    dropAnimation.addEventListener('dragover', (event) => {
        event.stopPropagation();
        event.preventDefault();
        // Style the drag-and-drop as a "copy file" operation.
        event.dataTransfer.dropEffect = 'copy';
    });

    dropAnimation.addEventListener('drop', (event) => {
        event.stopPropagation();
        event.preventDefault();
        dropAnimation.textContent = event.dataTransfer.files[0].name;
        event.dataTransfer.files[0].text().then(result=> data.animation = result);
    });
    */
  render() {
    return (
      <div
        className="drop-area"
        onLoad={() => this.props.handleLoad(this.props.name, this.props.file)}
      >
        {this.props.name}
      </div>
    );
  }
}

export default DragAndDrop;
