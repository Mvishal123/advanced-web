import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

import "./App.css";

const App = () => {
  const [isCaptcha, setIsCaptcha] = useState<boolean>(false);
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
        <button disabled={!isCaptcha}>Register</button>
      </div>
      {/* <div className="cf-turnstile" data-sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY} data-callback="javascriptCallback"
        onSuccess={() => setIsCaptcha(true)}
      ></div> */}
      <Turnstile
        siteKey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
        onSuccess={() => setIsCaptcha(true)}
      />
    </main>
  );
};

export default App;
