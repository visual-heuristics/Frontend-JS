import React from "react";
import css from "../../Styles/index.module.less";
import { DropzoneArea } from "material-ui-dropzone";
import { useState } from "react";

/**
 * Wrapper for DropzoneArea
 * @param {string} props name filename id
 * @param {string} props desc text description
 * @param {string} props fileType document extension
 * @param {function} props onFileLoad callback
 * @returns Dropzone with title and inner text
 */
export default function DropZone({ name, desc, fileType, onFileLoad }) {
  const [files, setFile] = useState([]);

  const onDrop = (file) => {
    //Format checks
    if (file.length !== 1) {
      alert("More than one file, retry");
    }
    console.log(file);

    if (file[0].name.endsWith(fileType)) {
      setFile([file]);
      file[0].text().then((result) => {
        onFileLoad(name, result);
      });
    } else {
      console.log("Wrong file type");
      alert("Wrong file type");
    }
  };
  // To change the inner text when dropping a file
  let dropText =
    files.length > 0
      ? files[0].path
      : "Drag and drop " + name?.toLowerCase() + fileType + " here or click";

  return (
    <div className={css.dropzoneBox}>
      <div>
        <div className={css.fileTitle}>
          <b>{name} File </b>
        </div>
        <div className={css.fileDesc}>{desc}</div>
      </div>
      <DropzoneArea
        acceptedFiles={[".pddl"]}
        filesLimit={1}
        onDrop={(file) => onDrop(file)}
        dropzoneText={dropText}
        className={css.dropzoneAreaBox}
        // maxWidth={'320px'}
      />
    </div>
  );
}
