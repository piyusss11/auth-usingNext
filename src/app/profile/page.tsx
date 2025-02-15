"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IUser } from "@/models/UserModel";
import { useRouter } from "next/navigation";

async function getMe() {
  try {
    const response = await axios.get("/api/users/getme");
    return response.data?.data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch user data");
    return null;
  }
}

export default function ProfilePage() {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();
  async function logout() {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  }
  useEffect(() => {
    async function fetchUser() {
      const data = await getMe();
      setUser(data);
    }
    fetchUser();
  }, []);

  return (
    <div>
      <h1 className="text-white">Profile Page</h1>
      {user ? (
        <>
          <h2 className="text-white">Username: {user?.username}</h2>
          <h2 className="text-white">Email: {user?.email}</h2>
        </>
      ) : (
        <h2 className="text-white">Loading...</h2>
      )}
      <button onClick={logout} className="text-black mt-4 bg-white px-2 py-1 rounded-lg">
        Logout
      </button>
    </div>
  );
}
