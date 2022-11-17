import {
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { AxiosRequestConfig } from "axios";
import React from "react";
import ProfileEditModal from "./ProfileEditModal";
import useFetchData from "../hooks/useFetchData";
import SingleProductPage from "../product/SingleProductPage";
import DeleteUser from "./DeleteUser";

export default function UsersPage() {
  const usersRequest: AxiosRequestConfig = {
    url: `/users`,
    method: "get",
  };

  const [{ data: users, loading, error }] = useFetchData(usersRequest, true);

  return (
    <Box>
      <Typography variant="h5" sx={{ marginTop: "2%" }}>
        Users
      </Typography>
      {users.map((user: any) => (
        <Card key={user.id} sx={{ marginTop: "5%" }}>
          <Typography>Email: {user.email}</Typography>
          <Typography>Username: {user.username}</Typography>
          <Typography>First name: {user.name.firstname}</Typography>
          <Typography>Last name: {user.name.lastname}</Typography>
          <Typography>Phone: {user.phone}</Typography>
          <Typography>City: {user.address.city}</Typography>
          <IconButton>
            <DeleteUser id={user.id} />
          </IconButton>
          <IconButton>
            <ProfileEditModal id={user.id} />
          </IconButton>
        </Card>
      ))}
    </Box>
  );
}
