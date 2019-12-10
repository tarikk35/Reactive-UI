import React from "react";
import { IProfile } from "../../app/models/profile";
import { combineValidators, isRequired } from "revalidate";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import { Form, Button } from "semantic-ui-react";
import TextAreaInput from "../../app/common/form/TextAreaInput";

interface IProps {
  updateProfile: (profile: IProfile) => void;
  profile: IProfile;
}

const validate = combineValidators({
  displayName: isRequired("displayName")
});

const ProfileEditForm: React.FC<IProps> = ({ updateProfile, profile }) => {
  return (
    <FinalForm
      onSubmit={updateProfile}
      validate={validate}
      initialValues={profile!}
      render={({ handleSubmit, invalid, pristine, submitting }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Display Name"
            value={profile!.displayName}
          ></Field>
          <Field
            name="bio"
            component={TextAreaInput}
            placeholder="About me"
            value={profile!.bio}
          ></Field>
          <Button
            loading={submitting}
            floated="right"
            disabled={invalid || pristine}
            positive
            content="Update"
          ></Button>
        </Form>
      )}
    ></FinalForm>
  );
};

export default ProfileEditForm;
