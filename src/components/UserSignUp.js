import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from './Form';
import { Context } from '../Context';


// Stateful function component that creates and adds user data 
const UserSignUp = ()=> {
    let history = useHistory();
    const context = useContext(Context);

    
   
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    // Change function that updates elements values on change event
    const change = (e) =>{
        const value = e.target.value;
        if (e.target.name === 'firstName') {
            setFirstName(value);
          }
          else if (e.target.name === 'lastName') {
            setLastName(value);
          }
          else if (e.target.name === 'emailAddress') {
            setEmailAddress(value);
          }
          else if (e.target.name === 'password') {
            setPassword(value);
          }
          else if (e.target.name === 'confirmPassword') {
            setConfirmPassword(value);
          }
          else {
            return;
          }
    }

     // Submit function that creates new authenticated user 
     const submit = () =>{
 
        const user =     {  
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors
       };
    context.data.createUser(user)
            .then(errors => {
                if(errors.length){
                    setErrors(errors);
                }else {
                   context.actions.signIn(emailAddress, password)
                   .then(() => {
                      history.push('/')
                   })
                    console.log(`${firstName} was successfully signed up!`)
                }
         })
          .catch(err => {
            console.log(err);
            history.push('/error')
         });
      }
   
    // Cancel function routes back to main page when button is clicked
    const cancel = () =>{
       history.push('/');
    }

    
    return(
        <div id="root">
         <main>
             <div className="form--centered">
                <h2>Sign Up</h2>
             <Form 
                cancel = {cancel}
                errors = {errors}
                submit = {submit}
                submitButtonText = "Sign Up"
                elements = {() => (
                    <React.Fragment>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName" 
                            name="firstName" 
                            type="text" 
                            label= "First Name"
                            onChange={change} 
                            value={firstName} />
                         <label htmlFor="lastName">Last Name</label>
                         <input
                            id="lastName" 
                            name="lastName" 
                            type="text" 
                            onChange={change} 
                            value={lastName} />
                         <label htmlFor="emailAddress">Email Address</label>  
                         <input
                            id="emailAddress" 
                            name="emailAddress" 
                            type="emailAddress" 
                            onChange={change} 
                            value={emailAddress} />
                         <label htmlFor="password">Password</label>      
                         <input
                            id="password" 
                            name="password" 
                            type="password" 
                            onChange={change} 
                            value={password} />
                         <label htmlFor="confirmPassword">Confirm Password</label>   
                         <input
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            onChange={change} 
                            value={confirmPassword} />             
                    </React.Fragment>
                )}
             />
                 <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
         </main>
        </div>
    )

 

}

export default UserSignUp;