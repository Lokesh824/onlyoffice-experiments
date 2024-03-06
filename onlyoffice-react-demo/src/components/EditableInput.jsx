import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormGroup, Input, Label } from "@itispal/uikit";
import {
    faCheck,
    faPenToSquare,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";

const EditableInput = ({
    label="Label",
    inputValue="Input value",
    onChange,
    id,
    labelChange,
    isEditable = true,
    removeInput,
    type = "text",
    showTextAreaButton = true
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isText, setIsText] = useState(type === "text" ? true : false);

    const [newLabel, setNewLabel] = useState(label);
    const [refreshId, setRefreshId] = useState(0);

    function toggleEdit(){
        if (isEdit) {
            if(newLabel === '') return;
            const tempLabel = newLabel.replace(
                new RegExp("\\n", "gi"),
                " "
            );
            labelChange(tempLabel);
            // setNewLabel("");
            setRefreshId(refreshId + 1);
        }
        setIsEdit(!isEdit);
        setTimeout(() => {
            document
                .querySelector(`.custom-${id}`)
                .focus();
        }, 0);
    }

    return (
        <FormGroup>
            <div className="d-flex flex-columnt justify-content-between my-1">
                <div>
                    <Label
                        key={refreshId}
                        className={`${isEditable && 'custom-'+id} gen-inp-label ${isEdit && 'active'}`}
                        onInput={(e) => {
                            setNewLabel(e.target.innerText);
                        }}
                        onKeyDown={(e) => {if(e.code !== 'Enter') return; toggleEdit()}}
                        contentEditable={isEdit}
                        for={isEditable ? "" : label.split(" ").join("-")}
                        suppressContentEditableWarning={true}
                    >
                        {label}
                    </Label>
                    {isEditable && (
                        <FontAwesomeIcon
                            className="mx-1"
                            role="button"
                            onClick={toggleEdit}
                            icon={isEdit ? faCheck : faPenToSquare}
                        />
                    )}
                </div>
                <FormGroup className="d-flex align-items-center">
                    {showTextAreaButton &&
                     <div>
                        <Label
                            className="mx-1 user-select-none"
                            for={`textarea-${label.split(" ").join("-")}`}
                        >
                            TextArea
                        </Label>
                        <Input
                            onChange={(e) => setIsText(!e.target.checked)}
                            type="checkbox"
                            checked={!isText}
                            id={`textarea-${label.split(" ").join("-")}`}
                        />
                    </div>}
                    {isEditable && <FontAwesomeIcon className="mx-1 p-1 mb-2" role="button" onClick={removeInput} icon={faTimes} />}
                </FormGroup>
            </div>
            <Input
                type={isText ? "text" : "textarea"}
                name={label}
                className={`${!isText && 'px-1 py-2 text-area'}`}
                id={label.split(" ").join("-")}
                placeholder=""
                onChange={onChange}
                value={inputValue}
                style={{ maxWidth: "100%" }}
                autoComplete="off"
                required
            />
        </FormGroup>
    );
};

export default EditableInput;
