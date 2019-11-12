import * as React from "react";
import { Form } from "semantic-ui-react";

const AddMaterialsForm: React.FC = () => {
  return (
    <div>
      <Form>
        <Form.Group inline widths="equal">
          <Form.Input fluid label="Name" placeholder="Name" />
          <Form.Input fluid label="Category" placeholder="Category" />
        </Form.Group>
        <Form.Group inline widths="equal">
          <Form.Input fluid label="House Section" placeholder="House Section" />
          <Form.Input fluid label="Supplier" placeholder="Supplier" />
        </Form.Group>
        <Form.Group inline widths="equal">
          <Form.Input fluid label="Units" placeholder="Units" />
          <Form.Input fluid label="Price per Unit" placeholder="price per unit" />
        </Form.Group>
        <Form.Button>Add</Form.Button>
      </Form>
    </div>
  );
};

export default AddMaterialsForm;
