import React, { useCallback, useEffect } from "react";
import { useReducer } from "react";
import { useContext } from "react";
import { useState } from "react";
import CreatePost from "./components/CreatePost";
import Header from "./components/Header";
import Login from "./components/Login";
import PostList from "./components/PostList";
import postReducer from "./reducer";

export const UserContext = React.createContext();
export const PostContext = React.createContext({ posts: [] });

export default function App() {
    const [user, setUser] = useState('');
    // const [posts, setPosts] = useState([]);
    const initialPostState = useContext(PostContext)
    const [state, dispatch] = useReducer(postReducer, initialPostState)

    useEffect(() => {
        document.title = user ? `${user}'s Feed` : 'Please Login'
    }, [user])

    // const handleAddPost = useCallback(newPost => {
    //     setPosts([newPost, ...posts])
    // }, [posts])
    // console.log(handleAddPost)

    if (!user) {
        return <Login setUser={setUser} />
    }

    return (
        <PostContext.Provider value={{ state, dispatch }}>
            <UserContext.Provider value={user}>
                <Header user={user} setUser={setUser} />
                {/* <CreatePost user={user} posts={posts} setPosts={setPosts} /> */}
                {/* <CreatePost user={user} handleAddPost={handleAddPost} /> */}
                <CreatePost user={user} />
                {/* <PostList posts={posts} /> */}
                <PostList posts={state.posts} />
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
            </UserContext.Provider>
        </PostContext.Provider>
    );
}