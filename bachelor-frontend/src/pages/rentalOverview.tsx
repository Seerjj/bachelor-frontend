import React from "react";
import { Table } from "semantic-ui-react";

const RentalOverview: React.FC = () => {
  return (
    <div id="tableContainer">
      <Table striped fixed celled >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={5}>Rented Houses</Table.HeaderCell>
            <Table.HeaderCell width={5}>Purchase Status</Table.HeaderCell>
            <Table.HeaderCell width={5}>Setup Address</Table.HeaderCell>
            <Table.HeaderCell width={5}>Estimated Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell> 'PUT THE HOUSE ID(S) HERE' </Table.Cell>
            <Table.Cell> 'PURCHASED/ NOT PURCHASED/ RENT' </Table.Cell>
            <Table.Cell> 'ADDRESS OF SET UP' </Table.Cell>
            <Table.Cell> 'ESTIMATED PRICE OF THE HOUSE' </Table.Cell>
          </Table.Row>
          
          <Table.Row>
            <Table.Cell> 'PUT THE HOUSE ID(S) HERE' </Table.Cell>
            <Table.Cell> 'PURCHASED/ NOT PURCHASED/ RENT' </Table.Cell>
            <Table.Cell> 'ADDRESS OF SET UP' </Table.Cell>
            <Table.Cell> 'ESTIMATED PRICE OF THE HOUSE' </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell> 'PUT THE HOUSE ID(S) HERE' </Table.Cell>
            <Table.Cell> 'PURCHASED/ NOT PURCHASED/ RENT' </Table.Cell>
            <Table.Cell> 'ADDRESS OF SET UP' </Table.Cell>
            <Table.Cell> 'ESTIMATED PRICE OF THE HOUSE' </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell> 'PUT THE HOUSE ID(S) HERE' </Table.Cell>
            <Table.Cell> 'PURCHASED/ NOT PURCHASED/ RENT' </Table.Cell>
            <Table.Cell> 'ADDRESS OF SET UP' </Table.Cell>
            <Table.Cell> 'ESTIMATED PRICE OF THE HOUSE' </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell> 'PUT THE HOUSE ID(S) HERE' </Table.Cell>
            <Table.Cell> 'PURCHASED/ NOT PURCHASED/ RENT' </Table.Cell>
            <Table.Cell> 'ADDRESS OF SET UP' </Table.Cell>
            <Table.Cell> 'ESTIMATED PRICE OF THE HOUSE' </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell> 'PUT THE HOUSE ID(S) HERE' </Table.Cell>
            <Table.Cell> 'PURCHASED/ NOT PURCHASED/ RENT' </Table.Cell>
            <Table.Cell> 'ADDRESS OF SET UP' </Table.Cell>
            <Table.Cell> 'ESTIMATED PRICE OF THE HOUSE' </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell> 'PUT THE HOUSE ID(S) HERE' </Table.Cell>
            <Table.Cell> 'PURCHASED/ NOT PURCHASED/ RENT' </Table.Cell>
            <Table.Cell> 'ADDRESS OF SET UP' </Table.Cell>
            <Table.Cell> 'ESTIMATED PRICE OF THE HOUSE' </Table.Cell>
          </Table.Row>

        </Table.Body>
      </Table>
    </div>
  );
};

export default RentalOverview;
