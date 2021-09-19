import React, {useState, useEffect } from "react";
import {useHistory, useParams} from 'react-router-dom';
import AppContainer from "./AppContainer";
import api from "../api";
const Edit = () => {
    const { id } = useParams()
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onEditSubmit = async () => {
        setLoading(true);
        try {
            await api.updatePost({
                title, description
            }, id)
            history.push('/');
        } catch{
            alert('Post not updated');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        api.getOnePost(id).then(res => {
            const result = res.data;
            const post = result.data;
            setTitle(post.title);
            setDescription(post.description);
        })
    }, [])


    return(
        <AppContainer
            title="Editing Post"
        >
            <form action="">
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" type="text" placeholder="Title post" value={title} onChange={e=>setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" width="100%" value={description} onChange={e=>setDescription(e.target.value)}/>
                </div>
                <div className="form-group ">
                    <button type="button" className="btn btn-success center" onClick={onEditSubmit} disabled={loading}>{loading ? 'Loading...' : 'Adding Post' }</button>
                </div>
            </form>
        </AppContainer>
    );
};
export default Edit
