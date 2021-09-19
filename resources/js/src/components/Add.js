import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import AppContainer from "./AppContainer";
import api from "../api";
const Add = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addPost({
                title, description
            })
            history.push('/');
        } catch{
             alert('Post not created');
        } finally {
            setLoading(false);
        }
    }


    return(
        <AppContainer
        title="Adding Post"
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
                    <button type="button" className="btn btn-success center" onClick={onAddSubmit} disabled={loading}>{loading ? 'Loading...' : 'Adding Post' }</button>
                </div>
            </form>
        </AppContainer>
    );
};
export default Add
