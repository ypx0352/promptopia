"use client";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getUserPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setUsername(data[0].creator.username);
      setPosts(data);
    };
   if(params.id) getUserPosts();
  }, [params.id]);
  return <Profile name={username} desc={`Welcome to ${username}'s profile.`} data={posts}/>
};

export default UserProfile;
