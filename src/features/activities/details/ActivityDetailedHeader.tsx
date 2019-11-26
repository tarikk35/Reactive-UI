import React from "react";
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { StyleSheet } from "../../../app/models/StyleSheet";
import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";

const ActivityDetailedHeader: React.FC<{ activity: IActivity }> = ({
  activity
}) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          style={styles.activityImage}
          src={`/assets/${activity.category}.jpg`}
          fluid
        />
        <Segment basic style={styles.activityImageText}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{activity.date}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="google plus">Cancel attendance</Button>
        <Button color="teal">Join Activity</Button>
        <Button color="yellow" floated="right">
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

const styles: StyleSheet = {
  activityImage: {
    filter: "brightness(40%)"
  },

  activityImageText: {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "100%",
    height: "auto",
    color: "white"
  }
};

export default observer(ActivityDetailedHeader);
