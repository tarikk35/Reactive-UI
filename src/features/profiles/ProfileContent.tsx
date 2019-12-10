import React from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileDescription from "./ProfileDescription";

const panes = [
  {
    menuItem: "About",
    render: () => <ProfileDescription></ProfileDescription>
  },
  { menuItem: "Photos", render: () => <ProfilePhotos></ProfilePhotos> },
  {
    menuItem: "Activities",
    render: () => <Tab.Pane>Activities Content</Tab.Pane>
  },
  {
    menuItem: "Followers",
    render: () => <Tab.Pane>Followers Content</Tab.Pane>
  },
  {
    menuItem: "Following",
    render: () => <Tab.Pane>Following Content</Tab.Pane>
  }
];

const ProfileContent = () => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    ></Tab>
  );
};

export default ProfileContent;
