import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { push } from "react-router-redux";
// import url from "../../../front_office/routes/url";
import renderHTML from 'react-render-html';
import { Form, FormGroup } from "reactstrap";
import { reduxForm, Field, propTypes as reduxFormPropTypes } from "redux-form";
import { Steps, Button, message, Spin, Icon, Checkbox } from 'antd';

import { loginCStoreActions } from './store';
import './style.local.scss';

import { saveToken, saveUser } from '../../../../libs/utils/auth_utils';
import config from "../../../../config"

const { Step } = Steps;

const steps = [
  {
    title: 'Pseudo',
  },
  {
    title: 'Mot de passe',
  },  
];


const antIcon = <Icon type="loading" style={{ fontSize: 18, color: "green" }} spin />

//  Validation statement
const required = value => (value || typeof value === 'number' ? undefined : 'Ce champ est requis');
export const minLength = min => value =>
  value && value.length < min ? `Minimun ${min} caractères requis ou plus` : undefined
export const minLength2 = minLength(2)
export const minLength6 = minLength(6)
const email = value => 
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Email invalide' : undefined
export const passwordMatch = (value, allValues) => 
  value !== allValues.register_password ? 'Les deux mot de passe doivent être identique' : undefined;


const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <input
      {...input}
      placeholder={placeholder}
      type={type}
      className="form-control"
    />
    {touched && (
      (error && 
        <span
          style={{
            paddingLeft: "0",
            paddingRight: "1em",
            color: "red",
            fontSize: "0.8em",
            fontStyle: "italic",
            fontWeight: "bold",
            display: "block",
            paddingTop: "8px",
            textAlign: "left"
          }}
        >
          { error }
        </span>
      )
    )}
    
  </div>
);



export default
@connect((state, props) => ({
  loginCStore: state.loginCStore,
}))
@reduxForm({ form: "login", enableReinitialize: true })
class Login extends React.Component {
  componentWillMount(){
    const title = `Login | ${config.name}`
    document.title = title
  }

  setRegisterForm(){
    this.props.dispatch(loginCStoreActions.setRegisterForm());

    // Réinitialise step of form
    this.props.dispatch(loginCStoreActions.setCurrentValue(0));
    // Réinitialize user user values
    this.props.dispatch(loginCStoreActions.setUserValue(null));
  }


  setLoginForm(){
    this.props.dispatch(loginCStoreActions.setLoginForm());
    this.props.dispatch(loginCStoreActions.setUnknwoUserMessage(null));
  }


  next(formValues) {
    const loading = true
    this.props.dispatch(loginCStoreActions.setBtnLoading(loading));

    const email = formValues.email
    const password = formValues.password
    // this.props.dispatch(loginCStoreActions.setEmail(email));
    const credentials = {
      email: email,
      password: password
    }


    // We will use axios there to fetch if user exits
    window.axios
      .post("/api/auth/login", credentials)
      .then(response => {
        this.props.dispatch(loginCStoreActions.setUnknwoUserMessage(null));
        console.log('response >> ', response);
        const loading = false
        this.props.dispatch(loginCStoreActions.setLoading(loading));

        let data = response.data.data

        // Save loggedIn user on localStorage
        saveUser(JSON.stringify(data.userprofile));

        // Save token on localStorage
        saveToken(data.token)
        let param = new URLSearchParams(this.props.location.search);
        console.log("param ", param.get('redirect'))

        if(!param.get('redirect')){
          window.location.href = "/"; 
        } else {
          window.location.href = param.get('redirect'); 
        }
      })
      .catch(error => {        
        const loading = false
        this.props.dispatch(loginCStoreActions.setLoading(loading));

        const message = error.response.data.message
        this.props.dispatch(loginCStoreActions.setUnknwoUserMessage(message));
      });
  }
      

  prev() {
    const current = this.props.loginCStore.current - 1;
    this.props.dispatch(loginCStoreActions.setCurrentValue(current));

    // Réinitialize user user values
    this.props.dispatch(loginCStoreActions.setUserValue(null));
    this.props.dispatch(loginCStoreActions.setUnknwoUserMessage(null));
  }


