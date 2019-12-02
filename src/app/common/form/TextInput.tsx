import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {
  inputType: string;
}

const TextInput: React.FC<IProps> = ({
  input,
  width,
  type,
  inputType,
  placeholder,
  meta: { touched, error }
}) => {
  // if error exists, return true
  return (
    <Form.Field error={touched && !!error} width={width}>
      <input
        {...input}
        placeholder={placeholder}
        type={inputType === "password" ? "password" : "text"}
      ></input>
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
