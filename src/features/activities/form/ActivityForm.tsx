import React, { useState, FormEvent } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../models/activity'

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity | null;
}

export const ActivityForm: React.FC<IProps> = ({ setEditMode, activity: initialFormState }) => {

    const initForm = () => {
        if (initialFormState) {
            return initialFormState
        }
        else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    }

    const [activity, setActivity] = useState<IActivity>(initForm);

    const handleSubmit = () => {
        console.log(activity);
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' name='title' value={activity.title} onChange={handleInputChange}></Form.Input>
                <Form.TextArea rows={2} placeholder='Description' name='description' onChange={handleInputChange} value={activity.description}></Form.TextArea>
                <Form.Input placeholder='Category' name='category' onChange={handleInputChange} value={activity.category}></Form.Input>
                <Form.Input type='datetime-local' placeholder='Date' name='date' onChange={handleInputChange} value={activity.date}></Form.Input>
                <Form.Input placeholder='City' name='city' onChange={handleInputChange} value={activity.city}></Form.Input>
                <Form.Input placeholder='Venue' name='venue' onChange={handleInputChange} value={activity.venue}></Form.Input>
                <Button floated='right' positive type='submit' content='Submit'></Button>
                <Button onClick={() => setEditMode(false)} floated='right' negative type='button' content='Cancel'></Button>
            </Form>
        </Segment>
    )
}
