import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import AppContainer from "./AppContainer";
import api from '../api';

const Home = () => {

    const [posts, setPosts] = useState(null);

    const fetchPosts = () => {
        api.getAllPost().then(res => {
            const result = res.data;
            setPosts(result.data)
        })
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderPosts = () => {
        if(!posts) {
            return (
                <tr>
                    <td colSpan="4">
                        Loading...
                    </td>
                </tr>
            )
        }
        if(posts.length === 0) {
            return (
                <tr>
                    <td colSpan="4">
                        There are no posts here. <Link to="/add">Add one</Link>
                    </td>
                </tr>
            )
        }

        return posts.map((post, index) => {
            return (
                <tr className="bg-light" key={index}>
                    <th scope="row">{index}</th>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>
                        <Link to={`/edit/${post.id}`} className="btn btn-warning mr-1">Edit</Link>
                        <button type="button" className="btn btn-danger" onClick={(id) =>
                        api.deletePost(post.id)
                            .then(fetchPosts)
                            .catch(() => {
                            alert('Post not deleted ')
                            }
                        )
                        }>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    return (
       <AppContainer
        title="Laravel + ReactJS" >
           <Link to="/add" className="btn btn-success">Create New Post</Link>
           <div className="table-responsive">
               <table className="table mt-1">
                   <thead>
                   <tr>
                       <th scope="col">#</th>
                       <th scope="col">Title</th>
                       <th scope="col">Description</th>
                       <th scope="col">Action</th>
                   </tr>
                   </thead>
                   <tbody>
                    {renderPosts()}


                   </tbody>
               </table>
           </div>
       </AppContainer>
    )
}

export default Home
