import React from "react";
import css from "./index.module.less";
import { DropzoneArea } from "material-ui-dropzone";
import Typography from "@material-ui/core/Typography";

class DropZone extends React.Component {
  state = {
    files: [],
  };

  onDrop = (file) => {
    if (file.length !== 1) {
      alert("More than one file, retry");
    }
    console.log(file);

    if (file[0].name.endsWith(this.props.fileType)) {
      //console.log(this.state.files);
      this.setState({ files: file });
      //console.log(this.state.files);
      file[0].text().then((result) => {
        this.props.onFileLoad(this.props.name, result);
      });
    } else {
      console.log("Wrong file type");
      alert("Wrong file type");
    }
  };

  render() {
    let dropText =
      this.state.files.length > 0
        ? this.state.files[0].name
        : "Drag and drop " +
          this.props.name.toLowerCase() +
          this.props.fileType +
          " here or click";

    return (
      <div className={css.dropzoneBox}>
        <Typography
          variant="h6"
          align="center"
          color="textPrimary"
          component="p"
        >
          <b>{this.props.name} File </b>
          <br />
          {this.props.desc}
        </Typography>
        <DropzoneArea
          acceptedFiles={[".pddl"]}
          filesLimit={1}
          onDrop={(file) => this.onDrop(file)}
          dropzoneText={dropText}
        />
      </div>
    );
  }
}

export default DropZone;
