import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_MESSAGES } from '../../Queries';
import Message from '../Message/Message';
import './styles/Styles.scss';

export default class Messages extends Component{
  constructor(props) {
      super(props);

      this.loadMore = this.loadMore.bind(this);

      this.state = {
          currentPage: 1,
      }
  }  

  loadMore() {
      const newPage = this.state.currentPage + 1 
      this.setState({ currentPage: newPage })
  }

  renderQueries() {
    const messages = [];
    for (let i = 1; i <= this.state.currentPage; ++i) {
      messages.push(
        <Query key={i} query={GET_MESSAGES} variables={{ page: i }}>
          {({ loading, error, data }) => {
            
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error!</p>;

            const messages = data.messages.list;

            return messages.map((message, key) => {
                  return <Message key={key} message={message} />;
                })
          }}
        </Query>
      );     
    }

    return messages;
  }

  renderLoadMore() {
    return (
      <Query query={GET_MESSAGES} variables={{ page: this.state.currentPage + 1 }}>
          {({loading, error, data }) => {
            
            if (loading) return null;
            if (error) return null;

            const messages = data.messages.list;

            const doesPageExist = messages.length > 0;

            return doesPageExist 
              ? <button className="btn btn-secondary" onClick={this.loadMore}>Load More</button>
              : null;
          }}
      </Query>
    )
  }

  render() {
    return (
      <div className="WorkPage">
        <div className="WorkPageContent">
          <h1>Messages</h1>

          <div className="Messages">
            { this.renderQueries() }            
          </div>
          { this.renderLoadMore() }
        </div>
      </div>
    );
  }
}