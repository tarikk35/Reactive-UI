import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../models/activity';
import { ActivityList } from './ActivityList';
import { ActivityDetails } from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editModel: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    deleteActivity: (id: string) => void;
}

export const ActivityDashboard: React.FC<IProps> = ({ deleteActivity, 
    setSelectedActivity, activities, selectActivity, selectedActivity, editMode, setEditMode }) => {
    // if selectedActivity is not null, ActivityDetails will show up.
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity}></ActivityList>
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode &&
                    <ActivityDetails setSelectedActivity={setSelectedActivity} activity={selectedActivity} setEditMode={setEditMode}></ActivityDetails>}
                {editMode && <ActivityForm key={selectedActivity && selectedActivity!.id || 0} activity={selectedActivity} setEditMode={setEditMode}></ActivityForm>}
            </Grid.Column>
        </Grid>
    )
}
