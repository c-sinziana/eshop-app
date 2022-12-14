import React from "react";
import { Box, Button, Card, CardMedia, Chip, Typography } from "@mui/material";
import { AxiosRequestConfig } from "axios";

import { useShoppingCart } from "../../context/ShoppingCartContext";
import useFetchData from "../../hooks/useFetchData";

type CartItemCardProps = {
  id: number;
  quantity: number;
};

export default function CartItemCard({ id, quantity }: CartItemCardProps) {
  const productRequest: AxiosRequestConfig = {
    url: `/products/${id}`,
    method: "get",
  };

  const [{ data: product, loading, error }] = useFetchData(
    productRequest,
    true
  );
  const { cartProducts, removeFromCart, getProductQuantity } =
    useShoppingCart();
  const productCart = cartProducts.find((product) => product.id === id);
  if (productCart == null) return null;
  const productQuantity = getProductQuantity(product.id);
  
  return (
    <Card>
      <Box
        sx={{ flexDirection: { sm: "row", md: "row", xs: "row" } }}
        display="flex"
        alignItems="center"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            image={product.image}
            alt="no image"
            sx={{
              width: { sm: "20%", md: "20%", xs: "20%" },
              height: "40%",
              objectFit: "contain",
              marginTop: "5%",
              marginLeft: { xs: "5%" },
            }}
          />
          <Typography
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              marginLeft: "2%",
            }}
          >
            {product.price} $
          </Typography>
          <Button
            variant="contained"
            sx={{ width: "30%" }}
            onClick={() => removeFromCart(product.id)}
          >
            Remove
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginRight: "5%",
          }}
        >
          <Typography
            sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
          >
            {product.title}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            Quantity:
            <Chip
              label={productQuantity}
              variant="filled"
              color="success"
              sx={{ width: "40%" }}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
