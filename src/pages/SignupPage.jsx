import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const API_URL = "https://anime.adaptable.app";


function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => {
    console.log(e.target.value)
    setEmail(e.target.value)
  };

  const handlePassword = (e) => {

    setPassword(e.target.value)
  };

  const handleName = (e) => {
    console.log(e.target.value)
    setName(e.target.value)
  };


  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body

    const requestBody = { email, password, name };
    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state

    authService.signup(requestBody) //ADD
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full">
        <img src="/zenitsu.png" className="h-70 lg:mr-8 mb-4 lg:mb-0 mt-12" />

        <div className="sm:mx-auto sm:w-full sm:max-w-sm lg:flex-1 lg:mx-8">
          <h1 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </h1>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSignupSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email:
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password:
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name:
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleName}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gradient-to-r from-orange-400 via-red-600 to-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:from-orange-500 hover:via-red-700 hover:to-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="mt-10 text-center text-sm text-gray-500">
              {errorMessage && <p className="error-message text-red-500 mb-4">{errorMessage}</p>}
              <p>Already have an account?{' '}
                <a href="/login" className="inline-block mt-4 w-full text-center rounded-md bg-gradient-to-r from-orange-400 via-red-600 to-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:from-orange-500 hover:via-red-700 hover:to-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
        <img src="/naruto.png" className="h-54 lg:ml-8 mb-4 lg:mb-0 mt-12" />
      </div>
    </div>
  )
}

export default SignupPage;
