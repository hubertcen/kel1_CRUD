import { Nabla } from "next/font/google";
import React from "react";

function Navbar() {
    return (
      <div className='bg-slate-600 text-white pb-6'>
      <nav class="bg-slate-700 text-white fixed top-0 left-0 w-full z-50">
          <div class="mx-auto max-w-6xl py-6 flex justify-between items-center">
              <a href="/products"><h1 class="font-bold text-2xl text-emerald-500">TokoLaku</h1></a>
              <div class="flex justify-start items-center space-x-3">
                  <a role="link" href="#" type="button" class="block bg-white px-4 py-2 hover:bg-slate-100 text-sm rounded-lg text-slate-600">Profile</a>
                  <a role="link" href="/login" type="button" class="block bg-red-500 px-4 py-2 hover:bg-red-600 text-sm rounded-lg">Logout</a>
              </div>
          </div>
      </nav>
      </div>
    );
  };
export default Navbar;