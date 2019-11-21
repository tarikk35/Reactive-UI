import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import { IActivity } from '../../../models/activity'

interface IProps {
    activity: IActivity;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}

export const ActivityDetails: React.FC<IProps> = ({ activity, setEditMode, setSelectedActivity }) => {
    console.log(activity.category);
    return (
        <Card fluid>
            <Image src={`/assets/${activity.category}.jpg`} wrapped ui={false}></Image>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span >{activity.date}</span>
                </Card.Meta>
                <Card.Description>{activity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic color='red' content='Cancel' onClick={() => setSelectedActivity(null)}></Button>
                    <Button basic color='blue' content='Edit' onClick={() => setEditMode(true)}></Button>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}
