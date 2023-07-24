import { useState } from "react";
import "./App.css";

function App() {
  const [hiddenModal, setHiddenModal] = useState("modal hidden");
  return (
    <div className="container">
      <Header setHiddenModal={setHiddenModal} />
      <Connexion hiddenModal={hiddenModal} setHiddenModal={setHiddenModal} />
    </div>
  );
}
function Header({ setHiddenModal }) {
  return (
    <header className="header">
      <img src="./../img/logo192.png" alt="Logo" class="header__logo" />
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
function Connexion({ hiddenModal, setHiddenModal }) {
  return (
    <div className={hiddenModal}>
      <button
        class="btn--close-modal"
        onClick={() => setHiddenModal("modal hidden")}
      >
        &times;
      </button>
      <h2 className="modal__header">
        Inscrivez vous en seulement quelques clics.
        <br />
        Juste <span className="highlight">5 minutes</span>
      </h2>
      <form className="modal__form">
        <label>Nom</label>
        <input type="text" />
        <label>Prenom</label>
        <input type="text" />
        <label>Email</label>
        <input type="email" />
        <button className="btn">Continuer &rarr;</button>
      </form>
    </div>
    //{" "}
  );
}
export default App;
