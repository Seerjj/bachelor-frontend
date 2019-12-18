import React, {
    Component,
    useReducer,
    useState,
    useRef,
    useEffect
  } from "react";
  import { Form, Button, Input, Table, Popup, Modal, TableBody } from "semantic-ui-react";
  import {
    getProp,
    setProp,
    logError,
    doFetch
  } from "../lib/functions/general_funcs";
  import { ErrorSeverity, FMURL } from "../lib/definitions/enums";
import { RentalOverview, RentalOverviewField } from "../lib/definitions/types";
import { getHousePropAsString } from "../lib/functions/houses_functions";
import { getRentalOverviewPropAsString } from "../lib/functions/rentaloverviews_functions";
  
  function initActiveRental(rental: RentalOverview | {}) {
    return JSON.parse(JSON.stringify(rental));
  }
  
  function activeRentalReducer(
    rental: RentalOverview,
    action: { field: RentalOverviewField | ""; value: string; init?: RentalOverview | {} }
  ): RentalOverview {
    if (action.init) {
      return initActiveRental(action.init);
    }
    const copy = JSON.parse(JSON.stringify(rental));
    setProp(copy, action.field, action.value);
    return copy;
  }
  
  export interface RentalInformationProps {
    currentRental: RentalOverview | undefined;
    setupIsActive: boolean;
    fetchRentals(): void;
    onNewCurrentRental(rental: RentalOverview | undefined): void;
    onSetupStateChange(newState: boolean): void;
  }
  
  export const RentalOverviewInformation: React.FC<RentalInformationProps> = props => {
    const [activeRental, updateActiveRental] = useReducer(
      activeRentalReducer,
      {},
      initActiveRental
    );
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupText, setPopupText] = useState("");
  
    const savedRental = useRef<RentalOverview>();
  
    useEffect(() => {
      updateActiveRental({ field: "", value: "", init: props.currentRental });
    }, [props.currentRental]);
  
    function deleteRental() {
      if (!props.currentRental) {
        logError(
          "Delete was possible to perform without an active rental overview",
          ErrorSeverity.Medium
        );
        return;
      } else if (!props.currentRental.setupAddressStreet) {
        logError(
          "Delete was possible to perform on a rental overview without an address",
          ErrorSeverity.High
        );
        return;
      }
  
      const id = props.currentRental.id;
      console.log(props.currentRental);
      doFetch(
        "DELETE",
        `${FMURL.RentalOverviews}/${id}`,
        () => setPopupText(id + " deleted successfully"),
        json => setPopupText(json.Message),
        error => setPopupText(error.toString()),
        "",
        () => setShowPopup(true)
      );
    }
  
    function postRental(onSuccess: () => void) {
      const address = getProp(activeRental, "setupAddressStreet");
  
      if (!address) {
        logError(
          "Rental post was possible to perform on a rental without an address",
          ErrorSeverity.Medium
        );
        return;
      }
      doFetch(
        "POST",
        `${FMURL.RentalOverviews}`,
        () => {
          props.fetchRentals();
          setPopupText(address + " created successfully");
          onSuccess();
        },
        json => setPopupText(json.Message),
        error => setPopupText(error.toString()),
        JSON.stringify(activeRental),
        () => setShowPopup(true)
      );
    }
  
    function putRental(onSuccess: () => void) {
      const id = getProp(activeRental, "id");
  
      if (!id) {
        logError(
          "Rental put was possible to perform on a rental without an address",
          ErrorSeverity.Medium
        );
        return;
      }
      doFetch(
        "PUT",
        `${FMURL.RentalOverviews}/${id}`,
        () => {
          props.fetchRentals();
          setPopupText(id + "Rental updated successfully");
          onSuccess();
        },
        json => setPopupText(json.Message),
        error => setPopupText(error.toString()),
        JSON.stringify(activeRental),
        () => setShowPopup(true)
      );
    }
  
    let addressText = getRentalOverviewPropAsString(activeRental, "setupAddressStreet");
    if (!addressText) {
      addressText = "No rental selected";
    } else if (!activeRental) {
      addressText = "No rental specified";
    }
  
    return (
      <React.Fragment>
          <div className="monitor__job-info">
            <div className="monitor__job-info--status-name-box">
  
  
  
              {!isCreatingNew && addressText}
              {isCreatingNew && (
                <Input
                  placeholder="Address street"
                  value={getRentalOverviewPropAsString(activeRental, "setupAddressStreet")}
                  onChange={(e, data) =>
                    updateActiveRental({
                      field: "setupAddressStreet",
                      value: data.value
                    })
                  }
                  error={!getRentalOverviewPropAsString(activeRental, "setupAddressStreet")}
                />
              )}
  
            </div>

            <div className="monitor__job-info--setup-buttons">
              {!props.setupIsActive && (
                <Button
                  onClick={() => {
                    savedRental.current = props.currentRental;
                    props.onNewCurrentRental(undefined);
                    updateActiveRental({ field: "", value: "", init: {} });
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
                      updateActiveRental({
                        field: "",
                        value: "",
                        init: savedRental.current ? savedRental.current : {}
                      });
                      props.onNewCurrentRental(savedRental.current);
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
                        updateActiveRental({ field: "", value: "", init: {} });
                        props.onSetupStateChange(false);
                        setIsCreatingNew(false);
                      };
                      if (isCreatingNew) {
                        postRental(callback);
                      } else {
                        putRental(callback);
                      }
                    }}
                    color="blue"
                    disabled={
                      !getRentalOverviewPropAsString(activeRental, "setupAddressStreet")
                    }
                  >
                    {isCreatingNew ? "Create" : "Save"}
                  </Button>
  
  
  
  
  
                  
                </div>
              )}
              {props.currentRental && !props.setupIsActive && (
                <Button
                  onClick={() => {
                    savedRental.current = props.currentRental;
                    props.onSetupStateChange(true);
                  }}
                  disabled={
                    !props.currentRental ||
                    !getProp(props.currentRental, "setupAddressStreet")
                  }
                >
                  Edit
                </Button>
              )}
              {props.currentRental && !props.setupIsActive && (
                <Button
                  text="Delete"
                  onClick={() => setShowDeletePopup(true)}
                  disabled={
                    !getRentalOverviewPropAsString(activeRental, "setupAddressStreet")
                  }
                  negative
                >
                  Delete
                </Button>
              )}
            </div>
  
  
            <Input
              label="productionInformation"
              field="productionInformation"
              onChange={(e, data) =>
                updateActiveRental({ field: "productionInformation", value: data.value })
              }
              value={getRentalOverviewPropAsString(activeRental, "productionInformation")}
              focus
            />
            
  
  
            <Input
              label="purchaseStatus"
              field="purchaseStatus"
              onChange={(e, data) =>
                updateActiveRental({ field: "purchaseStatus", value: data.value })
              }
              value={getRentalOverviewPropAsString(activeRental, "purchaseStatus")}
              focus
            />
  
  
  
            <Input
              label="setupAddressTown"
              field="setupAddressTown"
              onChange={(e, data) =>
                updateActiveRental({
                  field: "setupAddressTown",
                  value: data.value
                })
              }
              value={getRentalOverviewPropAsString(activeRental, "setupAddressTown")}
              focus
            />
            <Input
              label="setupAddressStreet"
              field="setupAddressStreet"
              onChange={(e, data) =>
                updateActiveRental({
                  field: "setupAddressStreet",
                  value: data.value
                })
              }
              value={getRentalOverviewPropAsString(activeRental, "setupAddressStreet")}
              focus
            />
            <Input
              label="setupAddressPostalCode"
              field="setupAddressPostalCode"
              onChange={(e, data) =>
                updateActiveRental({
                  field: "setupAddressPostalCode",
                  value: data.value
                })
              }
              value={getRentalOverviewPropAsString(activeRental, "setupAddressPostalCode")}
              focus
            />
            <Input
              label="estimatedPrice"
              field="estimatedPrice"
              onChange={(e, data) =>
                updateActiveRental({
                  field: "estimatedPrice",
                  value: data.value
                })
              }
              value={getRentalOverviewPropAsString(activeRental, "estimatedPrice")}
              focus
            />
  
            <Modal open={showDeletePopup}>
              <Modal.Content>
                {`Are you sure you want to delete ${
                  props.currentRental
                    ? props.currentRental.setupAddressStreet
                    : "this rental"
                }?`}
              </Modal.Content>
              <Modal.Actions>
                <Button
                  onClick={() => {
                    deleteRental();
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
      </React.Fragment>
    );
  };
  