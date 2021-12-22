import { useQuery, useMutation } from "@apollo/client";
import { GET_DEALS } from "../../gql/query";
import {
  Box,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ADD_DEAL } from "../../gql/mutation";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
const Deals = ({ userId }) => {
  const { data } = useQuery(GET_DEALS);
  const [deals, setDeals] = useState();
  const [addADeal, setAddADeal] = useState(false);
  const [addedDealStatus, setAddedDealStatus] = useState(false);
  const [addDeal] = useMutation(ADD_DEAL);

  const [selectorValue, setSelectorValue] = useState();

  useEffect(() => {
    data && setDeals(data);
  }, [data]);
  const handleAdd = () => {
    let dealId = selectorValue.deals.map((deal) => deal._id);
    addDeal({
      variables: {
        _id: selectorValue._id,
        deals: [...dealId, userId],
      },
    });
    setAddedDealStatus(true);
  };
  const handleClose = () => {
    setAddADeal(false);
    setAddedDealStatus(false);
  };

  const handleChange = (event) => {
    setSelectorValue(event.target.value);
    setAddedDealStatus(false);
  };
  return (
    <Box>
      {!addADeal && (
        <Button
          variant="outlined"
          color="success"
          onClick={() => setAddADeal(true)}
        >
          Add a deal
        </Button>
      )}
      {addADeal && (
        <Grid container>
          <Grid xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select a deal
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select a deal"
                onChange={handleChange}
              >
                {deals?.deals?.map((deal) => (
                  <MenuItem value={deal}>
                    {deal.title} - ${deal.amount}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
            xs={12}
          >
            <Button
              startIcon={addedDealStatus ? <DoneIcon /> : <AddIcon />}
              variant="outlined"
              color="success"
              onClick={handleAdd}
              disabled={addedDealStatus}
            >
              {addedDealStatus ? "Added" : "Add"}
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Close
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Deals;
