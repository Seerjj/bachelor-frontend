import React, { useReducer, useState, useRef, useEffect } from "react";
import { Button, Input, Modal, Table } from "semantic-ui-react";
import { Customer, CustomerField } from "../lib/definitions/types";
import {
  getProp,
  setProp,
  logError,
  doFetch
} from "../lib/functions/general_funcs";
import { ErrorSeverity, FMURL } from "../lib/definitions/enums";
import { getCustomerPropAsString } from "../lib/functions/customer_functions";

function initActiveCustomer(customer: Customer | {}) {
  return JSON.parse(JSON.stringify(customer));
}

function activeCustomerReducer(
  customer: Customer,
  action: { field: CustomerField | ""; value: string; init?: Customer | {} }
): Customer {
  if (action.init) {
    return initActiveCustomer(action.init);
  }
  const copy = JSON.parse(JSON.stringify(customer));
  setProp(copy, action.field, action.value);
  return copy;
}

export interface CustomerInformationProps {
  currentCustomer: Customer | undefined;
  setupIsActive: boolean;
  fetchCustomers(): void;
  onNewCurrentCustomer(customer: Customer | undefined): void;
  onSetupStateChange(newState: boolean): void;
}

export const CustomerInformation: React.FC<CustomerInformationProps> = props => {
  const [activeCustomer, updateActiveCustomer] = useReducer(
    activeCustomerReducer,
    {},
    initActiveCustomer
  );
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");

  const savedCustomer = useRef<Customer>();

  useEffect(() => {
    updateActiveCustomer({ field: "", value: "", init: props.currentCustomer });
  }, [props.currentCustomer]);

  function deleteCustomer() {
    if (!props.currentCustomer) {
      logError(
        "Delete was possible to perform without an active customer",
        ErrorSeverity.Medium
      );
      return;
    } else if (!props.currentCustomer.companyName) {
      logError(
        "Delete was possible to perform on a customer without a name",
        ErrorSeverity.High
      );
      return;
    }

    const id = props.currentCustomer.id;
    console.log(props.currentCustomer);
    doFetch(
      "DELETE",
      `${FMURL.Customers}/${id}`,
      () => {
        setPopupText(id + " deleted successfully");
        updateActiveCustomer({ field: "", value: "", init: {} });
        props.fetchCustomers();
      },
      json => setPopupText(json.Message),
      error => setPopupText(error.toString()),
      "",
      () => setShowPopup(true)
    );
  }

  function postCustomer(onSuccess: () => void) {
    const name = getProp(activeCustomer, "companyName");

    if (!name) {
      logError(
        "Customer post was possible to perform on a customer without a name",
        ErrorSeverity.Medium
      );
      return;
    }
    doFetch(
      "POST",
      `${FMURL.Customers}`,
      () => {
        props.fetchCustomers();
        setPopupText(name + " created successfully");
        onSuccess();
      },
      json => setPopupText(json.Message),
      error => setPopupText(error.toString()),
      JSON.stringify(activeCustomer),
      () => setShowPopup(true)
    );
  }

  function putCustomer(onSuccess: () => void) {
    const id = getProp(activeCustomer, "id");

    if (!id) {
      logError(
        "Customer put was possible to perform on a customer without a name",
        ErrorSeverity.Medium
      );
      return;
    }
    doFetch(
      "PUT",
      `${FMURL.Customers}/${id}`,
      () => {
        props.fetchCustomers();
        setPopupText(id + "Customer updated successfully");
        onSuccess();
      },
      json => setPopupText(json.Message),
      error => setPopupText(error.toString()),
      JSON.stringify(activeCustomer),
      () => setShowPopup(true)
    );
  }

  let nameText = getCustomerPropAsString(activeCustomer, "companyName");
  if (!nameText) {
    nameText = "No customer selected";
  } else if (!activeCustomer) {
    nameText = "No customer specified";
  }

  return (
    <React.Fragment>
      <Table>
        <div className="monitor__job-info">
          <div className="monitor__job-info--status-name-box">
            {!isCreatingNew && nameText}
            {isCreatingNew && (
              <Input
                placeholder="Customer name"
                value={getCustomerPropAsString(activeCustomer, "companyName")}
                onChange={(e, data) =>
                  updateActiveCustomer({
                    field: "companyName",
                    value: data.value
                  })
                }
                error={!getCustomerPropAsString(activeCustomer, "companyName")}
              />
            )}
          </div>

          <div className="monitor__job-info--setup-buttons">
            {!props.setupIsActive && (
              <Button
                onClick={() => {
                  savedCustomer.current = props.currentCustomer;
                  props.onNewCurrentCustomer(undefined);
                  updateActiveCustomer({ field: "", value: "", init: {} });
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
                    updateActiveCustomer({
                      field: "",
                      value: "",
                      init: savedCustomer.current ? savedCustomer.current : {}
                    });
                    props.onNewCurrentCustomer(savedCustomer.current);
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
                      updateActiveCustomer({ field: "", value: "", init: {} });
                      props.onSetupStateChange(false);
                      setIsCreatingNew(false);
                    };
                    if (isCreatingNew) {
                      postCustomer(callback);
                    } else {
                      putCustomer(callback);
                    }
                  }}
                  color="blue"
                  disabled={
                    !getCustomerPropAsString(activeCustomer, "companyName")
                  }
                >
                  {isCreatingNew ? "Create" : "Save"}
                </Button>
              </div>
            )}
            {props.currentCustomer && !props.setupIsActive && (
              <Button
                onClick={() => {
                  savedCustomer.current = props.currentCustomer;
                  props.onSetupStateChange(true);
                }}
                disabled={
                  !props.currentCustomer ||
                  !getProp(props.currentCustomer, "companyName") ||
                  
                  !getCustomerPropAsString(activeCustomer, "companyName")
                }
              >
                Edit
              </Button>
            )}

            {props.currentCustomer && !props.setupIsActive && (
              <Button
                onClick={() =>
                  { setShowDeletePopup(true);
                    // setIsCreatingNew(false);
                    
                  }
                }
                disabled={
                  !getCustomerPropAsString(activeCustomer, "companyName")
                }
                negative
              >
                Delete
              </Button>
            )}
          </div>

          <Input
            label="Company Name"
            field="companyName"
            onChange={(e, data) =>
              updateActiveCustomer({ field: "companyName", value: data.value })
            }
            value={getCustomerPropAsString(activeCustomer, "companyName")}
            focus
          />

          <Input
            label="Company Town"
            field="companyTown"
            onChange={(e, data) =>
              updateActiveCustomer({ field: "companyTown", value: data.value })
            }
            value={getCustomerPropAsString(activeCustomer, "companyTown")}
            focus
          />

          <Input
            label="companyStreet"
            field="companyStreet"
            onChange={(e, data) =>
              updateActiveCustomer({
                field: "companyStreet",
                value: data.value
              })
            }
            value={getCustomerPropAsString(activeCustomer, "companyStreet")}
            focus
          />
          <Input
            label="companyPostalCode"
            field="companyPostalCode"
            onChange={(e, data) =>
              updateActiveCustomer({
                field: "companyPostalCode",
                value: data.value
              })
            }
            value={getCustomerPropAsString(activeCustomer, "companyPostalCode")}
            focus
          />
          <Input
            label="contactNumber"
            field="contactNumber"
            onChange={(e, data) =>
              updateActiveCustomer({
                field: "contactNumber",
                value: data.value
              })
            }
            value={getCustomerPropAsString(activeCustomer, "contactNumber")}
            focus
          />
          <Input
            label="contactPerson"
            field="contactPerson"
            onChange={(e, data) =>
              updateActiveCustomer({
                field: "contactPerson",
                value: data.value
              })
            }
            value={getCustomerPropAsString(activeCustomer, "contactPerson")}
            focus
          />

          <Modal open={showDeletePopup}>
            <Modal.Content>
              {`Are you sure you want to delete ${
                props.currentCustomer
                  ? props.currentCustomer.companyName
                  : "this customer"
              }?`}
            </Modal.Content>
            <Modal.Actions>
              <Button
                onClick={() => {
                  deleteCustomer();
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
