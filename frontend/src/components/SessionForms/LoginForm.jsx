import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SessionForm.css";

import { login, clearSessionErrors } from "../../store/session";
import Errors from "../Errors/Errors";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) =>
    state.errors.session ? state.errors.session : []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const demoUser = () => {
    setEmail("demo@user.io");
    setPassword("password");
  };

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      
      <div className="h2-wrapper">
        <h2>Log In Form</h2>
      </div>
      <Errors errors={errors}/>

      <label>
        <span>Email</span>
        <input
          type="text"
          value={email}
          onChange={update("email")}
          placeholder="Email"
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={update("password")}
          placeholder="Password"
        />
      </label>

      <div>
        <button
          type="submit"
        >
          Log In!
        </button>
        <button type="submit" onClick={demoUser}>
          Demo User
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
