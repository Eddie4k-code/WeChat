import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../reduxStore/configureStore";
import webSocket from "../../socket/socket";
import { Grid, Paper, Typography, TextField, Button } from "@material-ui/core";

interface MessageShape {
  username: string
  message: string
}


export const ServerPage = () => {
  const { user, loading } = useAppSelector((state) => state.user);
  const { roomName } = useParams();
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<any>("");

  

  useEffect(() => {
    if (roomName && user) {
      webSocket.emit("JOIN", roomName, user);
      
      webSocket.on("SEND_MESSAGE", (data) => {

       console.log("Message retrieved");
       console.log(data);
      
       setMessages([...messages, data.message]);
      });
    }

    return () => {
      webSocket.off("SEND_MESSAGE");
    };
  }, []);

  const handleSendMessage = () => {
    // Emit a new message to the server
    if (newMessage.trim() !== "") {
      webSocket.emit("SEND_MESSAGE", roomName, newMessage, user);
      setNewMessage("");
    }
  };


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
          {messages.map((message: any) => (
            <div key={message}>
              <Typography variant="body1">
                <strong>{message}:</strong> {message}
              </Typography>
            </div>
          ))}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          
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
    </Grid>
  );
};