  _handleLogin(formValues){
    const loading = true
    this.props.dispatch(loginCStoreActions.setLoading(loading));

    const { email } = this.props.loginCStore
    const password = formValues.password
    const credentials = {
      email: email,
      password: password,
    };

    window.axios
      .post("/api/auth/login", credentials)
      .then(response => {
        this.props.dispatch(loginCStoreActions.setUnknwoUserMessage(null));
        console.log('response >> ', response);
        const loading = false
        this.props.dispatch(loginCStoreActions.setLoading(loading));

        let data = response.data.data

        // Save loggedIn user on localStorage
        saveUser(JSON.stringify(data.userprofile));

        // Save token on localStorage
        saveToken(data.token)
        let param = new URLSearchParams(this.props.location.search);
        console.log("param ", param.get('redirect'))

        if(!param.get('redirect')){
          window.location.href = "/"; 
        } else {
          window.location.href = param.get('redirect'); 
        }
      })
      .catch(error => {        
        const loading = false
        this.props.dispatch(loginCStoreActions.setLoading(loading));

        const message = error.response.data.message
        this.props.dispatch(loginCStoreActions.setUnknwoUserMessage(message));
      });

  }


  _handleRegister(formValues){
    console.log('FormValues register >>>', formValues);
    const loading = true
    this.props.dispatch(loginCStoreActions.setBtnLoading(loading));

    const data = {
      name: formValues.register_email,
      email: formValues.register_email,
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      password: formValues.register_password,
      password_confirmation: formValues.password_confirmation,
      birthdate: formValues.birthdate
    }


    window.axios
      .post("/api/auth/register", data)
      .then(response => {
        this.props.dispatch(loginCStoreActions.setUnknwoUserMessage(null));
        console.log('response >> ', response);
        const loading = false
        this.props.dispatch(loginCStoreActions.setBtnLoading(loading));

        window.location.href = "/login"; 
        /* if(this.props.location.search){
          window.location.href = "/"; 
        } else {
          let param = new URLSearchParams(this.props.location.search);
          window.location.href = param.get('redirect'); 
        } */
      })
      .catch(error => {        
        const loading = false
        this.props.dispatch(loginCStoreActions.setBtnLoading(loading));

        /* const message = error.response.data.message
        this.props.dispatch(loginCStoreActions.setUnknwoUserMessage(message)); */
      });
  }


  _handleEmailChange(val){
    this.props.dispatch(loginCStoreActions.setUnknwoUserMessage(null));
  }

  onCheckChange(e){
    this.props.dispatch(loginCStoreActions.setCheckBox(e.target.checked));
  }



