import React from 'react'
import { Table } from 'semantic-ui-react'

const Customers: React.FC = () => {
    return (
      <div>
        <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Contact Number</Table.HeaderCell>
            <Table.HeaderCell>Contact Person</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Row textAlign='left'>
            <Table.Cell>Textile Vault</Table.Cell>
            <Table.Cell>Vestergade 33, Kokkedal</Table.Cell>
            <Table.Cell>+45 81 64 35 69</Table.Cell>
            <Table.Cell>Simon S. Vestergaard</Table.Cell>
        </Table.Row>

        <Table.Row textAlign='left'>
            <Table.Cell>Fiber Metrics</Table.Cell>
            <Table.Cell>Tarupvej 3, Kirke Hyllinge</Table.Cell>
            <Table.Cell>+45 61 95 59 23</Table.Cell>
            <Table.Cell>Frederik F. Madsen</Table.Cell>
        </Table.Row>

        <Table.Row textAlign='left'>
            <Table.Cell>Material King</Table.Cell>
            <Table.Cell>VHans Schacksvej 32, Skødstrup</Table.Cell>
            <Table.Cell>+45 42 19 37 46</Table.Cell>
            <Table.Cell>Benjamin E. Schultz</Table.Cell>
        </Table.Row>

        </Table>
      </div>
    );
  };
  
  export default Customers;
  