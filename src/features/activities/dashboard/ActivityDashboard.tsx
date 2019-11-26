import React, { useEffect, useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import ActivityStore from "../../../app/stores/activityStore";

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); // adding second parameter as an empty array, we prevent the infinite loop of fetching when the UI renders again (componentDidMount).

  if (activityStore.loadingInitial)
    return (
      <LoadingComponent content="Loading Activities near you..."></LoadingComponent>
    );

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList></ActivityList>
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
