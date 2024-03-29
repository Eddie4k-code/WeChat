import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { useAppSelector } from "../../reduxStore/configureStore";
import webSocket from "../../socket/socket";
import { Grid, Paper, Typography, TextField, Button } from "@material-ui/core";
import { User } from "../../models/User";
import { UserState } from "../../reduxStore/slices/userSlice";

//shape of data that is retrieved and sent through the socket event "SEND_MESSAGE"
interface SendMessageData {
  roomName: string
  user: User
  message: string
}


export const ServerPage = () => {
  const { user, loading } = useAppSelector((state: UserState) => state.user);
  const { roomName } = useParams();
  const [messages, setMessages] = useState<SendMessageData[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const navigate = useNavigate();

  

  useEffect(() => {
    if (roomName && user) {
      //emit join event to announce user has joined 
      webSocket.emit("JOIN", {roomName: roomName, user: user});
      
      //emit send message event to deliver message to room and to update state.
      webSocket.on("SEND_MESSAGE", (sendMessageData: SendMessageData) => {
       setMessages((prevMessages: SendMessageData[]) => [...prevMessages, sendMessageData]);
      });


      //if user closes browser or leaves page emit leave event
      window.addEventListener("beforeunload", onBrowserClose);

    }
  }, []);

  const handleSendMessage = () => {
    // Emit a new message to the server
    if (newMessage.trim() !== "") {
      webSocket.emit("SEND_MESSAGE", {roomName: roomName, user: user, message: newMessage});
      setNewMessage("");
    }
  };

  //emit leave event when user browser is closed or reloaded.
  const onBrowserClose = () => {
    webSocket.emit('LEAVE', {roomName: roomName, user: user})
  }

  //emit leave event when user leaves using 'LEAVE' button.
  const handleLeaveOnClick = () => {
    //emit leave event to announce user has left room.
    webSocket.emit('LEAVE', {roomName: roomName, user: user})
    navigate("/dashboard");
  }


  if (loading) {
    return <h1>Loading....</h1>
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Room: {roomName}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Paper elevation={3} style={{ padding: "20px", height: "400px", overflowY: "auto" }}>
          {/* Display Chat Messages */}
          {messages.map((message: SendMessageData) => (
            <div key={message.message}>
              <Typography variant="body1">
                <strong>{message.user.username}:</strong> {message.message}
              </Typography>
            </div>
          ))}
        </Paper>
      </Grid>
    
      <Grid item xs={12}>
        <TextField
          label="Type your message..."
          variant="outlined"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Grid>
      <Button onClick={() => handleLeaveOnClick()}>Leave</Button>
    </Grid>
  );
};


