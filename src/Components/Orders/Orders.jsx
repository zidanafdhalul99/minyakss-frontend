import React from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { ordersAtom } from "../../globalState";
import axios from "axios";
import { useEffect } from "react";
import { useAtom } from "jotai";
import convertRupiah from "rupiah-format";

function Orders() {
  // const hostname = "192.168.18.9";
  const hostname = "192.168.1.2";
  // const hostname = "10.200.7.9";
  
  const [orders, setOrders] = useAtom(ordersAtom);
  const getOrders = async () => {
    try {
      const response = await axios.get(
        `http://${hostname}:5000/orders/?limit=1`
      );
      setOrders(response.data);
    } catch (err) {
      const response = await axios.get(`http://localhost:5000/orders/?limit=1`);
      setOrders(response.data);
    }
  };
  useEffect(() => {
    getOrders([]);
  }, []);

  orders.map((order) => {
    order.modal = order.jumlah * order.harga_beli;
    order.penjualan = order.jumlah * order.harga_jual;
    order.profit = order.penjualan - order.modal;
  });

  const moment = require("moment");
  return (
    <>
      <div className="flex flex-col items-center h-screen">
        <div className="flex flex-col mt-3">
          <div className="flex bg-gray-200 gap-3 rounded-3xl h-12 w-screen shadow">
            <Link to="/" className="flex text-pink-500">
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
              <h1 className=" text-2xl text-pink-500 italic ">Order</h1>
            </div>
          </div>
        </div>
        <div className="flex gap-3 bg-gray-200 rounded-lg mt-8 mx-3 pt-2 pb-3 px-3">
          <div className="flex pt-2 pl-2 justify-start items-center bg-gray-200 rounded-lg h-12 w-64 shadow">
            <h1 className="text-2xl text-black italic ">Tambah Orderan</h1>
          </div>
          <div className="flex flex-col items-end">
            <Link className="no-underline" to="/addorder">
              <Button
                icon="pi pi-plus "
                style={{
                  width: "50px",
                  backgroundColor: "blue",
                  borderRadius: "20%",
                  color: "white",
                  border: "none",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              />
            </Link>
          </div>
        </div>
        {orders.map((order, urutanKe) => (
          <div className="flex flex-col w-fit items-center gap-2 bg-gray-200 rounded-lg mt-2 mx-3 pt-2 pb-3 px-3">
            <div className="flex pt-2 pl-2 justify-start items-center bg-gray-200 rounded-lg h-12 w-80 shadow">
              <h1 className="text-2xl text-black italic ">Rincian Orderan</h1>
            </div>

            <div
              key={urutanKe}
              className="flex flex-col gap-4 p-2 bg-gray-200 rounded-lg w-80 shadow"
            >
              <div className="flex justify-between ">
                <div>Tanggal Order : </div>
                <div> {moment(order.tgl).format("YYYY-MM-DD")}</div>
              </div>
              <div className="flex justify-between ">
                <div>Merk Minyak :</div>
                <div>{order.merk}</div>
              </div>
              <div className="flex justify-between ">
                <div>Jumlah Order :</div>
                <div>{order.jumlah}</div>
              </div>
              <div className="flex justify-between">
                <div>Harga Beli :</div>
                <div>{convertRupiah.convert(order.harga_beli)}</div>
              </div>
              <div className="flex justify-between">
                <div>Harga Jual :</div>
                <div>{convertRupiah.convert(order.harga_jual)}</div>
              </div>
              <div className="flex justify-between">
                <div>Total Penjualan :</div>
                <div>{convertRupiah.convert(order.penjualan)}</div>
              </div>
            </div>
            <div className="flex p-2 justify-between items-center bg-gray-200 rounded-lg h-12 w-80 shadow">
              <div className="text-xl italic ">Keuntungan : </div>
              <div className="">{convertRupiah.convert(order.profit)}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Orders;
