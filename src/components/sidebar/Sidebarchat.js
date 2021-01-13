import React, {useEffect,useState} from 'react';
import "./sidebarchat.css";
import {Avatar} from "@material-ui/core";
import db from "../../firebase";
import {Link} from "react-router-dom";

function Sidebarchat({ addNewChat,id ,name }) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState("");
  
    useEffect(() => {
        if (id) {
            db.collection("rooms").doc(id).collection("messages").orderBy("timestamp", "desc").onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) => doc.data()))
            );
        }
    },[id]);
    
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])


    const createChat = () => {
const roomName = prompt("please enter name for chat");



if (roomName) {
   db.collection("rooms").add({
   name: roomName,
   });
}
    };
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarchat">
            <Avatar src={`https://avatars.dicebear.com/4.5/api/avataaars/${seed}.svg`}/>
            <div className="sidebarchat__info">
                <h2>{name}</h2>
               <p>{messages[0]?.messages}</p>
            </div>
        </div>
        </Link>
    ) : (
        <div onClick={createChat}
        className="sidebarChat">
            <h2>Add new chat</h2>
        </div>
     );
}

export default Sidebarchat;
