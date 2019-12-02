import React, { useContext } from "react";
import { Menu, Container, Button, Image, Dropdown } from "semantic-ui-react";
import { StyleSheet } from "../../app/models/StyleSheet";
import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;

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
        {user && (
          <Menu.Item position="right">
            <Image avatar spaced="right" src={"/assets/user.png"}></Image>
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.username}`}
                  text="My profile"
                  icon="user"
                ></Dropdown.Item>
                <Dropdown.Item onClick={logout} text="Log out" icon="power"></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
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
