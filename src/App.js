import React, { useEffect } from "react";
import { useState } from "react";
import CreatePost from "./components/CreatePost";
import Header from "./components/Header";
import Login from "./components/Login";
import PostList from "./components/PostList";

function App() {
  const [ user, setUser ] = useState('');
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    document.title = user ? `${user}'s Feed` : 'Please Login'
  }, [user])

  function handleAddPost(newPost) {
    setPosts([newPost, ...posts])
  }

  if(!user) {
    return <Login setUser={setUser}/>
  }

  return (
    <>
      <Header user={user} setUser={setUser} />
      {/* <CreatePost user={user} posts={posts} setPosts={setPosts} /> */}
      <CreatePost user={user} handleAddPost={handleAddPost} />
      <PostList posts={posts}/>
      {/* {posts.map((post, index) => (
        <React.Fragment key={index}>
          {post.image && (
            <img
            style={{ height: 100, width: 200, objectFit: 'cover' }}
            src={URL.createObjectURL(post.image)} alt="" />
          )}
        <p>{post.content}</p>
        <div>{post.user}</div>
        </React.Fragment>
      ))} */}
    </>
  );    
}

export default App;
