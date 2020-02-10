import React, { Component } from 'react';
import { FaGithubAlt, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Form, Button, List } from './styles';
import Container from '../../components/Container';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    error: null,
  };

  async componentDidMount() {
    const repositories = await localStorage.getItem('repositories');

    if (repositories) {
      this.setState({
        repositories: JSON.parse(repositories),
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleForm = async e => {
    e.preventDefault();

    const { newRepo, repositories } = this.state;

    try {
      if (newRepo === '') {
        this.setState({
          error: true,
        });

        throw new Error('');
      }

      const check = repositories.find(repo => repo === newRepo);

      if (check) {
        throw new Error('Exist repositorie');
      }

      const response = await api.get(`/repos/${newRepo}`);

      this.setState({
        newRepo: '',
        repositories: [...repositories, response.data],
      });
    } catch (err) {
      this.setState({
        newRepo: '',
      });
    }
  };

  handleInput = e => {
    this.setState({
      newRepo: e.target.value,
    });
  };

  render() {
    const { newRepo, repositories, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt size={25} />
          Github repository
        </h1>
        <Form onSubmit={this.handleForm} error={error}>
          <input type="text" value={newRepo} onChange={this.handleInput} />
          <Button>
            <FaPlus stize={15} color="#FFF" />
          </Button>
        </Form>
        <List>
          {repositories.map(repositorie => (
            <li key={repositorie.name}>
              {repositorie.full_name}
              <Link
                to={`/repositories/${encodeURIComponent(
                  repositorie.full_name
                )}`}
              >
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
