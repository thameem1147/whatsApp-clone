import React, { useState, useEffect }from 'react';
import "./chat.css";
import { Avatar } from "@material-ui/core";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {IconButton} from "@material-ui/core";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from "react-router-dom";
import db from "../../firebase";
import {useStateValue} from "../../StateProvider";
import firebase from "firebase";


function Chat() {
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
      if(roomId) {
          db.collection("rooms").doc(roomId).onSnapshot((snapshot) => 
              setRoomName(snapshot.data().name));


            db.collection("rooms").doc(roomId).
            collection("messages").orderBy("timestamp","asc").onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc) =>
            doc.data()))
            );
      }
    },[roomId]);

const [input, setInput] = useState('');
const sendmsg = (e) =>
{
e.preventDefault();
db.collection("rooms").doc(roomId).collection("messages").add({
    messages: input,
    name: user.displayName,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
});
setInput('');
};
    return (
        <div className="chat">
            <div className="chat__header">
             <Avatar src={`https://avatars.dicebear.com/4.5/api/avataaars/${Math.floor(Math.random() * 5000)}.svg`}/>
             <div className="chat__info">
                 <h3>{roomName}</h3>
                 <p>last seen at {" "}
                 {new Date(
                     messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                 </p>
             </div>
             <div className="chat__header__right">
             <IconButton >
          <SearchOutlinedIcon />
          </IconButton>
          <IconButton >
          <AttachFileIcon />
          </IconButton>
          <IconButton >
          <MoreVertIcon />
          </IconButton>
             </div>
            </div>
            <div className="chat__body">
            {messages.map((message) => (
            <p className={`chat__msg ${message.name === user.displayName &&
            "chat__reciever"}`}>
            <span className="chat__name">{message.name}</span>
            {message.messages}
            <span className="chat__time">
                {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
            </p>
            ))}
            </div>
            <div className="chat__footer">
           <InsertEmoticonIcon />
           <form >
               <input value={input} onChange={(e) => setInput(e.target.value)} 
               type="text" placeholder="Type a message"/>
               <button onClick={sendmsg}>sent a message</button>
               </form>
           <MicIcon />
            </div>
        </div>
    )
}

export default Chat;
