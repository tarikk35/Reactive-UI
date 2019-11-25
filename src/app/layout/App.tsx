import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../../models/activity';
import NavBar from '../../features/nav/navbar';
import { StyleSheet } from '../../models/StyleSheet';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';

// Hooks needs useState and useEffect. Hooks reduce the boilerplate codes and makes it simpler.

// TODO: if Deleted activity is currently editing/detailed, remove it from active activity 
const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]); // We defined the state object and setState method.
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
    setEditMode(false)
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true)
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity])
      setSelectedActivity(activity)
      setEditMode(false)
    }).then(() => setSubmitting(false))
  }

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true)
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity])
      setSelectedActivity(activity)
      setEditMode(false)
    }).then(() => setSubmitting(false))
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true)
    setTarget(event.currentTarget.name)
    agent.Activities.delete(id).then(() => { setActivities([...activities.filter(a => a.id !== id)]) }
    ).then(() => setSubmitting(false))
  }

  useEffect(() => { // useEffect combines componentDidMount, componentDidUpdate and componentWillUnmount 
    agent.Activities.list().then((response) => {
      let activities: IActivity[] = []
      response.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      })
      setActivities(activities);
    }).then(() => setLoading(false));
  }, []); // adding second parameter as an empty array, we prevent the infinite loop of fetching when the UI renders again (componentDidMount).

  if (loading) return <LoadingComponent content='Loading Activities near you...'></LoadingComponent>

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
          setEditMode={setEditMode}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          submitting={submitting}
          target={target}></ActivityDashboard>
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
