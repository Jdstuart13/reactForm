import React, { Component } from 'react';


class smrtForm extends Component {
    /* We use a controlled form component which stores the form state in the react.js component, as none of these fields are read only (i.e no files) we do not have to use uncontrolled componets which needs the state to be left to the form*/
    
  constructor(props){
      super(props);
      this.state = {
          //store form values in real time!
          person: "",
          oscars:"",
          degrees: "",
          viewed: {
              //store error state
              person: false,
              oscars: false,
              degrees: false,
          },
    
      };
 
      this.handleChange = this.handleChange.bind(this);
      this.handleFocus = this.handleFocus.bind(this);
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
        const name=event.target.name;
        var viewed = this.state.viewed;
        viewed[name]=true
        this.setState({
            viewed:viewed
        })
    }
    handleSubmitHover(event){
        console.log("ding");
        var viewed=this.state.viewed.map(viewed=true)
        this.setState({
            viewed:viewed
        })
    }

  validate(person, oscars,degrees){
      return{
          person: (person.length > 0  ),
          oscars: (oscars.length > 0 && oscars>=0),
          degrees:(degrees.length > 0 && degrees>=0 &&degrees<=6)
      };
  }
    
      
  
  render() {
    const { person, oscars, degrees } = this.state;
    const errors = this.validate(person,oscars,degrees);
    
    
   const isEnabled =
       errors.person && errors.oscars &&errors.degrees;
      //Determines if error should be display
   const errorMark =(field)=>{
       //
       const valid= errors[field];
       const viewed=this.state.viewed[field];
       return !valid && viewed;
   }
    
    return (
        
      <div id="formbody">
        
        <h1>The Bacon Effect</h1>
        <p> They say everyone is within 6 connections, or degrees, of Kevin Bacon </p>
        <form>
        <label>
        Actor or Actress<br/>
            <input
            name="person" 
            type="text" 
            value={this.state.person}
            //className={errorMark('person')? "error":''}
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
            //className={errorMark('oscars')? "error":''}
            value={this.state.oscars} 
            onFocus={this.handleFocus}
            onChange={this.handleChange}/>
        </label>
 <br/>
        <small className={errorMark('oscars')? "":"hidden"}>Input a number greater than or equal to 0</small>
       <br/>
        <label>
   Degrees from Kevin Bacon?<br/>         
     <input
            name="degrees" 
            type="text"
            //className={errorMark('oscars')? "error":''}
            value={this.state.degrees} 
            onFocus={this.handleFocus}
            onChange={this.handleChange}/>
            
        </label>
        
<br/>
<small className={errorMark('degrees')? "":"hidden"}>Enter a number between 1 and 6</small>
        <br/>
        
         <button  
         disabled={!isEnabled}  
         type="submit" 
          >
             Submit
             </button>

        </form>
      </div>
    );
  }
}

export default smrtForm;
