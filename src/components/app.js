import React, { Component } from 'react';
import axios from 'axios';
// import Quote from 'quote.js';
import Quote from './quote';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: {}
    };
    this.getQuotes = this.getQuotes.bind(this)
  }

  getQuotes(){
    axios.get(`http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`)
    .then(res => {
      var quote = {
        author: res.data.quoteAuthor,
        text: res.data.quoteText,
        error: ""
      };
      if(!res.data.quoteAuthor && !res.data.quoteText){
        quote.error = "There was an error, try again!"
      } else if(!res.data.quoteAuthor) {
        quote = {
          author: "No Author Available",
          text: res.data.quoteText
        };
      } else if(!res.data.quoteText) {
        quote = {
          author: res.data.quoteAuthor,
          text: "No Quote Available"
        };
      }

      this.setState({quote: quote})
    });
  }

  componentDidMount() {
    this.getQuotes();
  }

  render() {
    return (
      <div className="quoteConainer">
        <Quote author={this.state.quote.author} text={this.state.quote.text} error={this.state.quote.error}/>
        <div className="row">
          <div className="col-md-10">
            <a className="twitter-share-button" href={`https://twitter.com/intent/tweet?text=${this.state.quote.author}: ${this.state.quote.text}`} target="_blank">
              Tweet
            </a>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary right" onClick={this.getQuotes}>
              New Quote!
            </button>
          </div>
        </div>
        <h3><a href=""></a></h3>
      </div>
    );
  }
}
