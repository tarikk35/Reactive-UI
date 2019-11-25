import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { StyleSheet } from "../../app/models/StyleSheet";
import ActivityStore from "../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

const NavBar: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  return (
    // fixed removes paddings and margins
    // positive button means green button
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={styles.logo}></img>
          Reactive
        </Menu.Item>
        <Menu.Item name="Activities"></Menu.Item>
        <Menu.Item>
          <Button
            onClick={activityStore.openCreateForm}
            positive
            content="Create Activity"
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

// Created stylesheet-like interface to organize styles inside the variable
const styles: StyleSheet = {
  logo: {
    marginRight: 20
  }
};

export default observer(NavBar);
