"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const handleSignup = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/signup", user);
      toast.success("User created successfully,redirecting to login page");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, Retry again");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen  py-2">
      <div className="text-3xl">Sign up</div>
      {loading ? <div>Loading...</div> : <></>}
      <label htmlFor="username">Username</label>
      <input
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="mt-2 rounded-md text-black px-2 py-1"
        type="text"
      />

      <label htmlFor="email">Email</label>
      <input
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="mt-2 rounded-md text-black px-2 py-1"
        type="text"
      />

      <label htmlFor="password">Password</label>
      <input
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="mt-2 rounded-md text-black px-2 py-1"
        type="password"
      />
      <h1>
        Already have an account
        <span className="text-blue-500 underline ml-2">
          <Link href={"/login"}>Login</Link>
        </span>
      </h1>
      <button
        disabled={buttonDisabled}
        onClick={handleSignup}
        className={`mt-2 rounded-md px-2 py-1 w-40 ${
          buttonDisabled || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-white text-black"
        }`}
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </div>
  );
}
