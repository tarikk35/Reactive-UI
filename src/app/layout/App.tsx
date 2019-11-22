import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../../models/activity';
import NavBar from '../../features/nav/navbar';
import { StyleSheet } from '../../models/StyleSheet';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';

// Hooks needs useState and useEffect. Hooks reduce the boilerplate codes and makes it simpler.
const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]); // We defined the state object and setState method.
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
    setEditMode(false)
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)])
  }

  useEffect(() => { // useEffect combines componentDidMount, componentDidUpdate and componentWillUnmount 
    axios.get<IActivity[]>('http://localhost:5000/api/Activities').then((response) => {
      let activities: IActivity[] = []
      response.data.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      })
      setActivities(activities);
    });
  }, []); // adding second parameter as an empty array, we prevent the infinite loop of fetching when the UI renders again (componentDidMount).

  return (
    // Fragment is useful when we want to return multiple elements but we dont need to style the surrounding div
    // To override type-safety of TypeScript, add '!' after the variable
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm}></NavBar>
      <Container style={styles.container}>
        <ActivityDashboard activities={activities}
          selectActivity={handleSelectActivity}
          setSelectedActivity={setSelectedActivity}
          selectedActivity={selectedActivity}
          deleteActivity={handleDeleteActivity}
          editMode={editMode}
          setEditMode={setEditMode}></ActivityDashboard>
      </Container>
    </Fragment>
  );
}

const styles: StyleSheet = {
  container: {
    marginTop: '7em'
  }
}

export default App;
