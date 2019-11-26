import React, {  Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/navbar";
import { StyleSheet } from "../models/StyleSheet";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

// Hooks needs useState and useEffect. Hooks reduce the boilerplate codes and makes it simpler.

// TODO: if Deleted activity is currently editing/detailed, remove it from active activity
const App: React.FC<RouteComponentProps> = ({ location }) => {

  return (
    // Fragment is useful when we want to return multiple elements but we dont need to style the surrounding div
    // To override type-safety of TypeScript, add '!' after the variable
    <Fragment>
      <Route exact path="/" component={HomePage}></Route>
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar></NavBar>
            <Container style={styles.container}>
              <Route
                exact
                path="/activities"
                component={ActivityDashboard}
              ></Route>
              <Route path="/activities/:id" component={ActivityDetails}></Route>
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              ></Route>
            </Container>
          </Fragment>
        )}
      ></Route>
    </Fragment>
  );
};

const styles: StyleSheet = {
  container: {
    marginTop: "7em"
  }
};

export default withRouter(observer(App));
