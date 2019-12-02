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
  password: isRequired("password")
});

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) => {
        login(values).catch(err => {
          console.log(err);
          toast.error('Invalid username or password.');
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
            content="Login to Reactive"
            color="teal"
            textAlign="center"
          ></Header>
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
            content="Log in"
            fluid
          ></Button>

          {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
        </Form>
      )}
    ></FinalForm>
  );
};

export default LoginForm;
