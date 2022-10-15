import logo from "./assets/logo.svg";
import menuqr from "./assets/lottie/menu-qr.json";
import errorpdf from "./assets/lottie/error.json";
import { Player } from "@lottiefiles/react-lottie-player";
import React, { useState } from "react";
// import { Document, Page } from "react-pdf";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

function App() {
  const file = "./pdf/carta_blue_octubre_2022-comprimido.pdf";
  const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="carta">
      <header>
        <img src={logo} width="110" height="110" alt="Blue-42-resto-bar-logo" />
        <h1>Blue 42 resto bar</h1>
      </header>
      <div className="carta__container">
        <div className="carta__container__load">
          <h2>Nuestro Menú de hoy : </h2>
        </div>
        <div className="carta__container__document">
          <Document
            loading={
              <figure className="loading">
                <Player
                  autoplay
                  loop
                  background={"transparent"}
                  src={menuqr}
                  style={{ height: "250px", width: "250px" }}
                ></Player>
                <h3>Cargando Menú...</h3>
              </figure>
            }
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            error={
              <figure className="error">
                <Player
                  autoplay
                  loop
                  background={"transparent"}
                  src={errorpdf}
                  style={{ height: "250px", width: "250px" }}
                ></Player>
                <h3>Compruebe su conexión a internet.</h3>
              </figure>
            }
            // options={options}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderMode="svg"
                width={window.innerWidth}
                scale={0.9}
              />
            ))}
          </Document>
        </div>
      </div>
      {/* términos y condiciones */}
      <p className="carta__terminos">
        * Los precios, especificaciones, promociones y disponibilidad están
        sujetos a cambios.
      </p>
      <footer>
        <small>&copy; Blue 42 resto bar · 2022 · Federico Rivero</small>
      </footer>
    </div>
  );
}

export default App;
