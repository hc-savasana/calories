import React, { Component } from 'react';
  import Header from './Header.jsx';
  
  
  const API_URL = 'https://api.edamam.com/api/food-database/parser?ingr=';
   const apiKey = "&app_id=6faf9cc7&app_key=5c9b29569582527e3c87130f130cb58d";
  
  class FoodSearch extends Component {
    constructor(props) {
      super(props);
      this.state = {
        entry: '',
        hints: '',
      }
      }
      
      /*
      componentWillReceiveProps(nextProps) {
      this.setState({
        hints: this.props.items,
      });
      };
  */
  
   findAndReplace(string, target, replacement) {
    for (var i = 0; i < string.length; i++) {
      s = string.replace(target, replacement);
    }
    return string;
  }
  
  
   fetchHints = ingredient => {
    var ing = findAndReplace(ingredient, " ", "%20");
      const url =  `${apiURL}${ing}${apiKey}`;
      fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          hints: data
          });
        })
  };
  
    render() 
    {
      return (
          <div>
          <Header />
          <input 
            type="text" 
            className="input" 
            placeholder="Search..." 
          />
          <div className="content">
            <div className="container">
              <section className="section">
                <ul>
                  <li>stuff</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )
      }
    }
  export default FoodSearch;