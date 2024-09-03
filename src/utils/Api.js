export const getcartData = async () => {
  await fetch("https://fakestoreapi.com/products", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
