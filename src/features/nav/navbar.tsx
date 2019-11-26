import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { StyleSheet } from "../../app/models/StyleSheet";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    // fixed removes paddings and margins
    // positive button means green button
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img src="/assets/logo.png" alt="logo" style={styles.logo}></img>
          Reactive
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities"></Menu.Item>
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            as={NavLink}
            to="/createActivity"
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
