import { Grid, Typography } from "@mui/material";
import React from "react";
import classes from "./ProfileTab.module.css";
import { Link } from "react-router-dom";

export default function ProfileTab({ tabName, View, current,icon }) {
  const active = current == View ? 1 : 0;
  return (
    <Link to={View == "Profile" ? "" : View}>
      <Grid
        container
        xs={2}
        md={10}
        className={classes.tab}
        sx={{
          boxShadow: "3",
          background: active ? "#3b82f6" : "",
          color: active ? "white" : "#3b82f6",
          margin: "2px",
          height: "50px",
          justifyContent: {xs:'center',md:'start'},
        }}
      >
        {icon}
        <Typography
          sx={{ fontFamily: "inherit", display: { xs: "none", md: "block" } }}
        >
          {tabName}
        </Typography>
      </Grid>
    </Link>
  );
}
