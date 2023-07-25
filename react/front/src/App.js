import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
const address = "http://127.0.0.1:8000/api/";
function App() {
  const [hiddenModal, setHiddenModal] = useState("modal hidden");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  return (
    <div className="container">
      <Header
        setHiddenModal={setHiddenModal}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        username={username}
        setUsername={setUsername}
      />
      <Connexion
        hiddenModal={hiddenModal}
        setHiddenModal={setHiddenModal}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        username={username}
        setUsername={setUsername}
      />
      <LesRepas />
    </div>
  );
}
function Header({
  setHiddenModal,
  isLoggedIn,
  setIsLoggedIn,
  username,
  setUsername,
}) {
  function handleLogOut() {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
  }
  return (
    <header className="header">
      <img src="./../img/logo192.png" alt="Logo" className="header__logo" />
      <form className="search">
        <input
          type="text"
          className="search__field"
          placeholder="Rechercher votre repas"
        />
        <button className="btn search__btn">
          <svg className="search__icon">
            <use href="src/img/icons.svg#icon-search"></use>
          </svg>
          <span>Search</span>
        </button>
      </form>
      {isLoggedIn ? (
        <button className="btn--small" onClick={() => handleLogOut()}>
          {" "}
          {username} Se deconnecter
        </button>
      ) : (
        <span></span>
      )}
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <button className="nav__btn nav__btn--add-recipe">
              <svg className="nav__icon">
                <use href="src/img/icons.svg#icon-edit"></use>
              </svg>
              <span
                className="btn"
                onClick={() => {
                  setHiddenModal("modal");
                }}
              >
                S'inscrire || Se connecter
              </span>
            </button>
          </li>
          <li className="nav__item">
            <button className="nav__btn nav__btn--bookmarks">
              <svg className="nav__icon">
                <use href="src/img/icons.svg#icon-bookmark"></use>
              </svg>
              <span>Fiche de commande</span>
            </button>
            <div className="bookmarks">
              <ul className="bookmarks__list">
                <div className="message">
                  <div>
                    <svg>
                      <use href="src/img/icons.svg#icon-smile"></use>
                    </svg>
                  </div>
                  <p>
                    Pas de repas commander, Ajouter des repas avotre commande
                    pour les voir ici
                  </p>
                </div>

                <li className="preview">
                  <a className="preview__link" href="#23456">
                    <figure className="preview__fig">
                      <img src="src/img/test-1.jpg" alt="Test" />
                    </figure>
                    <div className="preview__data">
                      <h4 className="preview__name">
                        Pasta with Tomato Cream ...
                      </h4>
                      <p className="preview__author">The Pioneer Woman</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
function LesRepas() {
  const [lesRepas, setLesRepas] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(
    function () {
      fetch(`${address}repas?page=${page}`)
        .then((res) => res.json())
        .then((data) => setLesRepas(data.data));
    },
    [page]
  );
  console.log(lesRepas);
  return (
    <div className="search-results">
      <ul className="results">
        {lesRepas.map((e) => (
          <li className="preview">
            <a className="preview__link preview__link--active" href="#23456">
              <figure className="preview__fig">
                <img src="src/img/test-1.jpg" alt="Test" />
              </figure>
              <div className="preview__data">
                <h4 className="preview__title">{e.name}</h4>
                <p className="preview__publisher">{e.description}</p>
                <div className="preview__user-generated">
                  <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <button className="btn" onClick={() => setPage((e) => e + 1)}>
        Next -_- Page {page + 1}
      </button>
    </div>
  );
}
function Connexion({
  hiddenModal,
  setHiddenModal,
  isLoggedIn,
  setIsLoggedIn,
  userName,
  setUsername,
}) {
  const [loginForm, setLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
  }
  function sendConnexion() {
    // Replace 'your_api_endpoint' with the actual endpoint for login
    const loginEndpoint = `${address}login`;

    // Data to be sent in the POST request body
    const userData = {
      email: email,
      password: password,
    };

    axios
      .post(loginEndpoint, userData)
      .then((response) => {
        // Assuming the API returns a token in the response
        const token = response.data.acces_token;

        // Store the token in the local storage or any other state management
        localStorage.setItem("token", token);

        // Now you can use the token for subsequent API requests
        // You can set the token in the request header using axios defaults
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Perform any other action after successful login

        localStorage.setItem("isLoggedIn", "true");

        localStorage.setItem("username", response.data.name);
        setUsername(response.data.name);
        setIsLoggedIn(true);

        console.log("Connexion successful ");
        console.log(response.data.name);
        console.log(token);
      })
      .catch((error) => {
        // Handle error during login
        console.log("Connexion failed");
      });
  }
  const handleRegistration = () => {
    // Replace 'your_api_endpoint' with the actual endpoint for registration
    const registrationEndpoint = `${address}register`;

    // Data to be sent in the POST request body
    const userData = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirm,
      // Add other fields as needed for registration
    };

    // Call the registration endpoint using axios
    axios
      .post(registrationEndpoint, userData)
      .then((response) => {
        // Handle successful registration, e.g., show a success message or redirect to login page
        console.log("Registration successful!", response.data);
      })
      .catch((error) => {
        // Handle error during registration, e.g., display error message to the user
        console.error("Registration failed:", error.response.data);
      });
  };

  return (
    <div className={hiddenModal}>
      <button
        className="btn--close-modal"
        onClick={() => setHiddenModal("modal hidden")}
      >
        &times;
      </button>
      {loginForm ? (
        <>
          <h2 className="modal__header">
            Inscrivez vous en seulement ou{" "}
            <button onClick={() => setLoginForm(false)}>Connectez vous</button>
            <br />
            Juste <span className="highlight">5 minutes</span>
          </h2>
          <form className="modal__form" onSubmit={handleSubmit}>
            <label>Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Confirm Password</label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <button className="btn" onClick={() => handleRegistration()}>
              Continuer &rarr;
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className="modal__header">
            Connectez vous
            <button onClick={() => setLoginForm(true)}>Inscrivez vous</button>
          </h2>
          <form className="modal__form" onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn"
              onClick={() => {
                sendConnexion();
              }}
            >
              Continuer &rarr;
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default App;
