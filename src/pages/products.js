import axios from 'axios';
import { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState();

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

  return <ProductItem products={products} />;
}

export const ProductItem = (props) => {
  const products = props.products;

  return (
    <div className='container grid grid-cols-3 gap-5 p-10 w-screen mx-auto'>
      {products &&
        products.length > 0 &&
        products.map((product, index) => {
          return (
            <div
              className='h-64 flex flex-col items-center justify-between border-2 rounded-md p-3'
              key={index}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className='h-48 object-cover w-full rounded'
              />
              <p className='font-semibold'>{product.title}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Products;