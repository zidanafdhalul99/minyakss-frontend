import React from "react";
import { Button } from "primereact/button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Additem() {
  const [merk, setMerk] = useState("");
  const [harga, setHarga] = useState("");
  const [tgl, setTgl] = useState("");
  const navigate = useNavigate();

  const hostname = "192.168.1.2";
  // const hostname = "192.168.18.9";
  // const hostname = "10.200.7.9";

  const saveItems = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://${hostname}:5000/items`, {
        merk,
        harga,
        tgl,
      });
      navigate("/itemlist");
    } catch (error) {
      await axios.post(`http://localhost:5000/items`, {
        merk,
        harga,
        tgl,
      });
      navigate("/itemlist");
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col mt-3">
          <div className="flex bg-gray-200 gap-3 rounded-3xl h-12 w-screen shadow">
            <Link to="/itemlist" className="flex text-purple-600">
              <div className="flex justify-center items-center bg-gray-100 w-12 rounded-3xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8"
                >
                  <path
                    strokelinecap="round"
                    strokelinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </div>
            </Link>
            <div className="flex items-center pt-2">
              <h1 className=" text-2xl text-purple-600 italic ">Add Items</h1>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="bg-gray-100 rounded-lg mt-8 mx-3 pt-2 pb-3 px-3 shadow">
            <form onSubmit={saveItems} class="">
              <div className="">
                <label className="text-xl font-bold">Merk Minyak</label>
                <input
                  className="w-full bg-gray-200 text-gray-700 rounded py-3 px-2 mb-3  focus:outline-none focus:bg-gray"
                  type="text"
                  value={merk}
                  onChange={(e) => setMerk(e.target.value)}
                />
              </div>
              <div className="">
                <label className="text-xl font-bold">Harga</label>
                <input
                  className="w-full bg-gray-200 text-gray-700 rounded py-3 px-2 mb-3  focus:outline-none focus:bg-gray"
                  type="number"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                />
              </div>
              <div className="">
                <label className="text-xl font-bold">Tanggal</label>
                <input
                  className="w-full bg-gray-200 text-gray-700 rounded py-3 px-2 mb-3  focus:outline-none focus:bg-gray"
                  type="date"
                  value={tgl}
                  onChange={(e) => setTgl(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <Button label="Add Items" type="submit" icon="pi pi-plus"></Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Additem;
