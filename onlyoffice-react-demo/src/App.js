import React, { useState, useEffect, useRef } from "react";
import { DocumentEditor } from "@onlyoffice/document-editor-react";
import axios from "axios";
import DocumentMenuBar from "./components/Menubar/doc-menubar";
import { Button, Modal, Input, Select, Col, Row } from "antd";
import SectionsList from "./components/SectionsMenu";
import Reference from "./components/References";
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

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        // Replace 'your_backend_endpoint' with the actual endpoint from which you want to fetch the config
        const response = await axios.get(
          "http://localhost:8000/edit-data?filename=file-sample_500kB.docx&directUrl=false"
        );
        const parsedConfig = JSON.parse(response.data["cfg"]);

        setConfig(parsedConfig);
      } catch (error) {
        console.error("Failed to fetch config from backend:", error);
      }
    };

    fetchConfig();

    const handleResize = () => fixSize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const sectionsHide = () => {
    console.log("Sections hide");
    setSectionShown(!sectionShown);
  };

  if (!config) {
    return <div>Loading...</div>;
  } else {
    console.log({ config });
    return (
      <>
        <div className="custom-container">{/* <DocumentMenuBar /> */}</div>

        <Row>
          <Col span={sectionShown ? 4 : 1}>
            <SectionsList onSectionHide={sectionsHide} />
          </Col>
          {/* <Col span={1}>sad</Col> */}
          <Col span={sectionShown ? 16 : 19}>
            <div className="editor-container">
              <div className="editor-window">
                <div className="form">
                  <DocumentEditor
                    id="docxEditor"
                    documentServerUrl="http://localhost:80/"
                    // height="0%"
                    config={{
                      type: "desktop",
                      documentType: "word",
                      document: {
                        title: "endsem_ML_regular_AK.docx",
                        url: "http://host.docker.internal:8000/download?fileName=endsem_ML_regular_AK.docx&userAddress=127.0.0.1",
                        directUrl: "",
                        fileType: "docx",
                        key: "-8095245843742411912",
                        info: {
                          owner: "John Smith",
                          uploaded: "2024-02-22 18:24:38",
                          favorite: null,
                        },
                        permissions: {
                          comment: true,
                          copy: true,
                          download: true,
                          edit: true,
                          print: true,
                          fillForms: true,
                          modifyFilter: true,
                          modifyContentControl: true,
                          review: true,
                          chat: true,
                          reviewGroups: null,
                          commentGroups: {},
                          userInfoGroups: null,
                          protect: true,
                        },
                        referenceData: {
                          instanceId: "http://localhost:8000",
                          fileKey:
                            '{"fileName": "endsem_ML_regular_AK.docx", "userAddress": "127.0.0.1"}',
                        },
                      },
                      editorConfig: {
                        actionLink: null,
                        mode: "edit",
                        lang: "en",
                        callbackUrl:
                          "http://host.docker.internal:8000/track?filename=endsem_ML_regular_AK.docx&userAddress=127.0.0.1",
                        coEditing: null,
                        createUrl:
                          "http://localhost:8000/create?fileType=desktop",
                        templates: [
                          {
                            image: "",
                            title: "Blank",
                            url: "http://localhost:8000/create?fileType=desktop",
                          },
                          {
                            image:
                              "http://host.docker.internal:8000/static/images/file_docx.svg",
                            title: "With sample content",
                            url: "http://localhost:8000/create?fileType=desktop&sample=true",
                          },
                        ],
                        user: {
                          id: "uid-1",
                          name: "John Smith",
                          group: "",
                        },
                        embedded: {
                          saveUrl:
                            "http://localhost:8000/download?fileName=endsem_ML_regular_AK.docx",
                          embedUrl:
                            "http://localhost:8000/download?fileName=endsem_ML_regular_AK.docx",
                          shareUrl:
                            "http://localhost:8000/download?fileName=endsem_ML_regular_AK.docx",
                          toolbarDocked: "top",
                        },
                        customization: {
                          about: true,
                          comments: true,
                          feedback: true,
                          forcesave: false,
                          submitForm: false,
                          goback: {
                            url: "http://localhost:8000",
                          },
                          compactHeader: true,
                          compactToolbar: true,
                          uiTheme: "theme-light",
                        },
                      },
                    }}
                    events_onDocumentReady={onDocumentReady}
                    onLoadComponentError={onLoadComponentError}
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col span={4}><Reference /></Col>
        </Row>
      </>
    );
  }
}
