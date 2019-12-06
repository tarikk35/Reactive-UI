import React from "react";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../app/models/activity";
import { format } from "date-fns";
import ActivityListItemAttendees from "./ActivityListItemAttendees";

export const ActivityListItem: React.FC<{ activity: IActivity }> = ({
  activity
}) => {
  const host = activity.attendees.filter(x => x.isHost)[0];
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src={host.image || "/assets/user.png"}
            ></Item.Image>
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted by <strong>{host.displayName}</strong>
              </Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label basic color="orange" content="You are hosting"></Label>
                </Item.Description>
              )}

              {activity.isGoing && !activity.isHost && (
                <Item.Description>
                  <Label basic color="green" content="You are going"></Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock"></Icon>
        {format(activity.date, "h:mm a")}
        <Icon name="marker"></Icon>
        {activity.venue} , {activity.city}
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendees
          attendees={activity.attendees}
        ></ActivityListItemAttendees>
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated="right"
          content="View"
          color="blue"
        ></Button>
      </Segment>
    </Segment.Group>
  );
};
