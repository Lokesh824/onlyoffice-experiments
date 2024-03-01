import React, { useState } from "react";
import { Menu } from "antd";
import {
  MenuOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
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
  getItem("Navigation One", "sub1", null, [
    getItem(
      "Item 1",
      "g1",
      null,
      [getItem("Option 1", "1"), getItem("Option 2", "2")],
      "group"
    ),
    getItem(
      "Item 2",
      "g2",
      null,
      [getItem("Option 3", "3"), getItem("Option 4", "4")],
      "group"
    ),
  ]),
  getItem("Navigation Two", "sub2", null, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),
  {
    type: "divider",
  },
  getItem("Navigation Three", "sub4", null, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
  getItem(
    "Group",
    "grp",
    null,
    [getItem("Option 13", "13"), getItem("Option 14", "14")],
    "group"
  ),
];
function SectionsList(props) {
  const [showExpanded, setShowExpanded] = useState(true);
  const onClick = (e) => {
    console.log("click ", e);
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
              <MenuOutlined /> &nbsp;Sections
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
            fontSize: "xxx-large",
            color: "#446995",
            marginTop:'20px'
          }}
        >
          <RightCircleOutlined />
        </div>
      )}
    </>
  );
}

export default SectionsList;
