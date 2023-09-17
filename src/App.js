import { BrowserRouter, Route, Routes} from "react-router-dom";

import SignUp from "./components/SignUp";
import AccountActivation from "./components/AccountActivation";
import SignIn from "./components/SignIn";

import ForgotPassword from "./components/ForgotPassword";
import CheckEmail from "./components/CheckEmail";

import PasswordReset from "./components/PasswordReset";
import Password from "./components/Password";

import Urlshortner from "./components/Urlshortner";

function App() {
  const url="https://url-yvt0.onrender.com"

  return (
      <BrowserRouter>
          <Routes>
                <Route path="/" element={<SignUp url={url} />} />
                <Route path="/accountactivation/:id" element={<AccountActivation url={url} />} />
                <Route path="/signin" element={<SignIn  url={url}/>} />

                <Route path="/forgotPassword" element={<ForgotPassword  url={url}/> }/>
                <Route path="/mail" element={<CheckEmail url={url}/>} />

                <Route path="/PasswordReset/:id" element={<PasswordReset url={url} />}/>
                <Route path="/password" element={<Password  url={url}/>} />

                <Route path="/UrlShortner" element={<Urlshortner url={url} />} />
          </Routes>
      </BrowserRouter>
      
  );
}

export default App;
