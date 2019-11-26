import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { Link } from "react-router-dom";

interface IDetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<IDetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity,
    loadActivity,
    loadingInitial
  } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity,match.params.id]);

  if (loadingInitial || !activity) {
    return <LoadingComponent content="Loading Activity..."></LoadingComponent>;
  }

  return (
    <Card fluid>
      <Image
        src={`/assets/${activity!.category}.jpg`}
        wrapped
        ui={false}
      ></Image>
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color="red"
            content="Cancel"
            onClick={() => history.push("/activities")}
          ></Button>
          <Button
            as={Link}
            to={`/manage/${activity.id}`}
            basic
            color="blue"
            content="Edit"
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
