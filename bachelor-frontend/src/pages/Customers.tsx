import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import { Customer } from "../lib/definitions/types";
import { doFetch } from "../lib/functions/general_funcs";
import { FMURL } from "../lib/definitions/enums";

export const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>("");

  useEffect(() => {
    const customer = require(FMURL.Customers);
    setCustomers(customer.json);
  }, []);

  function fetchCustomers() {
    setIsFetching(true);
    doFetch(
      "GET",
      FMURL.Customers,
      json => {
        setCustomers(json);
        setIsFetching(false);
      },
      json => {
        setModalText(json.Message);
        setShowModal(true);
        setIsFetching(false);
      },

      (error, stdMsg) => {
        setIsFetching(false);
        setModalText(stdMsg);
        setShowModal(true);
        setCustomers([]);
      }
    );
  }
  function refresh() {
    fetchCustomers();
  }
  // componentDidMount() {
  //   fetch("https://localhost:44320/api/customers", {
  //     method: "get",
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(json => {
  //       this.setState({
  //         values: json
  //       });
  //     });
  // }

  return (
    <div>
      <ul>
        {customers.map(customer => (
          <li>{customer.companyName}</li>
        ))}
      </ul>

      {/* <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.HeaderCell>Town</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Postal code</Table.HeaderCell>
            <Table.HeaderCell>Contact Number</Table.HeaderCell>
            <Table.HeaderCell>Contact Person</Table.HeaderCell>
          </Table.Row>
        </Table.Header> */}

      {/* {values.map(value => (
          <Table.Row key={value.valueId}>
            <Table.Cell>{value.companyName}</Table.Cell>
            <Table.Cell>{value.companyTown}</Table.Cell>
            <Table.Cell>{value.companyStreet}</Table.Cell>
            <Table.Cell>{value.companyPostalCode}</Table.Cell>
            <Table.Cell>{value.contactNumber}</Table.Cell>
            <Table.Cell>{value.contactPerson}</Table.Cell>
          </Table.Row>
        ))} */}
      {/* </Table> */}
    </div>
  );
};
