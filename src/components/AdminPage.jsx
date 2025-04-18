import { useState } from "react";

import { IoAdd } from "react-icons/io5";
import { addProduct, getProducts } from "../api/crudApi";
import ModalComponent from "./ModalComponent";
import ModalForm from "./ModalForm";
import ProductListPage from "./ProductListPage";

const AdminPage = ({ setProducts, products }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpen = () => setIsOpen(true);

    const handleClose = () => {

        setIsOpen(false);
    };

    const handleSubmit = async (formValues) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Build FormData
            const formData = new FormData();
            Object.entries(formValues).forEach(([key, value]) => {
                formData.append(key, value);
            });

            const res = await addProduct(formData); // assuming your API supports multipart/form-data

            const productsList = await getProducts();
            setProducts(productsList.products);

            if (res?.error) {
                setError(res.message);
                return;
            }

            handleClose();
        } catch (error) {
            console.error(error);
            setError("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="min-h-screen bg-primary">
            <div>
                <>
                    <div className=" flex items-center gap-2 justify-center text-white p-4 border border-gray-200 rounded "
                        onClick={handleOpen}>
                        <IoAdd className="text-2xl" /> Add New Product
                    </div>
                    <ModalComponent isOpen={isOpen} onClose={handleClose}>
                        <ModalForm
                            fields={[
                                {
                                    label: "Image",
                                    type: "file", // this makes it render a file input
                                    defaultValue: "",
                                    placeholder: "Upload Image",
                                },
                                {
                                    label: "Name",
                                    defaultValue: "",
                                    placeholder: "Enter Name",
                                },
                                {
                                    label: "Category",
                                    defaultValue: "",
                                    placeholder: "Enter Category",
                                },
                                {
                                    label: "Price",
                                    defaultValue: "",
                                    placeholder: "Enter Price",
                                },
                            ]}
                            onClose={handleClose}
                            onSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                            error={error}
                        />
                    </ModalComponent>
                </>
            </div>
            <ProductListPage isAdmin={true} setProducts={setProducts} products={products} />
        </div>
    );
};


export default AdminPage
