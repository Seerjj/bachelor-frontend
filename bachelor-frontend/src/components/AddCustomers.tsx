import * as React from "react";
import { Form } from "semantic-ui-react";

const AddCustomersForm: React.FC = () => {
  return (
    <div>
      <Form>
        <Form.Group widths="equal">
          <Form.Input label="Company Name" placeholder="Company Name" />
          <Form.Input label="Contact Person" placeholder="Contact Person" />
        </Form.Group>
        <Form.Group inline widths="equal">
          <Form.Input fluid label="Town" placeholder="Town" />
          <Form.Input fluid label="Street" placeholder="Street" />
          <Form.Input fluid label="Postal Code" placeholder="Postal Code" />
        </Form.Group>
        <Form.Button>Add</Form.Button>
      </Form>
    </div>
  );
};

export default AddCustomersForm;
