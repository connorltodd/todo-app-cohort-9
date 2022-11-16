import React from "react";
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

    return (
        <div>
            <h1>PostList</h1>
            <form>
                <input type="text" placeholder="title" name="title" onChange={handleChange} />
                <input type="text" placeholder="body" name="body" onChange={handleChange} />
            </form>
            {posts.map(post =>  
            <Post
                key={post.id}
                userId={post.userId} 
                id={post.id} 
                title={post.title} 
                body={post.body}
                deletePost={deletePost}
            />
            )}
            
        </div>
    )
}