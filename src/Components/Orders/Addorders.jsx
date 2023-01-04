import React from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Addorders() {
  const [tanggal, setTanggal] = useState("");
  const [merk, setMerk] = useState("");
  const [jumlah, setjumlah] = useState("");
  const [harga_beli, setharga_beli] = useState("");
  const [harga_jual, setharga_jual] = useState("");
  const navigate = useNavigate();
  
  const hostname = "192.168.1.2";
  // const hostname = "192.168.18.9";
  // const hostname = "10.200.7.9";
  
  const saveOrders = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://${hostname}:5000/orders`, {
        tanggal,
        merk,
        jumlah,
        harga_beli,
        harga_jual,
      });
      navigate("/orders");
    } catch (error) {
      await axios.post(`http://localhost:5000/orders`, {
        tanggal,
        merk,
        jumlah,
        harga_beli,
        harga_jual,
      });
      console.log(error);
    }
  };

  return (
    <div>
      <>
        <div className="flex flex-col items-center">
          <div className="flex flex-col mt-3">
            <div className="flex bg-gray-200 gap-3 rounded-3xl h-12 w-screen shadow">
              <Link to="/orders" className="flex text-pink-500">
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </div>
              </Link>
              <div className="flex items-center pt-2">
                <h1 className=" text-2xl text-pink-500 italic ">Add Order</h1>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="bg-gray-100 rounded-lg mt-8 mx-3 pt-2 pb-3 px-3 shadow">
              <form onSubmit={saveOrders}>
                <div className="">
                  <label className="text-xl font-bold">Tanggal</label>
                  <input
                    className="w-full bg-gray-200 text-gray-700 rounded py-3 px-2 mb-3  focus:outline-none focus:bg-gray"
                    type="date"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                  />
                </div>
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
                  <label className="text-xl font-bold">
                    Masukan Jumlah Order
                  </label>
                  <input
                    className="w-full bg-gray-200 text-gray-700 rounded py-3 px-2 mb-3  focus:outline-none focus:bg-gray"
                    type="number"
                    value={jumlah}
                    onChange={(e) => setjumlah(e.target.value)}
                  />
                </div>
                <div className="">
                  <label className="text-xl font-bold">
                    Masukan Harga Beli
                  </label>
                  <input
                    className="w-full bg-gray-200 text-gray-700 rounded py-3 px-2 mb-3  focus:outline-none focus:bg-gray"
                    type="number"
                    value={harga_beli}
                    onChange={(e) => setharga_beli(e.target.value)}
                  />
                </div>
                <div className="">
                  <label className="text-xl font-bold">
                    Masukan Harga Jual
                  </label>
                  <input
                    className="w-full bg-gray-200 text-gray-700 rounded py-3 px-2 mb-3  focus:outline-none focus:bg-gray"
                    type="number"
                    value={harga_jual}
                    onChange={(e) => setharga_jual(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    label="Add Order"
                    type="submit"
                    icon="pi pi-plus"
                  ></Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Addorders;
