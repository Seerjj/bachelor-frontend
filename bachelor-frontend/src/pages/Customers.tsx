import React, { useEffect, useState, useReducer } from "react";
import { Customer } from "../lib/definitions/types";
import { doFetch, getProp } from "../lib/functions/general_funcs";
import { FMURL } from "../lib/definitions/enums";
import { async } from "q";
import { RouteComponentProps, Link } from "react-router-dom";
import { Table, Accordion, Form, Button } from "semantic-ui-react";
import { CustomerInformation } from "./CustomerInformation";

export const Customers: React.FC = () => {
  const [currentCustomer, setCurrentCustomer] = useState<Customer>();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>("");
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

  async function fetchCustomers() {
    setIsFetching(true);
    const res = await fetch(FMURL.Customers);
    res.json().then(
      res => {
        setCustomers(res);
        setIsFetching(false);
      },
      res => {
        setModalText(res.Message);
        setShowModal(true);
        setIsFetching(false);
      }
    );
  }

  useEffect(() => {
    fetchCustomers();
  });
  function handleCustomerClick(customer: Customer) {
    setSetupIsActive(false);
    setCurrentCustomer(customer);
  }

  return (
    <div>
      <Table
        onRowClick={handleCustomerClick}
        // columns={columns}
        // rows={customers}
        setRows={setCustomers}
        pagination="menu"
        searchable
        selectedRow={currentCustomer}
      >
        {customers.map(customer => (
          <Table.Row>
            <Table.Cell>{customer.customerId}</Table.Cell>
            <Table.Cell>{customer.companyName}</Table.Cell>
            <Table.Cell>{customer.companyTown}</Table.Cell>
            <Table.Cell>{customer.companyStreet}</Table.Cell>
            <Table.Cell>{customer.companyPostalCode}</Table.Cell>
            <Table.Cell>{customer.contactNumber}</Table.Cell>
            <Table.Cell>{customer.contactPerson}</Table.Cell>
          </Table.Row>
        ))}
      </Table>
      <CustomerInformation
         currentCustomer={currentCustomer}
         onNewCurrentCustomer={setCurrentCustomer}
         setupIsActive={setupIsActive}
         onSetupStateChange={setSetupIsActive}
         fetchCustomers={fetchCustomers}
       /> 
    </div>
  );
};


  

