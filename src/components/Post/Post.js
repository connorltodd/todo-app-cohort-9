export default function Post (props) {
    return (
        <div>
            <h1>Post id {props.id}</h1>
            <p>Title : {props.title}</p>
            <p>Body : {props.body}</p>
            <button onClick={() => props.deletePost(props.id)}>Delete Post</button>
        </div>
    )
}