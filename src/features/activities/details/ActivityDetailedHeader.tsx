import React, { useContext } from "react";
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { StyleSheet } from "../../../app/models/StyleSheet";
import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ActivityDetailedHeader: React.FC<{ activity: IActivity }> = ({
  activity
}) => {
  const rootStore = useContext(RootStoreContext);
  const { attendActivity, unattendActivity, loading } = rootStore.activityStore;
  const host = activity.attendees.filter(x => x.isHost)[0];

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
                <p>{format(activity.date, "eeee do MMMM")}</p>
                <p>
                  Hosted by{" "}
                  <Link to={`/profile/${host.userName}`}>
                    <strong>{host.displayName}</strong>
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {activity.isHost ? (
          <Button
            as={Link}
            to={`/manage/${activity.id}`}
            color="yellow"
            floated="right"
          >
            Manage Event
          </Button>
        ) : activity.isGoing ? (
          <Button
            loading={loading}
            onClick={unattendActivity}
            color="google plus"
          >
            Cancel attendance
          </Button>
        ) : (
          <Button loading={loading} onClick={attendActivity} color="teal">
            Join Activity
          </Button>
        )}
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
