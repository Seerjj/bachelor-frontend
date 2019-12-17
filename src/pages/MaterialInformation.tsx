import React, {
    Component,
    useReducer,
    useState,
    useRef,
    useEffect
  } from "react";
  import { Form, Button, Input, Table, Popup, Modal } from "semantic-ui-react";
  import {
    getProp,
    setProp,
    logError,
    doFetch
  } from "../lib/functions/general_funcs";
  import { ErrorSeverity, FMURL } from "../lib/definitions/enums";
  import { createSecureContext } from "tls";
import { Material, MaterialField } from "../lib/definitions/types";
import { getMaterialPropAsString } from "../lib/functions/materials_functions";
  
  function initActiveMaterial(material: Material | {}) {
    return JSON.parse(JSON.stringify(material));
  }
  
  function activeMaterialReducer(
    material: Material,
    action: { field: MaterialField | ""; value: string; init?: Material | {} }
  ): Material {
    if (action.init) {
      return initActiveMaterial(action.init);
    }
    const copy = JSON.parse(JSON.stringify(material));
    setProp(copy, action.field, action.value);
    return copy;
  }
  
  export interface MaterialInformationProps {
    currentMaterial: Material | undefined;
    setupIsActive: boolean;
    fetchMaterials(): void;
    onNewCurrentMaterial(material: Material | undefined): void;
    onSetupStateChange(newState: boolean): void;
  }
  
  export const MaterialInformation: React.FC<MaterialInformationProps> = props => {
    const [activeMaterial, updateActiveMaterial] = useReducer(
      activeMaterialReducer,
      {},
      initActiveMaterial
    );
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupText, setPopupText] = useState("");
  
    const savedMaterial = useRef<Material>();
  
    useEffect(() => {
      updateActiveMaterial({ field: "", value: "", init: props.currentMaterial });
    }, [props.currentMaterial]);
  
    function deleteMaterial() {
      if (!props.currentMaterial) {
        logError(
          "Delete was possible to perform without an active material",
          ErrorSeverity.Medium
        );
        return;
      } else if (!props.currentMaterial.name) {
        logError(
          "Delete was possible to perform on a material without a name",
          ErrorSeverity.High
        );
        return;
      }
  
      const id = props.currentMaterial.id;
      console.log(props.currentMaterial);
      doFetch(
        "DELETE",
        `${FMURL.Materials}/${id}`,
        () => setPopupText(id + " deleted successfully"),
        json => setPopupText(json.Message),
        error => setPopupText(error.toString()),
        "",
        () => setShowPopup(true)
      );
    }
  
    function postMaterial(onSuccess: () => void) {
      const name = getProp(activeMaterial, "name");
  
      if (!name) {
        logError(
          "Material post was possible to perform on a material without a name",
          ErrorSeverity.Medium
        );
        return;
      }
      doFetch(
        "POST",
        `${FMURL.Materials}`,
        () => {
          props.fetchMaterials();
          setPopupText(name + " created successfully");
          onSuccess();
        },
        json => setPopupText(json.Message),
        error => setPopupText(error.toString()),
        JSON.stringify(activeMaterial),
        () => setShowPopup(true)
      );
    }
  
    function putMaterial(onSuccess: () => void) {
      const id = getProp(activeMaterial, "id");
  
      if (!id) {
        logError(
          "Material put was possible to perform on a Material without a name",
          ErrorSeverity.Medium
        );
        return;
      }
      doFetch(
        "PUT",
        `${FMURL.Materials}/${id}`,
        () => {
          props.fetchMaterials();
          setPopupText(id + "Material updated successfully");
          onSuccess();
        },
        json => setPopupText(json.Message),
        error => setPopupText(error.toString()),
        JSON.stringify(activeMaterial),
        () => setShowPopup(true)
      );
    }
  
    let nameText = getMaterialPropAsString(activeMaterial, "name");
    if (!nameText) {
      nameText = "No Material selected";
    } else if (!activeMaterial) {
      nameText = "No Material specified";
    }
  
    return (
      <React.Fragment>
        <Table>
          <div className="monitor__job-info">
            <div className="monitor__job-info--status-name-box">
  
  
  
              {!isCreatingNew && nameText}
              {isCreatingNew && (
                <Input
                  placeholder="Material name"
                  value={getMaterialPropAsString(activeMaterial, "name")}
                  onChange={(e, data) =>
                    updateActiveMaterial({
                      field: "name",
                      value: data.value
                    })
                  }
                  error={!getMaterialPropAsString(activeMaterial, "name")}
                />
              )}
  
            </div>
  
  
  
  
            <div className="monitor__job-info--setup-buttons">
              {!props.setupIsActive && (
                <Button
                  onClick={() => {
                    savedMaterial.current = props.currentMaterial;
                    props.onNewCurrentMaterial(undefined);
                    updateActiveMaterial({ field: "", value: "", init: {} });
                    setIsCreatingNew(true);
                    props.onSetupStateChange(true);
                  }}
                >
                  New
                </Button>
              )}
              {props.setupIsActive && (
                <div>
                  <Button
                    onClick={() => {
                      updateActiveMaterial({
                        field: "",
                        value: "",
                        init: savedMaterial.current ? savedMaterial.current : {}
                      });
                      props.onNewCurrentMaterial(savedMaterial.current);
                      props.onSetupStateChange(false);
                      setIsCreatingNew(false);
                    }}
                    negative
                  >
                    Cancel
                  </Button>
  
  
  
                  <Button
                    onClick={() => {
                      const callback = () => {
                        updateActiveMaterial({ field: "", value: "", init: {} });
                        props.onSetupStateChange(false);
                        setIsCreatingNew(false);
                      };
                      if (isCreatingNew) {
                        postMaterial(callback);
                      } else {
                        putMaterial(callback);
                      }
                    }}
                    color="blue"
                    disabled={
                      !getMaterialPropAsString(activeMaterial, "name")
                    }
                  >
                    {isCreatingNew ? "Create" : "Save"}
                  </Button>
  
  
  
  
  
                  
                </div>
              )}
              {props.currentMaterial && !props.setupIsActive && (
                <Button
                  onClick={() => {
                    savedMaterial.current = props.currentMaterial;
                    props.onSetupStateChange(true);
                  }}
                  disabled={
                    !props.currentMaterial ||
                    !getProp(props.currentMaterial, "name")
                  }
                >
                  Edit
                </Button>
              )}
              {props.currentMaterial && !props.setupIsActive && (
                <Button
                  text="Delete"
                  onClick={() => setShowDeletePopup(true)}
                  disabled={
                    !getMaterialPropAsString(activeMaterial, "name")
                  }
                  negative
                >
                  Delete
                </Button>
              )}
            </div>
  
  
            <Input
              label="Material name"
              field="name"
              onChange={(e, data) =>
                updateActiveMaterial({ field: "name", value: data.value })
              }
              value={getMaterialPropAsString(activeMaterial, "name")}
              focus
            />
            
  
  
            
  
  
  
            <Input
              label="category"
              field="category"
              onChange={(e, data) =>
                updateActiveMaterial({
                  field: "category",
                  value: data.value
                })
              }
              value={getMaterialPropAsString(activeMaterial, "category")}
              focus
            />



            <Input
              label="houseSection"
              field="houseSection"
              onChange={(e, data) =>
                updateActiveMaterial({
                  field: "houseSection",
                  value: data.value
                })
              }
              value={getMaterialPropAsString(activeMaterial, "houseSection")}
              focus
            />



            
            <Input
              label="supplier"
              field="supplier"
              onChange={(e, data) =>
                updateActiveMaterial({
                  field: "supplier",
                  value: data.value
                })
              }
              value={getMaterialPropAsString(activeMaterial, "supplier")}
              focus
            />


            <Input
              label="units"
              field="units"
              onChange={(e, data) =>
                updateActiveMaterial({
                  field: "units",
                  value: data.value
                })
              }
              value={getMaterialPropAsString(activeMaterial, "units")}
              focus
            />

<Input
              label="pricePerUnit"
              field="pricePerUnit"
              onChange={(e, data) =>
                updateActiveMaterial({ field: "pricePerUnit", value: data.value })
              }
              value={getMaterialPropAsString(activeMaterial, "pricePerUnit")}
              focus
            />
  
            <Modal open={showDeletePopup}>
              <Modal.Content>
                {`Are you sure you want to delete ${
                  props.currentMaterial
                    ? props.currentMaterial.name
                    : "this material"
                }?`}
              </Modal.Content>
              <Modal.Actions>
                <Button
                  onClick={() => {
                    deleteMaterial();
                    setShowDeletePopup(false);
                  }}
                >
                  Yes
                </Button>
                <Button negative onClick={() => setShowDeletePopup(false)}>
                  No
                </Button>
              </Modal.Actions>
            </Modal>
          </div>
        </Table>
      </React.Fragment>
    );
  };
  