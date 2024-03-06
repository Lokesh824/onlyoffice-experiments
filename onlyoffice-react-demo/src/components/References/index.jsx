import React, { useState } from "react";
import { Menu } from "antd";
import {
  MenuOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  // getItem("Navigation One", "sub1", null, [
  //   getItem(
  //     "Item 1",
  //     "g1",
  //     null,
  //     [getItem("Option 1", "1"), getItem("Option 2", "2")],
  //     "group"
  //   ),
  //   getItem(
  //     "Item 2",
  //     "g2",
  //     null,
  //     [getItem("Option 3", "3"), getItem("Option 4", "4")],
  //     "group"
  //   ),
  // ]),
  // getItem("Navigation Two", "sub2", null, [
  //   getItem("Option 5", "5"),
  //   getItem("Option 6", "6"),
  //   getItem("Submenu", "sub3", null, [
  //     getItem("Option 7", "7"),
  //     getItem("Option 8", "8"),
  //   ]),
  // ]),
  // {
  //   type: "divider",
  // },

  getItem(
    "",
    "grp",
    null,
    [
      getItem(
        "https://www.cdisc.org/standards/foundational/sdtm",
        "Study_Objectives"
      ),
      getItem(
        "https://blog.formedix.com/all-you-need-to-know-about-sdtmn",
        "Study_Design"
      ),
      getItem(
        "https://blog.eglifesciences.com/an-introduction-to-the-standard-data-tabulation-model-sdtm",
        "Background_and_Rationale"
      ),
      getItem(
        "https://www.cdisc.org/standards/foundational/sdtm/sdtm-v2-0",
        "Inclusion_Exclusion_Criteria"
      ),
    ],
    "group"
  ),
];
function Reference(props) {
  const [showExpanded, setShowExpanded] = useState(true);
  const onClick = (e) => {
    console.log("click ", e);
    props.onmenuclick(e);
  };
  return (
    <>
      {showExpanded ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
              fontSize: "large",
              fontWeight: 600,
            }}
          >
            <span>
              {" "}
              <ExclamationCircleOutlined />
              &nbsp;Citations
            </span>
            <span
              onClick={() => {
                setShowExpanded(!showExpanded);
                props.refHide();
              }}
              style={{ marginLeft: "auto" }}
            >
              <RightCircleOutlined />
            </span>
          </div>
          <Menu
            onClick={onClick}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </>
      ) : (
        <div
          onClick={() => {
            setShowExpanded(!showExpanded);
            props.refHide();
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "x-large",
            color: "#446995",
            marginTop: "20px",
          }}
        >
          <ExclamationCircleOutlined />
        </div>
      )}
    </>
  );
}

export default Reference;
