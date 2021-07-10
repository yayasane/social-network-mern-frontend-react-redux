import React, { useState } from 'react'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(true)
  const [signInModal, setSignInModal] = useState(false)
  const handleModals = (e) => {
    if (e.target.id === 'register') {
      setSignUpModal(props.signUp)
      setSignInModal(props.signIn)
    }
    if (e.target.id === 'login') {
      setSignUpModal(false)
      setSignInModal(true)
    }
  }

  return (
    <div>
      <div className="connection-form">
        <div className="form-container">
          <ul>
            <li
              onClick={handleModals}
              id="register"
              className={signUpModal ? 'active-btn' : ''}
            >
              S'inscrire
            </li>
            <li
              onClick={handleModals}
              id="login"
              className={signInModal ? 'active-btn' : ''}
            >
              Se connecter
            </li>
          </ul>
          {signUpModal && <SignUpForm />}
          {signInModal && <SignInForm />}
        </div>
      </div>
    </div>
  )
}

export default Log
