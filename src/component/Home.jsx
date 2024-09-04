import React, { useEffect, useState } from "react";
import Header from "./Header";
import { toast } from "react-toastify";
import {
  CircularProgress,
  Grid2,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAllItem, addItemToCart } from "../utils/Slice";

export default function Home() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getAllcartData = async () => {
    setLoader(true);
    await fetch("https://fakestoreapi.com/products", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        dispatch(addAllItem(res))
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        alert(`Error while fetching data from API ${err}`);
      });
  };

  const Categories = [...new Set(data.map((item) => item.category))];

  useEffect(() => {
    getAllcartData();
  }, []);

  return (
    <Grid2>
      <Header />
      <Grid2>
        {loader ? (
          <Grid2
            sx={{ height: "90vh" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Grid2>
        ) : (
          Categories.map((category, index) => (
            <Grid2 key={index} item xs={12}>
              <Typography className="cart-category">{category}</Typography>
              <Grid2 className="Home-cart-canterner">
                {data
                  .filter((item) => item?.category === category)
                  .map((item) => (
                    <Grid2 position="relative" flex="0 0 auto">
                      <Grid2
                        className="Home-cart"
                        key={item?.id}
                        onClick={() => navigate(`/product/${item?.id}`)}
                      >
                        <img src={item?.image} className="cart-image" />
                        <Typography className="cart-title">
                          {item?.title}
                        </Typography>
                        <Grid2 className="cart-rating">
                          <Rating
                            size="small"
                            value={item?.rating?.rate}
                            readOnly
                            className="Rating"
                          />
                          <Typography className="cart-count">
                            ({item?.rating?.count})
                          </Typography>
                        </Grid2>
                        <Grid2 className="cart-price-conterner">
                          <Typography className="cart-price">
                            ${item?.price}
                          </Typography>
                        </Grid2>
                      </Grid2>
                      <IconButton
                        sx={{ color: "#fff" }}
                        onClick={() => {
                          dispatch(addItemToCart(item));
                        }}
                        className="add-to-cart"
                      >
                        <AddShoppingCartIcon color="" />
                      </IconButton>
                    </Grid2>
                  ))}
              </Grid2>
            </Grid2>
          ))
        )}
      </Grid2>
    </Grid2>
  );
}
