import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import { StyleSheet } from '../../models/StyleSheet'

interface IProps {
    openCreateForm: () => void;
}

const NavBar: React.FC<IProps> = ({ openCreateForm }) => {
    return (
        // fixed removes paddings and margins
        // positive button means green button
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header >
                    <img src='/assets/logo.png' alt='logo' style={styles.logo}></img>
                    Reactive
                </Menu.Item>
                <Menu.Item name='Activities' ></Menu.Item>
                <Menu.Item>
                    <Button onClick={() => openCreateForm()} positive content='Create Activity'></Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

// Created stylesheet-like interface to organize styles inside the variable
const styles: StyleSheet = {
    logo: {
        marginRight: 20
    },
};

export default NavBar
