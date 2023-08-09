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
      <div class="min-h-screen mx-auto max-w-6xl pt-24">
        <h1 class="text-xl font-bold mb-5">Add</h1>
        <div class="w-1/2 ">
          <form onSubmit={handleSubmit}>
            <label for="title" class="block mb-5">
              <span class="block mb-3">Title</span>
              <input
                type="text"
                class="bg-white p-3 w-full outline-none rounded-lg text-slate-700"
                name="title"
                id="title"
                onChange={(e) => setProductTitle(e.target.value)}
              />
            </label>
            <label for="price" class="block mb-5">
              <span class="block mb-3">Price</span>
              <input
                type="text"
                class="bg-white p-3 w-full outline-none rounded-lg text-slate-700"
                name="price"
                id="price"
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </label>
            <button
              type="submit"
              class="block bg-white px-4 py-2 hover:bg-slate-100 text-sm rounded-lg text-slate-600"
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
