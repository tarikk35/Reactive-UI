import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/user";
import { toast } from "react-toastify";
import { combineValidators, isRequired } from "revalidate";

const validate = combineValidators({
  email: isRequired("email"),
  username: isRequired("username"),
  displayname: isRequired("display name"),
  password: isRequired("password")
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) => {
        register(values).catch(err => {
          toast.error(err.data[Object.keys(err.data)[0]][0]);
        });
      }}
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        invalid,
        pristine,
        dirtyFieldsSinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit}>
          <Header
            as="h2"
            content="Sign up to Reactive"
            color="teal"
            textAlign="center"
          ></Header>
          <Field
            name="displayname"
            component={TextInput}
            placeholder="Display name"
          ></Field>
          <Field
            name="username"
            component={TextInput}
            placeholder="User name"
          ></Field>
          <Field name="email" component={TextInput} placeholder="Email"></Field>

          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
            inputType={"password"}
          ></Field>

          <br />
          <br />
          <Button
            disabled={invalid || (pristine && !dirtyFieldsSinceLastSubmit)}
            loading={submitting}
            color="teal"
            content="Register"
            fluid
          ></Button>

          {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
        </Form>
      )}
    ></FinalForm>
  );
};

export default RegisterForm;
