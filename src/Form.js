import React, { Component } from 'react';
/*
Goal: The main goal here was to produce a 

Assumptions:
Form does not need to store data after vailidation


*/

class reactForm extends Component {
    /* We use a controlled form component which stores the form state in the react.js component, as none of these fields are read only (i.e no files) we do not have to use uncontrolled componets which needs the state to be left to the form*/
    
  constructor(props){
      super(props);
      this.state = {
          //store form values in real time!
          person: "",
          oscars:"",
          degrees: "",
          submited: false,
          viewed: {
              //store if object has been visited, makes error messages not appear until user has interacted with the field
              person: false,
              oscars: false,
              degrees: false,
          },
    
      };
     //bind event handlers
      this.handleChange = this.handleChange.bind(this);
      this.handleFocus = this.handleFocus.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.newForm = this.newForm.bind(this);

      }
    handleChange(event) {
        
        //get the target of the input change
        const target = event.target;
        //get the new value
        const value = target.value;
        //get the name of the field
        const name = target.name;
        this.setState({
            [name]: value,
                      });
        
  }
    handleFocus(event){
        /*let the state know if an object has been visited to provide user with a polite reminder on input parameters*/
        const name=event.target.name;
       //get old list state
        var viewed = this.state.viewed;
        //update
        viewed[name]=true
        this.setState({
            viewed:viewed
        })
    }
    handleSubmit(event){
        //send to backend and database would go here!
        this.setState(
        {submited:true}
        );
        
    }
    newForm(event){
        this.setState({
        //store form values in real time!
          person: "",
          oscars:"",
          degrees: "",
          submited: false,
          viewed: {
              //store if object has been visited, makes error messages not appear until user has interacted with the field
              person: false,
              oscars: false,
              degrees: false,
          },
        });
    }

  validate(person, oscars,degrees){
      /* all fields require input*/
      return{
          /*numbers and special characters allowed for names 
          for pysdonyms and the 3rds etc.*/
          person: (person.length > 0  ),
          /*eliminates negatives and-non numbers*/
          oscars: (oscars.length > 0 && oscars>=0),
          /*submission must be between 1-6, everyone is within 6 degrees of each other*/
          degrees:(degrees.length > 0 && degrees>=0 &&degrees<=6)
      };
  }
    
      
  
  render() {
      
    const { person, oscars, degrees } = this.state;
    const errors = this.validate(person,oscars,degrees);
    
    
   const isEnabled = 
         //looping could be used for larger forms
       errors.person && errors.oscars && errors.degrees;
      //Determines if error should be display
      
   const errorMark =(field)=>{
       //gets if the selected field is marked valid
       const valid= errors[field];
       //gets if the field has been visited, else it would mark error on load
       const viewed=this.state.viewed[field];
       //return if invalid and viewed
       return !valid && viewed;
   }
    
    return (
        /* declare form wraper*/
      <div id="formbody">
       { !this.state.submited?(
        <div>
        <h1>The Bacon Effect</h1>
        <p> They say everyone is within 6 connections, or degrees, of Kevin Bacon </p>
        <form>
        <label>
        Actor or Actress<br/>
            <input
            name="person" 
            type="text" 
            value={this.state.person}
            onFocus={this.handleFocus}
            onChange={this.handleChange}/>
        </label>
        <br/>
        <small className={errorMark('person')? "":"hidden"}>Please Input a Name</small>
 <br/>
        <label>
         Number of Oscars Won<br/>
         <input
            name="oscars" 
            type="text"
            value={this.state.oscars} 
            onFocus={this.handleFocus}
            onChange={this.handleChange}/>
        </label>
 <br/>
        <small className={errorMark('oscars')? "":"hidden"}>Please input a number greater than or equal to 0</small>
       <br/>
        <label>
   Degrees from Kevin Bacon<br/>         
     <input
            name="degrees" 
            type="text"
            value={this.state.degrees} 
            onFocus={this.handleFocus}
            onChange={this.handleChange}/>
            
        </label>
        
<br/>
<small className={errorMark('degrees')? "":"hidden"}> Please enter a number between 1 and 6</small>
        <br/>
        
         <button  
         disabled={!isEnabled}  
         type="submit" 
         value="Submit"
         onClick={this.handleSubmit}
          >
             Submit
             </button>

        </form>
      </div>
):( <div>
   <h1> Thank you for your submisssion </h1>
    <h2 >Actor or Actress Name:</h2>
     <h2 className="submitted"> {this.state.person}</h2>
   <h2>Number of Oscars Won:</h2>
    <h2 className="submitted"> {this.state.oscars}</h2>
   <h2>Degrees From Kevin Bacon: </h2>
    <h2 className="submitted"> {this.state.degrees}</h2>
    <button onClick={this.newForm}>
     Submit Another?
    </button>
   </div>
 )}
</div>
    );
  }
}

export default reactForm;
