import React from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'

interface IProps {
    setEditMode: (editMode: boolean) => void;
}

export const ActivityForm: React.FC<IProps> = ({ setEditMode }) => {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title'></Form.Input>
                <Form.TextArea rows={2} placeholder='Description'></Form.TextArea>
                <Form.Input placeholder='Category'></Form.Input>
                <Form.Input type='date' placeholder='Date'></Form.Input>
                <Form.Input placeholder='City'></Form.Input>
                <Form.Input placeholder='Venue'></Form.Input>
                <Button floated='right' positive type='submit' content='Submit'></Button>
                <Button onClick={() => setEditMode(false)} floated='right' negative type='button' content='Cancel'></Button>
            </Form>
        </Segment>
    )
}
