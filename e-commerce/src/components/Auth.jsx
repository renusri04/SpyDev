import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doPasswordReset,
} from "../firebase/auth";
import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    clearForm();
  }, []);

  useEffect(() => {
    clearForm();
  }, [isSignup]);

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setPhone("");
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const result = await doCreateUserWithEmailAndPassword(email, password);
        await updateProfile(result.user, { displayName: fullName });

        await setDoc(doc(db, "users", result.user.uid), {
          fullName,
          phone,
          email,
          uid: result.user.uid,
          createdAt: new Date(),
        });

        alert("✅ Sign up successful!");
        navigate("/");
      } else {
        const result = await doSignInWithEmailAndPassword(email, password);
        alert("✅ Login successful!");
        console.log("Logged in user:", result.user);
        navigate("/");
      }
    } catch (error) {
      console.error("Auth error:", error.message);
      alert("❌ " + error.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await doSignInWithGoogle();
      alert(`✅ Welcome ${result.user.displayName || "User"}!`);
      console.log("Google user:", result.user);
      navigate("/");
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }
    try {
      await doPasswordReset(email);
      alert("✅ Password reset email sent. Check your inbox.");
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4 pt-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          key={isSignup ? "signup" : "login"}
          autoComplete="off"
        >
          {isSignup && (
            <>
              <input
                type="text"
                autoComplete="off"
                name="fullname"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                autoComplete="off"
                name="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}

          <input
            type="email"
            autoComplete="off"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            autoComplete="new-password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {!isSignup && (
            <div className="text-right text-sm">
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={handlePasswordReset}
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button onClick={toggleMode} className="text-blue-500 hover:underline">
                Login
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button onClick={toggleMode} className="text-blue-500 hover:underline">
                Sign Up
              </button>
            </>
          )}
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-3 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition font-medium"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
