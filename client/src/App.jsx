import React, { Component } from 'react'
// RHL only for front end development
import { hot } from 'react-hot-loader'

import BMI from './components/BMI.jsx'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import TotalCalories from './components/TotalCalories.jsx'
import FoodSearch from './components/FoodSearch.jsx'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      Info: []
    }
    this.getData = this.getData.bind(this)
    this.postData = this.postData.bind(this)
    // this.addEntry = this.addEntry.bind(this);
  }

  componentDidMount () {
    this.getData('/userInfo')
  }

  // fetchData = async () => {
  //   const response
  // }

  getData (url = '') {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          Info: data
        })
      })
      .catch(err => console.error(err))
  }

  postData (url = '', data = {}) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(() => this.getData(url))
      .catch(err => console.error(err))
  }

  getDataCaloriesNeeded (url = '') {
    return fetch(url)
      .then(response => response.json())
      .then(dataCaloriesNeeded => {
        this.setState({
          Info: dataCaloriesNeeded
        })
      })
      .catch(err => console.error(err))
  }

  /*
  addEntry(name, height, weight, gender) {
    let { Info } = this.state;
      const newItem = {
        name,
        height,
        weight,
        gender,
      };
    const existingIndex = Info.findIndex(
      Info.push(newItem)
      this.setState({
        Info,
      });
    }

*/

  render () {
    const { Info } = this.state
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/BMI' render={(props) => <BMI {...props} postData={this.postData} />} />
            <Route exact path='/TotalCalories' component={TotalCalories} />
            <Route exact path='/FoodSearch' render={(props) => <FoodSearch {...props} postData={this.postData} />} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

// hot export works with RHL. Remove line 11 when starting fullstack integration
export default hot(module)(App)
// Uncomment line 13 & delete line 11 when starting fullstack integration
// export default App;
