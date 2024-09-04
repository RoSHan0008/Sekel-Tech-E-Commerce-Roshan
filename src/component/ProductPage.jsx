import { Button, Grid2, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { addItemToCart } from "../utils/Slice";
import { useDispatch } from "react-redux";

export default function ProductPage() {
  const [item, setItem] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();

  const getAllcartData = async () => {
    await fetch("https://fakestoreapi.com/products", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        const filteredData = res.filter((data) => data.id === Number(id));

        if (filteredData.length > 0 && !item) {
          setItem(filteredData[0]);
        }
      })
      .catch((err) => {
        alert(`Error while fetching data from API ${err}`);
      });
  };

  useEffect(() => {
    getAllcartData();
  }, [id]);

  return (
    <Grid2>
      <Header />
      {item && (
        <Grid2 className="ProductPage-container">
          <img src={item?.image} className="ProductPage-image" />
          <Grid2 className="ProductPage-detail-container">
            <Typography
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
                paddingBottom: "1rem",
              }}
            >
              {item?.title}
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                paddingBottom: "1rem",
              }}
            >
              {item?.description}
            </Typography>
            <Grid2 className="cart-rating">
              <Rating size="small" value={item?.rating?.rate} readOnly />
              <Typography className="cart-count">
                ({item?.rating?.count})
              </Typography>
            </Grid2>
            <Grid2
              sx={{
                padding: "1rem 0rem",
              }}
            >
              <Typography className="cart-price">${item?.price}</Typography>
            </Grid2>
            <Button
              sx={{
                background: "#26b646",
                color: "#fff",
              }}
              onClick={() => {
                dispatch(addItemToCart(item));
              }}
            >
              Add to cart
            </Button>
          </Grid2>
        </Grid2>
      )}
    </Grid2>
  );
}
