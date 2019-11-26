import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";

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
    editActivity,
    clearActivity,
    createActivity,
    submitting,
    loadActivity,
    activity: initialFormState
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: ""
  });

  // After navigation, params.id changes and this causes useEffect to run again. Just check if we have
  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(() => {
        initialFormState && setActivity(initialFormState);
      });
    }
    return () => {
      clearActivity();
    };
  }, [
    clearActivity,
    loadActivity,
    match.params.id,
    initialFormState,
    activity.id.length
  ]);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          name="title"
          value={activity.title}
          onChange={handleInputChange}
        ></Form.Input>
        <Form.TextArea
          rows={2}
          placeholder="Description"
          name="description"
          onChange={handleInputChange}
          value={activity.description}
        ></Form.TextArea>
        <Form.Input
          placeholder="Category"
          name="category"
          onChange={handleInputChange}
          value={activity.category}
        ></Form.Input>
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          name="date"
          onChange={handleInputChange}
          value={activity.date}
        ></Form.Input>
        <Form.Input
          placeholder="City"
          name="city"
          onChange={handleInputChange}
          value={activity.city}
        ></Form.Input>
        <Form.Input
          placeholder="Venue"
          name="venue"
          onChange={handleInputChange}
          value={activity.venue}
        ></Form.Input>
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        ></Button>
        <Button
          onClick={() => history.push("/activities")}
          floated="right"
          negative
          type="button"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
