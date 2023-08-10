import Navbar from "./navbar";
import { useState } from "react";
import axios from "axios";

function Add() {
  const [productTitle, setProductTitle] = useState();
  const [productPrice, setProductPrice] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://dummyjson.com/products/add", {
        title: productTitle,
        price: productPrice,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="bg-slate-600 text-white pb-6">
      <Navbar />
      <div className="min-h-screen mx-auto max-w-6xl pt-24">
        <h1 className="text-xl font-bold mb-5">Add</h1>
        <div className="w-1/2 ">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title" className="block mb-5">
              <span className="block mb-3">Title</span>
              <input
                type="text"
                className="bg-white p-3 w-full outline-none rounded-lg text-slate-700"
                name="title"
                id="title"
                onChange={(e) => setProductTitle(e.target.value)}
              />
            </label>
            <label htmlFor="price" className="block mb-5">
              <span className="block mb-3">Price</span>
              <input
                type="text"
                className="bg-white p-3 w-full outline-none rounded-lg text-slate-700"
                name="price"
                id="price"
                onChange={(e) => setProductPrice(Number(e.target.value))}
              />
            </label>
            <button
              type="submit"
              className="block bg-white px-4 py-2 hover:bg-slate-100 text-sm rounded-lg text-slate-600"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add;