  render() {
    const { current, loading, checked, user, 
            login, register, unknowMessage, 
            btnLoading, boxChecked, submitting, 
            pristine } = this.props.loginCStore;

    return (
      <div className="background">
        { btnLoading &&
        <div className="cover-spiner">
          <div className="whirly-loader" style={{ position: "absolute", left: "48%", top: "40%" }}></div>
        </div>}
        <div className="container">
        <div className="offset-3 col-md-6">
            <div className="btn-content" style={{ padding: "50px 0px 0px 0px" }}>
              <Button 
                className={ login ? "btn btn-outline-light btn-md connect active" : "btn btn-outline-light btn-md connect"}
                onClick={() => this.setLoginForm()}
              >
                Se connecter
              </Button>

              <Button 
                className={ register ? "btn btn-outline-light btn-md connect active" : "btn btn-outline-light btn-md connect" }
                style={{ paddingLeft: "35px", paddingRight: "35px" }}
                onClick={() => this.setRegisterForm()}
              >
                S'inscrire
              </Button>
            </div>
          </div>

          <div className="row" style={{ paddingTop: "30px" }}>
              { login == true &&
              <div id="block1" className="offset-3 col-md-6">
                <div id="blockLogin">
                  <h3 className="text-center connectTitle">Se connecter</h3>
                  
                  <div className="logoFgi">
                    <img src="/images/fgi.jpg" className="img-fluid" />
                  </div>

                  <div className="steps-content">
                    <Form>
                      {/* <label htmlFor="email">Email</label><br /> */}
                      <br />
                      <Field 
                        className="form-control"
                        component={renderField}
                        type="email"
                        label="Entrer votre email"
                        name="email"
                        autoFocus
                        validate={[required, email]}
                        onChange = {e => this._handleEmailChange(e)}
                        placeholder={"Email"}
                      />
                      {/* <label htmlFor="password">Mot de passe</label><br /> */}
                      <br />
                      <Field 
                        className="form-control"
                        component={renderField}
                        type="password"
                        name="password"
                        label="Votre mot de passe"
                        autoFocus
                        placeholder={"Mot de passe"}
                        validate={[required, minLength6]}
                      />
                      <p style={{ marginTop: "10px", textAlign: "left" }}>
                        <Checkbox
                          checked={ boxChecked }
                          onChange={ e => this.onCheckChange(e) }
                        >
                          Se souvenir de moi
                        </Checkbox>
                      </p>
                      <br />


                      <div className="steps-action">
                        <Button 
                          type="primary" 
                          disabled={
                            this.props.submitting ||
                            this.props.pristine
                          }
                          onClick = {this.props.handleSubmit(this.next.bind(this))}
                        >
                          Suivant &nbsp;
                          { btnLoading &&
                              <Spin indicator={antIcon} />
                          }
                        </Button>
                      </div>
                    </Form>
                  </div>                  
                </div>
              </div>
              }
              

              { register == true &&
              <div id="block1" className="offset-2 col-md-8">
                <div id="blockRegister" className="">
                  <h3 className="text-center connectTitle">S'inscrire</h3>

                  <div className="registerFormWrapper">
                    <Form className="row">
                      <FormGroup className="col-md-4">
                        <label htmlFor="first_name">Nom</label>
                        <Field 
                          className="form-control"
                          component={renderField}
                          type="text"
                          name="first_name"
                          autoFocus
                          validate={[required, minLength2]}
                          placeholder={"Nom de famille"}
                        />
                      </FormGroup>
                      <FormGroup className="col-md-4">
                        <label htmlFor="last_name">Prénom</label>
                        <Field 
                          className="form-control"
                          component={renderField}
                          type="text"
                          name="last_name"
                          validate={[required, minLength2]}
                          placeholder={"Prénom (s)"}
                        />
                      </FormGroup>
                      <FormGroup className="col-md-4">
                        <label htmlFor="last_name">Matricule</label>
                        <Field 
                          className="form-control"
                          component={renderField}
                          type="text"
                          name="matricule"
                          validate={[required, minLength2]}
                          placeholder={"20GXXXXX"}
                        />
                      </FormGroup>
                      <FormGroup className="col-md-4">
                        <label htmlFor="email">Email</label>
                        <Field 
                          className="form-control"
                          component={renderField}
                          type="email"
                          name="register_email"
                          validate={[required, email]}
                          placeholder={"xyz@mail.com"}
                        />
                      </FormGroup>
                      <FormGroup className="col-md-4">
                        <label htmlFor="register_password">Mot de passe</label>
                        <Field 
                          className="form-control"
                          component={renderField}
                          type="password"
                          name="register_password"
                          validate={[required, minLength6]}
                          placeholder={"Mot de passe"}
                        />
                      </FormGroup>
                      <FormGroup className="col-md-4">
                        <label htmlFor="password_confirmation">Confirmation mot de passe</label>
                        <Field 
                          className="form-control"
                          component={renderField}
                          type="password"
                          name="password_confirmation"
                          validate={[required, passwordMatch]}
                          placeholder={"Ressaisissez le mot de passe"}
                        />
                      </FormGroup>

                      <FormGroup className="col-md-4">
                        <label htmlFor="birthdate">Date de naissance</label>
                        <Field 
                          className="form-control"
                          component={renderField}
                          type="date"
                          name="birthdate"
                          validate={[required]}
                        />
                      </FormGroup>
                    </Form>

                    <div className="row">
                      <div id="block1" className="offset-2 col-md-8" style={{ paddingTop: "20px" }}>
                        <Button 
                          type="primary" 
                          disabled={
                            this.props.submitting ||
                            this.props.pristine
                          }
                          onClick = {this.props.handleSubmit(this._handleRegister.bind(this))}
                        >
                            Valider
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              }


            <div className="col-sm-6">
                

            </div>
          </div>
        </div>
      </div>
    )
  }


}