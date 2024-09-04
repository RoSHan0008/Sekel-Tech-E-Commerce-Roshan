import {
  Badge,
  Box,
  Button,
  Grid2,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, removeItemFromCart } from "../utils/Slice";
import CloseIcon from "@mui/icons-material/Close";

export default function Header() {
  const [open, setOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce((accumulator, item) => {
    return accumulator + Number(item.price);
  }, 0);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid2 className="Header-container">
      <Typography
        className="logo"
        onClick={() => {
          navigate("/");
        }}
      >
        Sekel Tech Assignment By Roshan
      </Typography>
      <IconButton
        aria-label="cart"
        className="header-icon"
        sx={{ color: "#fff" }}
        onClick={() => setOpen(true)}
      >
        <Badge badgeContent={cartItems?.length} color="info">
          <ShoppingCartOutlinedIcon />
        </Badge>
        <Typography>Cart</Typography>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal"
      >
        <Box className="box">
          {cartItems?.length > 0 ? (
            <>
              <Grid2 className="header-item-list">
                {cartItems?.map((item) => (
                  <Grid2
                    display="flex"
                    m={1}
                    sx={{ border: "1px solid #ffffff50" }}
                  >
                    <img
                      src={item?.image}
                      style={{
                        height: "6rem",
                        width: "6rem",
                      }}
                    />
                    <Grid2>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          color: "#fff",
                          width: "12rem",
                          padding: ".5rem ",
                        }}
                      >
                        {item?.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          color: "#fff",
                          width: "12rem",
                          padding: "0rem .5rem",
                        }}
                      >
                        ${item?.price}
                      </Typography>
                      <Grid2 display="flex">
                        <Button
                          sx={{
                            background: "#b61717",
                            color: "white",
                            margin: ".5rem",
                            padding: ".2rem .5rem",
                          }}
                          onClick={() => {
                            dispatch(removeItemFromCart(item));
                          }}
                        >
                          Remove
                        </Button>
                      </Grid2>
                    </Grid2>
                  </Grid2>
                ))}
              </Grid2>
              <Grid2
                sx={{
                  width: "20rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Grid2 display="flex" justifyContent="space-between">
                  <Grid2></Grid2>
                  <IconButton
                    sx={{
                      display: "flex",
                      flex: "end",
                    }}
                    onClick={() => handleClose()}
                  >
                    <CloseIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </Grid2>

                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#fff",
                    width: "12rem",
                    padding: "0rem .5rem",
                  }}
                >
                  Price details
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#fff",
                    width: "12rem",
                    padding: "1rem",
                  }}
                >
                  Total Price = {totalPrice.toFixed(2)}
                </Typography>
                <Button
                  sx={{
                    background: "#fff",
                    color: "#000",
                    margin: ".5rem",
                    width: "100%",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    dispatch(clearCart());
                  }}
                >
                  Clear Cart
                </Button>
              </Grid2>
            </>
          ) : (
            <Grid2
              sx={{
                width: "20rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#fff",
                  padding: "1rem",
                }}
              >
                Your cart is empty! Add items to it now.
              </Typography>
              <Button
                sx={{
                  background: "#fff",
                  color: "#000",
                  margin: ".5rem",
                  width: "100%",
                  fontWeight: "bold",
                  margin: "1rem",
                }}
                onClick={() => {
                  handleClose()
                  navigate("/");
                }}
              >
                Shop Now
              </Button>
            </Grid2>
          )}
        </Box>
      </Modal>
    </Grid2>
  );
}
