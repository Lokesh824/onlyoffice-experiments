import React, { useState } from "react";

import { Menu, Switch } from "antd";
import {
  MenuOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  PieChartOutlined,
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
      getItem("Study Objectives", "Study_Objectives"),
      getItem("Study Design", "Study_Design"),
      getItem("Background and Rationale", "Background_and_Rationale"),
      getItem("Inclusion/Exclusion Criteria", "Inclusion_Exclusion_Criteria"),
      getItem(
        "Sample Size and Power Calculation",
        "Sample_Size_and_Power_Calculation"
      ),
      getItem(
        "Study Endpoints and Outcome Measures",
        "Study_Endpoints_and_Outcome_Measures"
      ),
      getItem("Statistical Analysis Plan", "Statistical_Analysis_Plan"),
      getItem(
        "Data Collection and Management",
        "Data_Collection_and_Management"
      ),
      getItem("Ethics and Safety", "Ethics_and_Safety"),
    ],
    "group"
  ),
];
function SectionsList(props) {
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
              <PieChartOutlined /> &nbsp;Document Sections
            </span>
            <span
              onClick={() => {
                setShowExpanded(!showExpanded);
                props.onSectionHide();
              }}
              style={{ marginLeft: "auto" }}
            >
              <LeftCircleOutlined />
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              // padding: "20px",
              fontSize: "large",
              fontWeight: 400,
            }}
          >
          <span>
            {" "}
            Metadata &nbsp; <Switch defaultChecked onChange={props.showMeta}/>
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
            props.onSectionHide();
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "x-large",
            color: "#446995",
            marginTop: "20px",
          }}
        >
          <MenuOutlined />
        </div>
      )}
    </>
  );
}

export default SectionsList;
