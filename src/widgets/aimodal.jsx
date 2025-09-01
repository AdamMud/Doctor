"use client";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography,} from "@mui/material";
import { VscRobot } from "react-icons/vsc";
export default function ChatModal() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    if (!message) return;
    setResponse("Thinking...");
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setResponse(data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response");
  };

  return (
    <>
      <Button variant="contained" color="primary"  onClick={() => setOpen(true)}>
        <VscRobot />
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Chat with Doctor</DialogTitle>
        <DialogContent>
          <TextField
            label="Hello , how can i help you"
            multiline
            fullWidth
            rows={3}
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mt: 1, mb: 2 }}
          />
          <Box
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: "#f5f5f5",
              minHeight: 80,
              fontSize: "0.9rem",
            }}
          >
            {response || "AI response will appear here."}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="error">
            Close
          </Button>
          <Button variant="contained" color="success" onClick={handleSend}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
