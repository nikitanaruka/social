import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import {useEffect, useState } from "react";
import axios from "axios";
//import { Posts } from "../../dummyData";

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username 
       ? await axios.get("/posts/profile/" + username)
       : await axios.get("/posts/timeline/62a37c2e43b4d7c0200153bc");
      setPosts(res.data);
    };
    fetchPosts();
  }, [username]);
  return (
    <div className="feed">

        <div className="feedWrapper">
            <Share/>
            {posts.map((p)=>{
              return <Post key={p._id} post={p} />
            })} 
            
        </div>
        
    </div>
  )
}
