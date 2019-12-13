import React, {
  Component,
  useReducer,
  useState,
  useRef,
  useEffect
} from "react";
import { Form, Button, Input,Table } from "semantic-ui-react";
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

    const name = props.currentCustomer.companyName;
    doFetch(
      "DELETE",
      `${FMURL.Customers}/${name}`,
      () => setPopupText(name + " deleted successfully"),
      json => setPopupText(json.Message),
      error => setPopupText(error.toString()),
      "",
      () => setShowPopup(true)
    );
  }

  function postCustomer(onSuccess: () => void) {
    const id = getProp(activeCustomer, "customerId");

    if (!id) {
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
        setPopupText(id + " created successfully");
        onSuccess();
      },
      json => setPopupText(json.Message),
      error => setPopupText(error.toString()),
      JSON.stringify(activeCustomer),
      () => setShowPopup(true)
    );
  }

  function putCustomer(onSuccess: () => void) {
    const id = getProp(activeCustomer, "customerId");

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
  if (!activeCustomer) {
    nameText = "No customer selected";
  } else if (!nameText) {
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
                // onChange={v =>
                //   updateActiveCustomer({ field: "companyName", value: v })
                // }
                error={!getCustomerPropAsString(activeCustomer, "companyName")}
                small
              />
            )}
          </div>

          <div className="monitor__job-info--setup-buttons">
            {!props.setupIsActive && (
              <Button
                text="New"
                onClick={() => {
                  savedCustomer.current = props.currentCustomer;
                  props.onNewCurrentCustomer(undefined);
                  updateActiveCustomer({ field: "", value: "", init: {} });
                  setIsCreatingNew(true);
                  props.onSetupStateChange(true);
                }}
              />
            )}
            {props.setupIsActive && (
              <div>
                <Button
                  text="Cancel"
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
                />
                <Button
                  text={isCreatingNew ? "Create" : "Save"}
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
                />
              </div>
            )}
            {props.currentCustomer && !props.setupIsActive && (
              <Button
                text="Setup"
                onClick={() => {
                  savedCustomer.current = props.currentCustomer;
                  props.onSetupStateChange(true);
                }}
                disabled={
                  !props.currentCustomer ||
                  !getProp(props.currentCustomer, "companyName")
                }
              >
                Edit
              </Button>
            )}
            {props.currentCustomer && !props.setupIsActive && (
              <Button
                text="Delete"
                onClick={() => setShowDeletePopup(true)}
                disabled={
                  !getCustomerPropAsString(activeCustomer, "companyName")
                }
                negative
              >
                Delete
              </Button>
            )}
          </div>
          <CustomerInfoField
            label="customerId"
            field="customerId"
            onChange={v =>
              updateActiveCustomer({ field: "customerId", value: v })
            }
            focus
            extra={{ setupIsActive: props.setupIsActive, activeCustomer }}
          />
          <CustomerInfoField
            label="Company Name"
            field="companyName"
            onChange={v =>
              updateActiveCustomer({ field: "companyName", value: v })
            }
            focus
            extra={{ setupIsActive: props.setupIsActive, activeCustomer }}
          />
          <CustomerInfoField
            label="companyTown"
            field="companyTown"
            onChange={v =>
              updateActiveCustomer({ field: "companyTown", value: v })
            }
            focus
            extra={{ setupIsActive: props.setupIsActive, activeCustomer }}
          />
          <CustomerInfoField
            label="companyStreet"
            field="companyStreet"
            onChange={v =>
              updateActiveCustomer({ field: "companyStreet", value: v })
            }
            focus
            extra={{ setupIsActive: props.setupIsActive, activeCustomer }}
          />
          <CustomerInfoField
            label="companyPostalCode"
            field="companyPostalCode"
            onChange={v =>
              updateActiveCustomer({ field: "companyPostalCode", value: v })
            }
            focus
            extra={{ setupIsActive: props.setupIsActive, activeCustomer }}
          />
          <CustomerInfoField
            label="contactNumber"
            field="contactNumber"
            onChange={v =>
              updateActiveCustomer({ field: "contactNumber", value: v })
            }
            focus
            extra={{ setupIsActive: props.setupIsActive, activeCustomer }}
          />
          <CustomerInfoField
            label="contactPerson"
            field="contactPerson"
            onChange={v =>
              updateActiveCustomer({ field: "contactPerson", value: v })
            }
            focus
            extra={{ setupIsActive: props.setupIsActive, activeCustomer }}
          />
        </div>
      </Table>
    </React.Fragment>
  );
};

function CustomerInfoField(props: {
  label: string;
  field: CustomerField;
  focus?: boolean;
  err?: boolean;
  onChange?(v: string): void;
  className?: string;
  extra: { activeCustomer: Customer; setupIsActive: boolean };
}) {
  const v = getCustomerPropAsString(props.extra.activeCustomer, props.field);
  return (
    <Input
      disabled={!props.onChange && props.extra.setupIsActive}
      label={props.label}
      value={v}
      // onChange={
      //   props.onChange && props.extra.setupIsActive ? props.onChange : undefined
      // }
      focus={props.focus ? props.extra.setupIsActive : false}
      error={props.extra.setupIsActive && !v && props.err}
      small
      alignToEdges
      // className={props.className ? props.className : "monitor__job-info--wider-input"}
    />
  );
}
