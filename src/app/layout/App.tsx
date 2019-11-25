import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/navbar";
import { StyleSheet } from "../models/StyleSheet";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";

// Hooks needs useState and useEffect. Hooks reduce the boilerplate codes and makes it simpler.

// TODO: if Deleted activity is currently editing/detailed, remove it from active activity
const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); // adding second parameter as an empty array, we prevent the infinite loop of fetching when the UI renders again (componentDidMount).

  if (activityStore.loadingInitial)
    return (
      <LoadingComponent content="Loading Activities near you..."></LoadingComponent>
    );

  return (
    // Fragment is useful when we want to return multiple elements but we dont need to style the surrounding div
    // To override type-safety of TypeScript, add '!' after the variable
    <Fragment>
      <NavBar></NavBar>
      <Container style={styles.container}>
        <ActivityDashboard></ActivityDashboard>
      </Container>
    </Fragment>
  );
};

const styles: StyleSheet = {
  container: {
    marginTop: "7em"
  }
};

export default observer(App);
