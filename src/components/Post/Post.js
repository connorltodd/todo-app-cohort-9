import React from 'react';

export default function Post (props) {
    const [isEditing, setEditMode] = React.useState(false);
    const [editedPost, setEditedPost] = React.useState({
        userId: 1,
        title: props.title,
        body: props.body,
        id: props.id
    })


    const handleChange = (event) => {
        // Event is what is happening (onClick, onChange etc)
        // Target is the element in which this event is happening
        // Value is what the user has typed in the input
        console.log(event.target.name)

        const inputValue = event.target.value
        const inputName = event.target.name

        setEditedPost({
            ...editedPost,
            [inputName]: inputValue
        })

    }

    const resetPostToDefaultValue = () => {
        setEditedPost({
            userId: 1,
            title: props.title,
            body: props.body
        })
    }

    return (
        <div>
            <h1>Post id {props.id}</h1>
            {isEditing ? 
                <div>
                    <input type='text' name='title' defaultValue={props.title} onChange={handleChange} />
                    <input type='text' name='body' defaultValue={props.body} onChange={handleChange} /> 
                    <button onClick={() => {
                            props.handleEditedPost(editedPost)
                            setEditMode(!isEditing)
                        }
                    }>
                        Confirm Edit
                    </button>
                    <button 
                        onClick={() => {
                            setEditMode(!isEditing)
                        }}>
                        Cancel
                    </button>
                </div>
                :
                <React.Fragment>
                    <p>Title : {props.title}</p>
                    <p>Body : {props.body}</p>
                    <button onClick={() => setEditMode(!isEditing)}>Edit Post</button>
                </React.Fragment>
            }
            
            <button onClick={() => props.deletePost(props.id)}>Delete Post</button>
        </div>
    )
}