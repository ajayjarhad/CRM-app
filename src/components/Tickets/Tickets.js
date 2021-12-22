import { useRef, useState } from "react";
import { Box, TextField, Grid, Paper, Stack, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";

const Tickets = () => {
  const [addTicket, setAddTicket] = useState(false);
  const [addedTicketStatus, setAddedTicketStatus] = useState(false);
  const ticketNameRef = useRef();
  const handleAdd = () => {
    let data = {
      data: {
        name: ticketNameRef.current.value,
        workspace: process.env.REACT_APP_ASANA_WORKSPACE,
      },
    };
    if (!addedTicketStatus)
      fetch("https://app.asana.com/api/1.0/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.REACT_APP_ASANA_KEY,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(() => setAddedTicketStatus(true));
  };
  const handleClose = () => {
    setAddTicket(false);
    setAddedTicketStatus(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      {!addTicket && (
        <Button
          variant="outlined"
          color="success"
          onClick={() => setAddTicket(true)}
        >
          Add a ticket to Asana
        </Button>
      )}
      {addTicket && (
        <Paper elevation={6} sx={{ padding: "2rem" }}>
          <Stack spacing={2}>
            <Grid container sx={{ marginTop: "1rem" }}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ticket name"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  inputRef={ticketNameRef}
                />
              </Grid>
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                startIcon={addedTicketStatus ? <DoneIcon /> : <AddIcon />}
                variant="outlined"
                color="success"
                onClick={handleAdd}
                disabled={addedTicketStatus}
              >
                {addedTicketStatus ? "Added" : "Add"}
              </Button>
              <Button variant="outlined" color="error" onClick={handleClose}>
                Close
              </Button>
            </Grid>
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

export default Tickets;
