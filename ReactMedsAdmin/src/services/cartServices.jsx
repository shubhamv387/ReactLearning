import axios from 'axios';

const baseUrl =
  'https://crudcrud.com/api/0b2a073bfc8143528c86a044f1ff49d2/cart';

export const getCart = async () => {
  try {
    const { data } = await axios.get(baseUrl);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const addToCart = async (item) => {
  try {
    const { data } = await axios.post(baseUrl, item);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFromCart = async (_id) => {
  try {
    const { data } = await axios.delete(`${baseUrl}/${_id}`);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const orderFromCart = async (items) => {
  try {
    items.forEach(async (item) => {
      await axios.delete(`${baseUrl}/${item._id}`);
    });

    return 'Order Successful!';
  } catch (error) {
    console.log(error.message);
  }
};
