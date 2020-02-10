import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import api from '../../services/api';

import { Header, Loading, IssuesList, Arrows, TypeIssue } from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repositorie: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repo: {},
    loading: true,
    issues: [],
    page: 1,
    typeLoad: [
      { type: 'all', label: 'Todas', current: true },
      { type: 'closed', label: 'Fechados', current: false },
      { type: 'open', label: 'Abertos', current: false },
    ],
    btnSelect: 0,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repositorie);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repo: repository.data,
      loading: false,
      issues: issues.data,
    });
  }

  handleArrows = type => {
    const { page } = this.state;
    let newPage = page;

    if (type === 'next') {
      newPage += 1;
    } else if (type === 'back' && newPage !== 1) {
      newPage -= 1;
    }

    this.loadIssue(newPage);
  };

  loadIssue = async page => {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repositorie);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        per_page: 5,
        page,
      },
    });

    this.setState({
      page,
      issues: issues.data,
    });
  };

  handleType = async index => {
    const { match } = this.props;
    const { typeLoad } = this.state;

    const repoName = decodeURIComponent(match.params.repositorie);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: typeLoad[index].type,
        per_page: 5,
      },
    });

    this.setState({
      issues: issues.data,
      btnSelect: index,
    });
  };

  render() {
    const { repo, loading, issues, page, typeLoad, btnSelect } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Header>
          <h2>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            {repo.full_name}
          </h2>
          <p>{repo.description}</p>
        </Header>
        <TypeIssue current={btnSelect}>
          {typeLoad.map((type, index) => (
            <button
              key={type.type}
              onClick={() => this.handleType(index)}
              type="submit"
            >
              {type.label}
            </button>
          ))}
        </TypeIssue>
        <IssuesList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <p key={label.id}>{label.name}</p>
                  ))}
                </strong>
                <small>{issue.user.login}</small>
              </div>
            </li>
          ))}
          <Arrows>
            <button
              onClick={() => this.handleArrows('back')}
              type="submit"
              disabled={page < 2}
            >
              <FaArrowLeft size={20} color="#3d7bff" />
            </button>

            <button onClick={() => this.handleArrows('next')} type="submit">
              <FaArrowRight size={20} color="#3d7bff" />
            </button>
          </Arrows>
        </IssuesList>
      </Container>
    );
  }
}
