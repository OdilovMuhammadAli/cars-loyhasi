import { getAll } from "./request.js";

getAll()
  .then((res) => {
    console.log(res);
  })
  .catch((error) => console.log(error.message));
