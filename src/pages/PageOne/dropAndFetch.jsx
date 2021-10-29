import React, { useState } from "react";
import DropZone from "./dropZone";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import css from "../../Styles/index.module.less";
import Alert from "../../components/alertInFormat";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * Three DropZones and Upload button to fetch pddl to server
 * @param {function} props onStore function to send file to pageFour
 * @param {function} props onClick function to go back to home
 * @param {string} props url argument to pass to backend
 * @returns
 */
export default function DropAndFetch({ onStore, onClick, newURL }) {
  const [dataFiles, setDataFiles] = useState({});
  const [showAlert, setAlert] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const dragsAndDrops = [
    {
      name: "Domain",
      fileType: ".pddl",
      desc: "for predictes and actions",
    },
    {
      name: "Problem",
      fileType: ".pddl",
      desc: "for objects, initial state and goal",
    },
    {
      name: "Animation",
      fileType: ".pddl",
      desc: "object representations",
    },
  ];

  const uploadPDDL = async (files) => {
    const formData = new FormData();
    for (const name in files) {
      formData.append(name, files[name]);
    }

    try {
      setLoading(true);
      const resp = await fetch(
        "https://planimation.planning.domains/upload/pddl",
        {
          //"http://127.0.0.1:8000/upload/pddl" On local server
          method: "POST", //DO NOT use headers
          body: formData, // Dataformat
        }
      );
      const data = await resp.json();
      const txt = JSON.stringify(data);
      onStore(txt);
    } catch (error) {
      console.log(error);
      setAlert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetAlert = () => {
    setAlert("");
  };

  const handleSubmit = () => {
    //Control check for files
    if (newURL.lenght > 1) {
      handleFileLoad("url", newURL);
    }
    if (
      "domain" in dataFiles &&
      "problem" in dataFiles &&
      "animation" in dataFiles
    ) {
      uploadPDDL(dataFiles);
    } else {
      console.log("Some files are missing");
      setAlert("Some files are missing");
    }
  };

  const handleFileLoad = (name, file) => {
    dataFiles[name.toLowerCase()] = file;
  };

  return (
    <React.Fragment>
      <div className={css.dropareaBox}>
        <div>
          {dragsAndDrops.map((drag) => (
            <DropZone
              key={drag.name}
              name={drag.name}
              desc={drag.desc}
              fileType={drag.fileType}
              onFileLoad={handleFileLoad}
            />
          ))}
          {loading && <div className={css.loadingBox} />}
        </div>
        <div>
          <div className={css.buttonBox}>
            <Button
              variant="contained"
              color="default"
              onClick={() => onClick()}
            >
              Cancel
            </Button>
            <div className={css.wrapper}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon />}
                onClick={handleSubmit}
                disabled={loading}
              >
                Upload Files
              </Button>
              {loading && (
                <CircularProgress size={24} className={css.loading} />
              )}
            </div>
          </div>
        </div>
        <Alert
          open={showAlert.length > 1 ? true : false}
          reset={handleResetAlert}
          severity="warning"
        >
          {showAlert}
        </Alert>
      </div>
    </React.Fragment>
  );
}
