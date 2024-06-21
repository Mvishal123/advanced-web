import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";


import "./App.css";
import axios from "axios";

const App = () => {
  const [isCaptcha, setIsCaptcha] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  const onSubmithandler = async () => {
    const res = await axios.post("http://localhost:3000/registeruser", {
      token,
    });

    console.log(res.data);
  };

  console.log({ token });
  console.log(import.meta.env.VITE_CAPTCHA_SITE_KEY);
  return (
    <main>
      <div className="credentials-container ">
        <div className="input-container">
          {!isCaptcha && <div className="loading">Loading...</div>}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="email"
            disabled={!isCaptcha}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            disabled={!isCaptcha}
          />
        </div>
        <button disabled={!isCaptcha} onClick={onSubmithandler}>Register</button>
      </div>
      {/* <div className="cf-turnstile" data-sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY} data-callback="javascriptCallback"
        onSuccess={() => setIsCaptcha(true)}
      ></div> */}
      <Turnstile
        siteKey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
        onSuccess={(token) => {
          setToken(token);
          setIsCaptcha(true);
        }}
      />
    </main>
  );
};

export default App;
