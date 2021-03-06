import React from "react";
import { List, Image, Popup } from "semantic-ui-react";
import { IAttendee } from "../../../app/models/activity";

interface IProps {
  attendees: IAttendee[];
}

const styles = {
  borderColor: "teal",
  borderWidth: 2
};

const ActivityListItemAttendees: React.FC<IProps> = ({ attendees }) => {
  return (
    <List horizontal>
      {attendees.map(attendee => (
        <List.Item key={attendee.userName}>
          <Popup
            header={attendee.displayName}
            trigger={
              <Image
                size="mini"
                circular
                bordered
                style={attendee.following ? styles : null}
                src={attendee.image || "/assets/user.png"}
              ></Image>
            }
          ></Popup>
        </List.Item>
      ))}
    </List>
  );
};

export default ActivityListItemAttendees;
