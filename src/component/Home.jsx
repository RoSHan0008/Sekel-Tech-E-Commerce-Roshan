import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Grid2, IconButton, Rating, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const getAllcartData = async () => {
    setLoader(true);
    await fetch("https://fakestoreapi.com/products", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        alert(`Error while fetching data from API ${err}`);
      });
  };

  const Categories = [...new Set(data.map((item) => item.category))];

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  console.log(data);

  useEffect(() => {
    getAllcartData();
  }, []);

  return (
    <Grid2>
      <Header />
      <Grid2>
        {loader ? (
          <Typography>Loading...</Typography>
        ) : (
          Categories.map((category, index) => (
            <Grid2 key={index} item xs={12}>
              <Typography className="cart-category">{category}</Typography>
              <Grid2 className="Home-cart-canterner">
                {data
                  .filter((item) => item?.category === category)
                  .map((item) => (
                    <Grid2
                      className="Home-cart"
                      key={item?.id}
                      onClick={()=>navigate(`/product/${item?.id}`)}
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
                        />
                        <Typography className="cart-count">
                          ({item?.rating?.count})
                        </Typography>
                      </Grid2>
                      <Grid2 className="cart-price-conterner">
                        <Typography className="cart-price">
                          ${item?.price}
                        </Typography>
                        <IconButton sx={{ color: "#fff" }} onClick={()=>navigate(`/Cart`)} className="add-to-cart">
                          <AddShoppingCartIcon />
                        </IconButton>
                      </Grid2>
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
