import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { Box, TextField, Grid, Paper, Stack, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { ADD_NOTE } from "../../gql/mutation";
const Notes = ({ _id, noteDescription, setOpenAdd, setDisplayNotes }) => {
  const descriptionRef = useRef();
  const [addNote] = useMutation(ADD_NOTE);

  const handleClick = () => {
    let description = descriptionRef.current.value;
    if (description.replace(/\s+/g, " ").length) {
      addNote({
        variables: {
          _id,
          notes: [...noteDescription, { description }],
        },
      });
      setDisplayNotes((oldList) => [...oldList, { description }]);
      setOpenAdd(false);
    }
  };
  const handleClose = () => {
    setOpenAdd(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper elevation={6} sx={{ padding: "2rem" }}>
        <Stack spacing={2}>
          <Grid container sx={{ marginTop: "1rem" }}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                multiline
                rows={2}
                sx={{ width: "100%" }}
                inputRef={descriptionRef}
              />
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <LoadingButton
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
              sx={{ width: "25%" }}
              onClick={handleClick}
              color="success"
            >
              Save
            </LoadingButton>
            <Button
              variant="outlined"
              color="error"
              sx={{ width: "25%" }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Grid>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Notes;
