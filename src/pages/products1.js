import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';

function Products() {
    const [products, setProducts] = useState([]);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [selectedProductIndex, setSelectedProductIndex] = useState(null);

    const fetchProducts = async () => {
        try {
            const res = await axios('https://dummyjson.com/products', {
                params: {
                    limit: 10,
                },
            });
            setProducts(res.data.products);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleRemoveClick = (index) => {
        setSelectedProductIndex(index);
        setShowRemoveModal(true);
    };

    const handleConfirmRemove = () => {
        if (selectedProductIndex !== null) {
            const updatedProducts = products.filter((_, index) => index !== selectedProductIndex);
            setProducts(updatedProducts);
            const deletedProductId = products[selectedProductIndex].id; // Tentukan ID produk yang akan dihapus
            axios.delete(`https://dummyjson.com/products/${deletedProductId}`)
                .then((response) => {
                    console.log('Product deleted:', response.data);
                })
                .catch((error) => {
                    console.error('Error deleting product:', error);
                });

        }
        setShowRemoveModal(false);
    };

    return (
        <div className='bg-slate-600 text-white pb-6'>
            <Navbar />
            <div class='min-h-screen mx-auto max-w-6xl pt-24'>
                <div class="flex justify-between items-center mb-3 px-3 lg:px-0">
                    <h1 class="font-bold text-4xl mb-6">Products</h1>
                    <a href="add">
                        <span role="button" class="inline-block bg-blue-500 text-white rounded-lg px-5 py-2 hover:bg-blue-600">Add new product</span>
                    </a>
                </div>
                <div className='grid lg:grid-cols-4 grid-cols-2 gap-6 px-3 lg:px-0'>
                    {products &&
                        products.length > 0 &&
                        products.map((product, index) => (
                            <div className='bg-slate-700 rounded-lg p-3 min-h-[20rem] relative' key={index}>
                                <figure className='block h-[10rem] bg-slate-100 rounded-lg'>
                                    <img
                                        src={product.thumbnail} // Ubah 'product.thumbnail' menjadi URL gambar produk
                                        alt={product.title} // Tambahkan atribut alt untuk aksesibilitas
                                        className='w-full h-full object-contain aspect-auto'
                                    />
                                </figure>
                                <div className='py-2'>
                                    <h3 className='text-lg'>{product.title}</h3>
                                    <h4 className='text-sm'>Rp. 549</h4>
                                </div>
                                <div className='flex space-x-3 justify-between align-items-center'>
                                    <button
                                        onClick={() => handleRemoveClick(index)}
                                        type='button'
                                        className='border border-red-600 bg-white text-red-600 block w-full px-5 py-2 hover:bg-red-600 hover:text-white rounded-lg text-sm'
                                    >
                                        Remove
                                    </button>
                                    <a
                                        href='/edit'
                                        type='button'
                                        className='border text-center border-emerald-600 bg-white text-emerald-600 block w-full px-5 py-2 hover:bg-emerald-600 hover:text-white rounded-lg text-sm'
                                    >
                                        Edit
                                    </a>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Remove Modal */}
                {showRemoveModal && (
                    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto'>
                        <div className='relative bg-white w-full max-w-md p-6 rounded-lg shadow-lg'>
                            <button
                                onClick={() => setShowRemoveModal(false)}
                                type='button'
                                className='absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 ml-auto inline-flex justify-center items-center'
                            >
                                <svg
                                    className='w-3 h-3'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 14 14'
                                >
                                    {/* Close icon path */}
                                </svg>
                                <span className='sr-only'>Close modal</span>
                            </button>
                            <div className='p-6 text-center'>
                                <h3 className='mb-5 text-lg font-normal text-gray-500'>
                                    Are you sure you want to remove this product?
                                </h3>
                                <button
                                    onClick={handleConfirmRemove}
                                    type='button'
                                    className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
                                >
                                    Yes, I'm sure
                                </button>
                                <button
                                    onClick={() => setShowRemoveModal(false)}
                                    type='button'
                                    className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10'
                                >
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Products;
