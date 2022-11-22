import React from "react";
import { v4 as uuidv4 } from 'uuid';
import Post from "../Post/Post";

export default function PostList () {
    const [posts, setPosts] = React.useState([]);
    const [newPost, setNewPost] = React.useState({
        userId: 1,
        title: '',
        body: ''
    })

    React.useEffect(() => {
        fetchPosts()
    }, []);

    const fetchPosts = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => setPosts(json));
    }

    const deletePost = (postToBeDeletedId) => {
        const newPostList = posts.filter(post => post.id !== postToBeDeletedId)
        setPosts(newPostList)
    }

    const handleEditedPost = (postToBeEdited) => {
        const newPostList = posts.map(post => post.id === postToBeEdited.id ? postToBeEdited : post)
        setPosts(newPostList)
    }

    const handleChange = (event) => {
        // Event is what is happening (onClick, onChange etc)
        // Target is the element in which this event is happening
        // Value is what the user has typed in the input
        console.log(event.target.name)

        const inputValue = event.target.value
        const inputName = event.target.name

        setNewPost({
            ...newPost,
            [inputName]: inputValue
        })

    }

    function createNewTodo(event) {
        event.preventDefault();
        const newPostWithId = { ...newPost, id: uuidv4() }
        setPosts([newPostWithId ,...posts])
        setNewPost({
            userId: 1,
            title: '',
            body: ''
        })
    }

    return (
        <div>
            <h1>PostList</h1>
            <form onSubmit={createNewTodo}>
                <input type="text" value={newPost.title} placeholder="title" name="title" onChange={handleChange} />
                <input type="text"  value={newPost.body} placeholder="body" name="body" onChange={handleChange} />
                <button type='submit'>Create todo</button>
            </form>
            {posts.map(post =>  
            <Post
                key={post.id}
                userId={post.userId} 
                id={post.id} 
                title={post.title} 
                body={post.body}
                deletePost={deletePost}
                handleEditedPost={handleEditedPost}
            />
            )}
            
        </div>
    )
}