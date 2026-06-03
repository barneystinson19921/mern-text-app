
import React, { useEffect, useState} from "react";

function Home({handleLogout,token}){
    const[postText,setPostText]=useState('');
    const[posts,setPosts]=useState([]);
    const[editPostId,setEditPostId]=useState(null);
    const[editText,setEditText]=useState("");


   useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/posts', {
                headers: {
                    Authorization: token
                }
            });

            const data = await response.json();
            console.log("server to get posts:", data);
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    fetchPosts();
}, [token]);


    const handlePostSubmit=async(e)=>{
       
        e.preventDefault();
        try{
            const response=await fetch('http://localhost:5000/api/posts',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':token
                },
                body:JSON.stringify({text:postText}),
            });
            const data=await response.json();
            
            if (response.ok) {
                alert('Post Published.!🌼');
                
            }else{
                alert(data.message);
            }
        }catch(error){
            console.error('Error creating post:',error);
        }
    };

    const handleDelete=async(id)=>{
        try{
            const response=await fetch(`http://localhost:5000/api/posts/${id}`,{
                method: 'DELETE',
                headers:{
                    'Authorization':token
                }
            });
            if (response.ok) {
                setPosts(posts.filter(post=>post._id!==id));
            }

        }catch(error)
        {
            console.error("Error deleting post:",error);
        }
    };

    const handleUpdate=async(id)=>{
        try {
            const response=await fetch (`http://localhost:5000/api/posts/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':token
                },
                body:JSON.stringify({text:editText})
            });
            if (response.ok) {
                const updatedData=await response.json();
                setPosts(posts.map(post=>post._id==id? updatedData:post));
                setEditPostId(null);
            }

        } catch (error) {
            console.error("Error updating post:",error);
        }
    };

return(
        
            <div>
                <h2>DOom The Scroller....☠</h2>
                <button onClick={handleLogout}>Logout</button>
                <hr />

                <h3>Create Posts of Doom📝</h3>
                <form onSubmit={handlePostSubmit}>
                    <textarea placeholder="Type your post..." 
                    value={postText}
                    onChange={(e)=>setPostText(e.target.value)}
                    cols="50"
                    rows="4"
                    required/>
                    <br />
                    <button type="submit">Publish Post</button>
                </form>
                <div className="posts-feed">
                    <h3>Reels on Fire🔥</h3>
                    {posts.length===0?(
                        <p>No posts yet.Be the first to lit the page.🧨</p>
                        ):(
                        posts.map((post)=> (
                            <div key={post._id} className="post-card">
                                {/* <p>{post.content || post.text}</p>
                                <small>Posted by: {post.user?.name }</small> */}
                            
                                {editPostId===post._id?(
                                    <input 
                                    type="text"
                                    value={editText}
                                    onChange={(e)=>setEditText(e.target.value)}
                                    style={{display:'inline-block',width:'80%'}}
                                    />
                                ):(<p style={{display:'inline'}}>{post.text}</p>
                                )}

                                <small style={{marginLeft:'10px' }}>By:{post.user?.name|| 'Anonymous'}</small>
                                <div className="button-group" style={{display:'inline-block',marginLeft:'30px'}}>
                                    {editPostId===post._id?(
                                        <>
                                            <button onClick={()=>handleUpdate(post._id)}>Save</button>
                                            <button onClick={()=>setEditPostId(null)}>Cancel</button>
                                        </>
                                    ):(
                                        <>
                                            <button onClick={()=>{setEditPostId(post._id); setEditText(post.text);}}>Edit</button>
                                            <button onClick={()=> handleDelete(post._id)}>Delete</button>
                                        </>

                                    )}
                                </div>
                         
                            
                            </div>
                        ))
                    )}
                </div>
            </div>
            
       
);
}

export default Home;