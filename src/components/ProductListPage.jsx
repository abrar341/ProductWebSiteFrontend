import { useEffect, useState, useMemo } from "react";
import { getProducts, deleteProduct } from "../api/crudApi";
import { MdDelete } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai"; // for close icon

const ProductListPage = ({ products, setProducts, isAdmin }) => {
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("none");
    const [selectedProduct, setSelectedProduct] = useState(null); // 🌟 Modal state

    useEffect(() => {
        const fetchProducts = async () => {
            const productsList = await getProducts();
            if (productsList) {
                setProducts(productsList.products);
            }
        };
        fetchProducts();
    }, [setProducts]);

    const handleDelete = async (id) => {
        const result = await deleteProduct(id);
        if (result) {
            setProducts((prev) => prev.filter((product) => product._id !== id));
        }
    };

    const categories = useMemo(() => {
        const allCategories = products.map((product) => product.category);
        return ["all", ...new Set(allCategories)];
    }, [products]);

    const filteredProducts = useMemo(() => {
        let filtered = products.filter((product) => {
            const matchCategory = categoryFilter === "all" || product.category === categoryFilter;
            const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCategory && matchSearch;
        });

        if (sortOrder === "asc") {
            filtered = [...filtered].sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
            filtered = [...filtered].sort((a, b) => b.price - a.price);
        }

        return filtered;
    }, [products, categoryFilter, searchQuery, sortOrder]);

    return (
        <div className="p-4 text-white">
            <h1 className="text-xl font-bold mb-4">Product List</h1>

            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-blue-800 text-white p-2 rounded"
                >
                    {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-blue-800 text-white p-2 rounded w-full md:w-64"
                />

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="bg-blue-800 text-white p-2 rounded"
                >
                    <option value="none">Sort by Price</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
                <div>No products to show</div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredProducts.map((product, index) => (
                        <li
                            key={index}
                            className="border p-4 rounded shadow cursor-pointer hover:bg-blue-900 transition"
                            onClick={() => setSelectedProduct(product)} // 👈 Open Modal
                        >
                            {product.image && (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover mb-3 rounded"
                                />
                            )}
                            <h2 className="font-semibold text-lg">{product.name}</h2>
                            <p className="text-blue-200">Category: {product.category}</p>
                            <p className="text-green-600 font-medium">Price: {product.price}</p>
                            {isAdmin && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // prevent modal open
                                        handleDelete(product._id);
                                    }}
                                    className="w-full flex items-center justify-end mt-2 hover:text-red-500 transition"
                                >
                                    <MdDelete className="text-2xl" />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal */}
            {selectedProduct && (
                <div className="fixed text-white inset-0 bg-black bg-primary flex items-center justify-center z-50">
                    <div className="bg-blue-600 text-black rounded-lg p-6 w-11/12 max-w-md relative">
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-1 right-1 text-gray-200 hover:text-black"
                        >
                            <AiOutlineClose className="text-xl" />
                        </button>
                        {selectedProduct.image && (
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full h-60 object-cover rounded-xl mb-4"
                            />
                        )}
                        <h2 className="text-xl text-gray-200 font-bold">{selectedProduct.name}</h2>
                        <p className="text-gray-200">Category: {selectedProduct.category}</p>
                        <p className="text-green-200 font-semibold">Price: {selectedProduct.price}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductListPage;
