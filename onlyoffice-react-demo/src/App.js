import React, { useState, useEffect, useRef } from "react";
import { DocumentEditor } from "@onlyoffice/document-editor-react";
import axios from "axios";
import DocumentMenuBar from "./components/Menubar/doc-menubar";
import { Button, Modal, Input, Select, Col, Row } from "antd";
import SectionsList from "./components/SectionsMenu";
import Reference from "./components/References";
import { TextEditor } from "./components/texteditor";
import Navbar from "./components/Navbar";
import './App.css';
import './scss/style.scss'

var onDocumentReady = function (event) {
  console.log("Document is loaded");
  fixSize();
};

var fixSize = function () {
  var wrapEl = document.getElementsByClassName("form");
  if (wrapEl.length) {
    wrapEl[0].style.height = window.screen.availHeight + "px";
    window.scrollTo(0, -1);
    wrapEl[0].style.height = window.innerHeight + "px";
  }
};

var onLoadComponentError = function (errorCode, errorDescription) {
  switch (errorCode) {
    case -1: // Unknown error loading component
      console.log(errorDescription);
      break;

    case -2: // Error load DocsAPI from http://documentserver/
      console.log(errorDescription);
      break;

    case -3: // DocsAPI is not defined
      console.log(errorDescription);
      break;
  }
};

export default function App() {
  const [config, setConfig] = useState(null);
  const [sectionShown, setSectionShown] = useState(true);
  const [refShown, setRefShown] = useState(true);
  const [newFileData, setNewFileData] = useState(null);
  const [isMetaView, setIsMetaView] = useState(true);
  useEffect(() => {
    fetchConfig("endsem_ML_regular_AK.docx");
    const handleResize = () => fixSize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const fetchConfig = async (filename) => {
    try {
      let baseURL = `http://localhost:8000/edit-data?filename=${filename}&directUrl=false`;
      // Replace 'your_backend_endpoint' with the actual endpoint from which you want to fetch the config
      const response = await axios.get(baseURL);
      const parsedConfig = JSON.parse(response.data["cfg"]);
      console.log(parsedConfig);
      setConfig(parsedConfig);
    } catch (error) {
      console.error("Failed to fetch config from backend:", error);
    }
  };

  //Creates the new documents for each sections.
  const createNewDoc = async (filename) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/createwithcontent?fileName=${filename}&fileExt=docx`
      );
      const createdFile = response.data;
      console.log("created file information -", createdFile, createdFile.urls);
      setNewFileData(createdFile);
      fetchConfig(Object.keys(createdFile.urls)[0]);
    } catch (error) {
      console.error("Failed to fetch config from backend:", error);
    }
  };
  const sectionsHide = () => {
    console.log("Sections hide");
    setSectionShown(!sectionShown);
  };
  const refHide = () => {
    console.log("Ref hide");
    setRefShown(!refShown);
  };
  const menuClick = (e) => {
    console.log("e", e);
    createNewDoc(e.key);
  };
  const handleMetaToggle = (e) => {
    setIsMetaView(e);
    console.log("Metadata toggle", e);
  };
  if (!config) {
    return <div>Loading...</div>;
  } else {
    console.log({ config });
    return (
      <>
        <Navbar />
        <div className="custom-container">{/* <DocumentMenuBar /> */}</div>

        <Row>
          <Col span={sectionShown ? 4 : 1}>
            <SectionsList
              onmenuclick={menuClick}
              onSectionHide={sectionsHide}
              showMeta={handleMetaToggle}
            />
          </Col>
          {isMetaView ? (
            <Col span={sectionShown ? 16 : 23}>
              <p>Showing metadata</p>
            </Col>
          ) : (
            <Col
              span={
                sectionShown && refShown
                  ? 16
                  : !sectionShown && !refShown
                  ? 22
                  : 19
              }
            >
              <div className="editor-container">
                <div className="editor-window">
                  <div className="form">
                    <DocumentEditor
                      id="docxEditor"
                      documentServerUrl="http://localhost:80/"
                      config={config}
                      events_onDocumentReady={onDocumentReady}
                      onLoadComponentError={onLoadComponentError}
                    />
                  </div>
                </div>
              </div>
            </Col>
          )}
          {!isMetaView && (
            <Col span={refShown ? 4 : 1}>
              <Reference refHide={refHide} />
            </Col>
          )}
        </Row>
        {/* <TextEditor /> */}
      </>
    );
  }
}
