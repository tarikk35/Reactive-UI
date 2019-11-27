import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import {
  IActivityFormValues,
  ActivityFormValues
} from "../../../app/models/activity";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";

interface IDetailParams {
  id: string;
}

// De-Structuring props
const ActivityForm: React.FC<RouteComponentProps<IDetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    // editActivity,
    // createActivity,
    submitting,
    loadActivity,
    activity: initialFormState
  } = activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  // After navigation, params.id changes and this causes useEffect to run again. Just check if we have
  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then(activity => {
          setActivity(new ActivityFormValues(activity));
        })
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    console.log(activity);
  };

  // const handleSubmit = () => {
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid()
  //     };
  //     createActivity(newActivity).then(() =>
  //       history.push(`/activities/${newActivity.id}`)
  //     );
  //   } else {
  //     editActivity(activity).then(() =>
  //       history.push(`/activities/${activity.id}`)
  //     );
  //   }
  // };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  placeholder="Title"
                  name="title"
                  value={activity.title}
                  component={TextInput}
                ></Field>
                <Field
                  rows={3}
                  placeholder="Description"
                  name="description"
                  component={TextAreaInput}
                  value={activity.description}
                ></Field>
                <Field
                  placeholder="Category"
                  options={category}
                  name="category"
                  component={SelectInput}
                  value={activity.category}
                ></Field>
                <Form.Group widths="equal">
                  <Field
                    placeholder="Date"
                    date={true}
                    name="date"
                    component={DateInput}
                    value={activity.date}
                  ></Field>
                  <Field
                    placeholder="Time"
                    time={true}
                    name="time"
                    component={DateInput}
                    value={activity.date}
                  ></Field>
                </Form.Group>
                <Field
                  placeholder="City"
                  name="city"
                  component={TextInput}
                  value={activity.city}
                ></Field>
                <Field
                  placeholder="Venue"
                  name="venue"
                  component={TextInput}
                  value={activity.venue}
                ></Field>
                <Button
                  loading={submitting}
                  disabled={loading}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                ></Button>
                <Button
                  onClick={() => history.push("/activities")}
                  floated="right"
                  disabled={loading}
                  negative
                  type="button"
                  content="Cancel"
                ></Button>
              </Form>
            )}
          ></FinalForm>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
