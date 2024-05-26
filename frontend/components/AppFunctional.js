import axios from "axios";

import React, { useState } from "react";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y };
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    const { x, y } = getXY();

    return `Koordinatlar (${x}, ${y})`;
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    const yon = evt.target.textContent;

    if (yon === "SOL") {
      if (index % 3 !== 0) {
        setIndex((prevIndev) => prevIndev - 1);
        setSteps((prevStep) => prevStep + 1);
      } else {
        setMessage("Sola gidemezsiniz");
      }
    } else if (yon === "SAĞ") {
      if (index % 3 !== 2) {
        setIndex((prevIndev) => prevIndev + 1);
        setSteps((prevStep) => prevStep + 1);
      } else {
        setMessage("Sağa gidemezsiniz");
      }
    } else if (yon === "YUKARI") {
      if (index >= 3) {
        setIndex((prevIndev) => prevIndev - 3);
        setSteps((prevStep) => prevStep + 1);
      } else {
        setMessage("Yukarıya gidemezsiniz");
      }
    } else if (yon === "AŞAĞI") {
      if (index < 6) {
        setIndex((prevIndev) => prevIndev + 3);
        setSteps((prevStep) => prevStep + 1);
      } else {
        setMessage("Aşağıya gidemezsiniz");
      }
    }
  }
  function onChange(evnt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evnt.target.value);
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();
    const koordinatlar = getXY();
    axios
      .post("http://localhost:9000/api/result", {
        x: koordinatlar.x,
        y: koordinatlar.y,
        steps: steps,
        email: email,
      })
      .then(function (response) {
        setMessage(response.data.message);
        setEmail(initialEmail);
      })
      .catch(function (err) {
        setMessage(err.response.data.message);
        setEmail(initialEmail);
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={ilerle}>
          SOL
        </button>
        <button id="up" onClick={ilerle}>
          YUKARI
        </button>
        <button id="right" onClick={ilerle}>
          SAĞ
        </button>
        <button id="down" onClick={ilerle}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          value={email}
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
