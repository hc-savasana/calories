import React, { Component } from "react";
import Header from "./Header.jsx";
import App from "../App.jsx";
import { timingSafeEqual } from "crypto";
import '../CSS/BMI.css';


class BMI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: " ",
      weight: " ",
      height: " ",
      gender: "female",
      BMI: " ",
      calories_needed: " ",
      ID: ""
    }
  this.handleInput = this.handleInput.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.calculateBMI = this.calculateBMI.bind(this);
  this.identifyingClient = this.identifyingClient.bind(this);
  }

  handleInput(e) {
    const { target } = e;
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }



  calculateBMI = function (height, weight) {
    let m = height*height;
    let result = (weight / m);
    return result.toFixed(1)
   }

  identifyingClient = function (BMI){

      let result = ""
   if(BMI < 18.5){
      result = "Underweight"
   } else if(BMI > 18.5 && BMI < 24.9){
     result = "Normal"
   } else if(BMI > 25 && BMI < 29.9) {
     result = "Overweight"
   } else {
     result = "Obese"
   }
   this.setState({
     ID: result
   })
   console.log("hello" + this.state.ID)
  }


handleSubmit(e) {
  e.preventDefault();
  var { name, weight, height, gender, BMI, calories_needed } = this.state;
  var BMI = this.calculateBMI(height, weight);
  this.identifyingClient(BMI);
  this.setState({
    BMI: BMI
  });
    if (gender === "male") {
      calories_needed = 2500;
    } else {
        calories_needed = 2000;
      }
  this.props.postData("/userInfo", {
    name: name,
    weight: weight,
    height: height,
    gender: gender,
    BMI: BMI,
    calories_needed: calories_needed
  });


  }


render() {

    const { name, weight, height, gender, calories_needed } = this.state;
    const BMI = this.state.BMI
    const ID = this.state.ID
    const { postData } = this.props;

    return (
      <div>
      <div>

     // CSS Header
      <div class="columns level-right">
        <div class="column is-two-fifths">
          <Header />
        </div>
      </div>

        // CSS BMI info submit
      <section class="section">
        <div class="field" class="columns">
          <div class="column is-one-quarter">
           <label class="label">
            <div class="control">
             NAME:{" "}
            <input class="input is-hovered"
             placeholder="Hovered input"
             type="text"
             name="name"
             value={name}
             onChange={this.handleInput}
            />
          </div>
         </label>
        </div>
      </div>

      <br />
        <div class="field" class="columns">
          <div class="column is-one-quarter">
           <label class="label">
            <div class="control">
             WEIGHT:{" "}
            <input class="input is-hovered"
             placeholder="Hovered input"
             type="text"
             name="weight"
             value={weight}
             onChange={this.handleInput}
            />
           </div>
         </label>
        </div>
      </div>

      <br />
       <div class="field" class="columns">
         <div class="column is-one-quarter">
          <label class="label">
           <div class="control">
             HEIGHT:{" "}
            <input class="input is-hovered"
             placeholder="Hovered input"
             type="text"
             name="height"
             value={height}
             onChange={this.handleInput}
           />
          </div>
         </label>
        </div>
       </div>

         <br />
         <div class="field">
         <div class="control">
         <label class="label">Select</label>
         <div class="select">
         <select
           class="input is-hovered"
           placeholder="Hovered input"
           name="gender"
           value={gender}
           onChange={this.handleInput}
           >
           <option value="female">FEMALE</option>
           <option value="male">MALE</option>
         </select>

        <br />
         <button class="input is-hovered" placeholder="Hovered input" onClick={ this.handleSubmit } >SUBMIT</button>
         </div>
        </div>
       </div>
      </section>

         <h1>Your BMI is: { this.state.BMI } </h1>
         {console.log(this.state.ID)}
         <h2>Your BMI is considered to be: { ID } </h2>
        </div>
        </div>
      );
   }
}

export default BMI;

      