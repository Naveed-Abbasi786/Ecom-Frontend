import React, { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('your-background-image-url.jpg')" }}
    >
      <div className="w-full max-w-sm backdrop-blur-md bg-white/30 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-4 text-black">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-black font-medium mb-1"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-black font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-right">
            <a
              href="#"
              className="text-blue-500 text-sm hover:underline"
            >
              Forgot Password
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            LOGIN
          </button>
        </form>
        <p className="text-center text-sm text-black mt-4">
          Not a Member?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Register Now
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
