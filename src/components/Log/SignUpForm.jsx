import React, { useState } from 'react'
import axios from 'axios'
import SignInForm from './SignInForm'

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false)
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [controlPassword, setControlPassword] = useState('')

  const handleChange = (e) => {
    const name = e.target.name
    switch (name) {
      case 'pseudo':
        setPseudo(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      case 'email':
        setEmail(e.target.value)
        break
      case 'controlPassword':
        setControlPassword(e.target.value)
        break

      default:
        break
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const terms = document.getElementById('terms')
    const pseudoError = document.querySelector('.pseudo.error')
    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')
    const passwordConfirmError = document.querySelector(
      '.password-confirm.error',
    )
    const termsError = document.querySelector('.terms.error')

    termsError.innerHTML = ''
    passwordConfirmError.innerHTML = ''

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML = 'Les mots de passe ne concordent pas'

      if (!terms.checked)
        termsError.innerHTML = 'Veuillez valider les conditions générales'
    } else {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          email,
          pseudo,
          password,
        },
      })
        .then((res) => {
          console.log(res)
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo
            emailError.innerHTML = res.data.errors.email
            passwordError.innerHTML = res.data.errors.password
          } else {
            setFormSubmit(true)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleSubmit} id="sign-up-form">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            value={pseudo}
            onChange={handleChange}
          />
          <div className="pseudo error"></div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
          />
          <div className="email error"></div>
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
          />
          <div className="password error"></div>
          <label htmlFor="controlPassword">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="controlPassword"
            id="controlPassword"
            value={controlPassword}
            onChange={handleChange}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{' '}
            <a href="/" target="_blank" rel="nooopener noreferrer">
              conditions d'utilisations
            </a>
          </label>
          <div className="terms error"></div>
          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  )
}

export default SignUpForm
