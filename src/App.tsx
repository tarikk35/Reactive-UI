import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';

class App extends Component {
  state = {
    values: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/values').then((response) => {
      this.setState({
        values: response.data
      });
    });

  }

  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reactive</Header.Content>
        </Header>
        <List>
          {this.state.values.map((item: any) => {
            return (<List.Item key={item.id}>{item.name}</List.Item>);
          })}
        </List>
      </div>
    );
  }
}

export default App;
