import axios from 'axios';

export const addProduct = async (productData) => {
    console.log("productData", productData);

    try {
        const res = await axios.post('http://localhost:5000/api/products', productData);
        return res.data;
    } catch (error) {
        console.error("Error adding product:", error);
        return null;
    }
};

export const deleteProduct = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/products/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        return null;
    }
};

export const getProducts = async () => {

    try {
        const res = await axios.get('http://localhost:5000/api/products');
        return res.data;
    } catch (error) {
        console.error("Error adding product:", error);
        return null;
    }
};
