import { Badge, Grid2, IconButton, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React from "react";

export default function Header() {
  return (
    <Grid2 className="Header-container">
      <Typography className="logo">Sekel Tech Assignment By Roshan</Typography>
      <IconButton aria-label="cart" className="header-icon" sx={{color:"#fff"}}>
        <Badge badgeContent={1} color="info">
          <ShoppingCartOutlinedIcon />
         
        </Badge>
        <Typography>Cart</Typography>
      </IconButton>
    </Grid2>
  );
}
