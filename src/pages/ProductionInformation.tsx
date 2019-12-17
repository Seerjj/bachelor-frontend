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
import { Production, ProductionField } from "../lib/definitions/types";
import { getProductionInfoPropAsString } from "../lib/functions/production_functions";
  
  function initActiveProduction(production: Production | {}) {
    return JSON.parse(JSON.stringify(production));
  }
  
  function activeProductionReducer(
    production: Production,
    action: { field: ProductionField | ""; value: string; init?: Production | {} }
  ): Production {
    if (action.init) {
      return initActiveProduction(action.init);
    }
    const copy = JSON.parse(JSON.stringify(production));
    setProp(copy, action.field, action.value);
    return copy;
  }
  
  export interface ProductionInformationProps {
    currentProduction: Production | undefined;
    setupIsActive: boolean;
    fetchProductions(): void;
    onNewCurrentProduction(production: Production | undefined): void;
    onSetupStateChange(newState: boolean): void;
  }
  
  export const ProductionInformation: React.FC<ProductionInformationProps> = props => {
    const [activeProduction, updateActiveProduction] = useReducer(
      activeProductionReducer,
      {},
      initActiveProduction
    );
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupText, setPopupText] = useState("");
  
    const savedProduction = useRef<Production>();
  
    useEffect(() => {
      updateActiveProduction({ field: "", value: "", init: props.currentProduction });
    }, [props.currentProduction]);
  
    function deleteProduction() {
      if (!props.currentProduction) {
        logError(
          "Delete was possible to perform without an active Production",
          ErrorSeverity.Medium
        );
        return;
      } else if (!props.currentProduction.customer.companyName) {
        logError(
          "Delete was possible to perform on a Production without a name",
          ErrorSeverity.High
        );
        return;
      }
  
      const id = props.currentProduction.id;
      console.log(props.currentProduction);
      doFetch(
        "DELETE",
        `${FMURL.Production}/${id}`,
        () => setPopupText(id + " deleted successfully"),
        json => setPopupText(json.Message),
        error => setPopupText(error.toString()),
        "",
        () => setShowPopup(true)
      );
    }
  
    function postProduction(onSuccess: () => void) {
      const name = getProp(activeProduction, "customer.companyName");
  
      if (!name) {
        logError(
          "Production post was possible to perform on a Production without a name",
          ErrorSeverity.Medium
        );
        return;
      }
      doFetch(
        "POST",
        `${FMURL.Production}`,
        () => {
          props.fetchProductions();
          setPopupText(name + " created successfully");
          onSuccess();
        },
        json => setPopupText(json.Message),
        error => setPopupText(error.toString()),
        JSON.stringify(activeProduction),
        () => setShowPopup(true)
      );
    }
  
    function putProduction(onSuccess: () => void) {
      const id = getProp(activeProduction, "id");
  
      if (!id) {
        logError(
          "Production put was possible to perform on a Production without a name",
          ErrorSeverity.Medium
        );
        return;
      }
      doFetch(
        "PUT",
        `${FMURL.Production}/${id}`,
        () => {
          props.fetchProductions();
          setPopupText(id + "Production updated successfully");
          onSuccess();
        },
        json => setPopupText(json.Message),
        error => setPopupText(error.toString()),
        JSON.stringify(activeProduction),
        () => setShowPopup(true)
      );
    }
  
    let nameText = getProductionInfoPropAsString(activeProduction, "customer.companyName");
    if (!nameText) {
      nameText = "No production selected";
    } else if (!activeProduction) {
      nameText = "No production specified";
    }
  
    return (
      <React.Fragment>
        <Table>
          <div className="monitor__job-info">
            <div className="monitor__job-info--status-name-box">
  
  
  
              {!isCreatingNew && nameText}
              {isCreatingNew && (
                <Input
                  placeholder="Production name"
                  value={getProductionInfoPropAsString(activeProduction, "customer.companyName")}
                  onChange={(e, data) =>
                    updateActiveProduction({
                      field: "customer.companyName",
                      value: data.value
                    })
                  }
                  error={!getProductionInfoPropAsString(activeProduction, "customer.companyName")}
                />
              )}
  
            </div>
  
  
  
  
            <div className="monitor__job-info--setup-buttons">
              {!props.setupIsActive && (
                <Button
                  onClick={() => {
                    savedProduction.current = props.currentProduction;
                    props.onNewCurrentProduction(undefined);
                    updateActiveProduction({ field: "", value: "", init: {} });
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
                      updateActiveProduction({
                        field: "",
                        value: "",
                        init: savedProduction.current ? savedProduction.current : {}
                      });
                      props.onNewCurrentProduction(savedProduction.current);
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
                        updateActiveProduction({ field: "", value: "", init: {} });
                        props.onSetupStateChange(false);
                        setIsCreatingNew(false);
                      };
                      if (isCreatingNew) {
                        postProduction(callback);
                      } else {
                        putProduction(callback);
                      }
                    }}
                    color="blue"
                    disabled={
                      !getProductionInfoPropAsString(activeProduction, "customer.companyName")
                    }
                  >
                    {isCreatingNew ? "Create" : "Save"}
                  </Button>
  
  
  
  
  
                  
                </div>
              )}
              {props.currentProduction && !props.setupIsActive && (
                <Button
                  onClick={() => {
                    savedProduction.current = props.currentProduction;
                    props.onSetupStateChange(true);
                  }}
                  disabled={
                    !props.currentProduction ||
                    !getProp(props.currentProduction, "customer.companyName")
                  }
                >
                  Edit
                </Button>
              )}
              {props.currentProduction && !props.setupIsActive && (
                <Button
                  text="Delete"
                  onClick={() => setShowDeletePopup(true)}
                  disabled={
                    !getProductionInfoPropAsString(activeProduction, "customer.companyName")
                  }
                  negative
                >
                  Delete
                </Button>
              )}
            </div>
  
  
            <Input
              label="Company Name"
              field="customer.companyName"
              onChange={(e, data) =>
                updateActiveProduction({ field: "customer.companyName", value: data.value })
              }
              value={getProductionInfoPropAsString(activeProduction, "customer.companyName")}
              focus
            />
            
  
  
            <Input
              label="Company Town"
              field="exteriorWalls"
              onChange={(e, data) =>
                updateActiveProduction({ field: "exteriorWalls", value: data.value })
              }
              value={getProductionInfoPropAsString(activeProduction, "exteriorWalls")}
              focus
            />
  
  
  
            <Input
              label="companyStreet"
              field="ventilation"
              onChange={(e, data) =>
                updateActiveProduction({
                  field: "ventilation",
                  value: data.value
                })
              }
              value={getProductionInfoPropAsString(activeProduction, "ventilation")}
              focus
            />
            <Input
              label="productionPrice"
              field="productionPrice"
              onChange={(e, data) =>
                updateActiveProduction({
                  field: "productionPrice",
                  value: data.value
                })
              }
              value={getProductionInfoPropAsString(activeProduction, "productionPrice")}
              focus
            />
            <Input
              label="productionDate"
              field="productionDate"
              onChange={(e, data) =>
                updateActiveProduction({
                  field: "productionDate",
                  value: data.value
                })
              }
              value={getProductionInfoPropAsString(activeProduction, "productionDate")}
              focus
            />
            <Input
              label="additionalCosts"
              field="additionalCosts"
              onChange={(e, data) =>
                updateActiveProduction({
                  field: "additionalCosts",
                  value: data.value
                })
              }
              value={getProductionInfoPropAsString(activeProduction, "additionalCosts")}
              focus
            />
  
            <Modal open={showDeletePopup}>
              <Modal.Content>
                {`Are you sure you want to delete ${
                  props.currentProduction
                    ? props.currentProduction.customer.companyName
                    : "this Production"
                }?`}
              </Modal.Content>
              <Modal.Actions>
                <Button
                  onClick={() => {
                    deleteProduction();
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
  