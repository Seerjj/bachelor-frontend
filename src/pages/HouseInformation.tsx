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
import { House, HouseField } from "../lib/definitions/types";
import { getHousePropAsString } from "../lib/functions/houses_functions";
  
  function initActiveHouse(house: House | {}) {
    return JSON.parse(JSON.stringify(house));
  }
  
  function activeHouseReducer(
    house: House,
    action: { field: HouseField | ""; value: string; init?: House | {} }
  ): House {
    if (action.init) {
      return initActiveHouse(action.init);
    }
    const copy = JSON.parse(JSON.stringify(house));
    setProp(copy, action.field, action.value);
    return copy;
  }
  
  export interface HouseInformationProps {
    currentHouse: House | undefined;
    setupIsActive: boolean;
    fetchHouses(): void;
    onNewCurrentHouse(house: House | undefined): void;
    onSetupStateChange(newState: boolean): void;
  }
  
  export const HouseInformation: React.FC<HouseInformationProps> = props => {
    const [activeHouse, updateActiveHouse] = useReducer(
      activeHouseReducer,
      {},
      initActiveHouse
    );
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupText, setPopupText] = useState("");
  
    const savedHouse = useRef<House>();
  
    useEffect(() => {
      updateActiveHouse({ field: "", value: "", init: props.currentHouse });
    }, [props.currentHouse]);
  
    function deleteHouse() {
      if (!props.currentHouse) {
        logError(
          "Delete was possible to perform without an active customer",
          ErrorSeverity.Medium
        );
        return;
      } else if (!props.currentHouse.houseType) {
        logError(
          "Delete was possible to perform on a customer without a name",
          ErrorSeverity.High
        );
        return;
      }
  
      const id = props.currentHouse.id;
      console.log(props.currentHouse);
      doFetch(
        "DELETE",
        `${FMURL.Houses}/${id}`,
        () => setPopupText(id + " deleted successfully"),
        json => setPopupText(json.Message),
        error => setPopupText(error.toString()),
        "",
        () => setShowPopup(true)
      );
    }
  
    function postHouse(onSuccess: () => void) {
      const type = getProp(activeHouse, "houseType");
  
      if (!type) {
        logError(
          "House post was possible to perform on a house without a type",
          ErrorSeverity.Medium
        );
        return;
      }
      doFetch(
        "POST",
        `${FMURL.Houses}`,
        () => {
          props.fetchHouses();
          setPopupText(type + " created successfully");
          onSuccess();
        },
        json => setPopupText(json.Message),
        error => setPopupText(error.toString()),
        JSON.stringify(activeHouse),
        () => setShowPopup(true)
      );
    }
  
    function putHouse(onSuccess: () => void) {
      const id = getProp(activeHouse, "id");
  
      if (!id) {
        logError(
          "House put was possible to perform on a house without a type",
          ErrorSeverity.Medium
        );
        return;
      }
      doFetch(
        "PUT",
        `${FMURL.Houses}/${id}`,
        () => {
          props.fetchHouses();
          setPopupText(id + "House updated successfully");
          onSuccess();
        },
        json => setPopupText(json.Message),
        error => setPopupText(error.toString()),
        JSON.stringify(activeHouse),
        () => setShowPopup(true)
      );
    }
  
    let nameText = getHousePropAsString(activeHouse, "id");
    if (!nameText) {
      nameText = "No house selected";
    } else if (!activeHouse) {
      nameText = "No house specified";
    }
  
    return (
      <React.Fragment>
        <Table>
          <div className="monitor__job-info">
            <div className="monitor__job-info--status-name-box">
  
  
  
              {!isCreatingNew && nameText}
              {isCreatingNew && (
                <Input
                  placeholder="House type"
                  value={getHousePropAsString(activeHouse, "houseType")}
                  onChange={(e, data) =>
                    updateActiveHouse({
                      field: "houseType",
                      value: data.value
                    })
                  }
                  error={!getHousePropAsString(activeHouse, "houseType")}
                />
              )}
  
            </div>
  
  
  
  
            <div className="monitor__job-info--setup-buttons">
              {!props.setupIsActive && (
                <Button
                  onClick={() => {
                    savedHouse.current = props.currentHouse;
                    props.onNewCurrentHouse(undefined);
                    updateActiveHouse({ field: "", value: "", init: {} });
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
                      updateActiveHouse({
                        field: "",
                        value: "",
                        init: savedHouse.current ? savedHouse.current : {}
                      });
                      props.onNewCurrentHouse(savedHouse.current);
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
                        updateActiveHouse({ field: "", value: "", init: {} });
                        props.onSetupStateChange(false);
                        setIsCreatingNew(false);
                      };
                      if (isCreatingNew) {
                        postHouse(callback);
                      } else {
                        putHouse(callback);
                      }
                    }}
                    color="blue"
                    disabled={
                      !getHousePropAsString(activeHouse, "houseType")
                    }
                  >
                    {isCreatingNew ? "Create" : "Save"}
                  </Button>
  
  
  
  
  
                  
                </div>
              )}
              {props.currentHouse && !props.setupIsActive && (
                <Button
                  onClick={() => {
                    savedHouse.current = props.currentHouse;
                    props.onSetupStateChange(true);
                  }}
                  disabled={
                    !props.currentHouse ||
                    !getProp(props.currentHouse, "houseType")
                  }
                >
                  Edit
                </Button>
              )}
              {props.currentHouse && !props.setupIsActive && (
                <Button
                  text="Delete"
                  onClick={() => setShowDeletePopup(true)}
                  disabled={
                    !getHousePropAsString(activeHouse, "houseType")
                  }
                  negative
                >
                  Delete
                </Button>
              )}
            </div>
  
  
            <Input
              label="House type"
              field="houseType"
              onChange={(e, data) =>
                updateActiveHouse({ field: "houseType", value: data.value })
              }
              value={getHousePropAsString(activeHouse, "houseType")}
              focus
            />
            
  
  
            <Input
              label="Square meters"
              field="squareMeters"
              onChange={(e, data) =>
                updateActiveHouse({ field: "squareMeters", value: data.value })
              }
              value={getHousePropAsString(activeHouse, "squareMeters")}
              focus
            />
  
            
           
            
  
            <Modal open={showDeletePopup}>
              <Modal.Content>
                {`Are you sure you want to delete ${
                  props.currentHouse
                    ? props.currentHouse.houseType
                    : "this house"
                }?`}
              </Modal.Content>
              <Modal.Actions>
                <Button
                  onClick={() => {
                    deleteHouse();
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
  