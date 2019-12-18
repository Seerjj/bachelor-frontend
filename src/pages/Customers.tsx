import React, { useEffect, useState, useCallback } from "react";
import { Customer } from "../lib/definitions/types";
import { doFetch } from "../lib/functions/general_funcs";
import { FMURL } from "../lib/definitions/enums";
import { Table } from "semantic-ui-react";
import { CustomerInformation } from "../pages/CustomerInformation";

export const Customers: React.FC = () => {
  const [currentCustomer, setCurrentCustomer] = useState<Customer>();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isFetchingCustomers, setIsFetchingCustomers] = useState<boolean>(
    false
  );
  const [popupText, setPopupText] = useState("");

  const [setupIsActive, setSetupIsActive] = useState(false);

  // const columns: TableColumn  [] = [
  //   { displayName: "Name", fieldName: "Name" },
  //   { displayName: "Description", fieldName: "Description" },
  //   { displayName: "Codepage", fieldName: "Codepage" },
  //   { displayName: "HubId", fieldName: "HubId" },
  //   { displayName: "Location", fieldName: "Location" },
  //   {
  //     displayName: "CommunicationMethodName",
  //     fieldName: "communicationmethodname"
  //   },
  //   { displayName: "SystemGroup", fieldName: "SystemGroup" }
  // ];

  const fetchCustomers = useCallback(() => {
    const url = FMURL.Customers;
    setIsFetchingCustomers(true);
    doFetch(
      "GET",
      url,
      json => setCustomers(json),
      json => setPopupText(json.Message),
      message => {
        setPopupText(message);
        setCustomers([]);
      },
      "",
      () => setIsFetchingCustomers(false)
    );
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  function handleCustomerClick(customer: Customer) {
    setSetupIsActive(false);
    setCurrentCustomer(customer);
    console.log(customer);
  }

  return (
    <div>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.HeaderCell>Company Town</Table.HeaderCell>
            <Table.HeaderCell>Company Street</Table.HeaderCell>
            <Table.HeaderCell>Postal Code</Table.HeaderCell>
            <Table.HeaderCell>Contact Number</Table.HeaderCell>
            <Table.HeaderCell>Contact Person</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {customers.map(function(customer, i) { return (
          <Table.Body onClick={() => handleCustomerClick(customer)} key = {i}>
            <Table.Row>
              <Table.Cell>{customer.companyName}</Table.Cell>
              <Table.Cell>{customer.companyTown}</Table.Cell>
              <Table.Cell>{customer.companyStreet}</Table.Cell>
              <Table.Cell>{customer.companyPostalCode}</Table.Cell>
              <Table.Cell>{customer.contactNumber}</Table.Cell>
              <Table.Cell>{customer.contactPerson}</Table.Cell>
            </Table.Row>
          </Table.Body>
        )})}
      </Table>
      <CustomerInformation
        currentCustomer={currentCustomer}
        fetchCustomers={fetchCustomers}
        onNewCurrentCustomer={setCurrentCustomer}
        onSetupStateChange={setSetupIsActive}
        setupIsActive={setupIsActive}
      />
    </div>
  );
};
