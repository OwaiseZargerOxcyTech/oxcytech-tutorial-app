"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState();
  const [invalidUser, setInvalidUser] = useState("false");
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10));
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10));
  const [userAnswer, setUserAnswer] = useState("");
  const [loginError, setLoginError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && !loginError) {
      if (session && session.user && session.user.name === "admin") {
        window.location.href = "/adminform";
      } else if (session && session.user && session.user.name === "employee") {
        window.location.href = "/allblogemployee";
      } else {
        console.error("Invalid user type");
      }
    }
  }, [session, status]);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      if (parseInt(userAnswer) !== num1 + num2) {
        // CAPTCHA validation failed
        setLoginError("Please solve the CAPTCHA to proceed.");
        setFormSubmitted(true);
        setToastMessage("Please solve the CAPTCHA to proceed.");
        setTimeout(async () => {
          setFormSubmitted(false);
          window.location.href = "/login";
        }, 3000);

        throw new Error("Wrong Captcha...");
      }

      const response = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      console.log("response", response);

      if (response.error) {
        setToastMessage("Invalid username or password");
      }

      if (response.error) {
        setFormSubmitted(true);
        setInvalidUser("true");
        setTimeout(async () => {
          setFormSubmitted(false);
          window.location.href = "/login";
          setInvalidUser("false");
        }, 3000);

        throw new Error("Wrong Credentials...");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      {formSubmitted && (invalidUser || loginError) && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-info">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center h-screen">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <p>Please solve the following problem to proceed:</p>
            <p>
              {num1} + {num2} =
            </p>
            <input
              type="text"
              value={userAnswer}
              onChange={handleAnswerChange}
              className="input input-bordered"
            />
            {loginError && <p>{loginError}</p>}
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={(e) => handleLogin(e)}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
