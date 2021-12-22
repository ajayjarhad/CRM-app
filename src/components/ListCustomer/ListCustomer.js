import React from "react";
import { useQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";

import { GET_CUSTOMERS } from "../../gql/query";
import ContentTable from "../ContentTable";
const ListCustomer = () => {
  const { data, loading } = useQuery(GET_CUSTOMERS);

  return (
    <>
      {loading && (
        <CircularProgress
          sx={{ position: "absolute", top: "50%", left: "50%" }}
        />
      )}
      {!loading && <ContentTable data={data} />}
    </>
  );
};

export default ListCustomer;
