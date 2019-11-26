import React from "react";
import { Container } from "semantic-ui-react";
import { StyleSheet } from "../../app/models/StyleSheet";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container style={styles.container}>
      <h1>Home Page</h1>
      <h3>
        Go to <Link to="/activities">Activities</Link>
      </h3>
    </Container>
  );
};

const styles: StyleSheet = {
  container: {
    marginTop: "7em"
  }
};

export default observer(HomePage);
