import React, { useState } from "react";
import { useAtom } from "jotai";
import { ordersAtom } from "../../globalState";
import { useEffect } from "react";
import convertRupiah from "rupiah-format";
import axios from "axios";

function Content() {
  // const hostname = "192.168.18.9";
  const hostname = "192.168.1.2";
  // const hostname = "10.200.7.9";

  
  const [orders, setOrders] = useAtom(ordersAtom);
  const getOrders = async () => {
    try {
      const response = await axios.get(
        `http://${hostname}:5000/orders/?limit=3`
      );
      setOrders(response.data);
    } catch (err) {
      const response = await axios.get(`http://localhost:5000/orders/?limit=3`);
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
      <div className="flex flex-col bg-white mt-2 h-90 ">
        <div className="flex items-center pl-6 pt-2 ">
          <h1 className="text-xl text-gray-700 font-mono">Recent Transaction</h1>
        </div>

        {orders.map((order) => (
          <div className="flex gap-2 mx-1 mb-3 ">
            <div className="flex flex-col flex-none w-screen bg-gray-200 rounded-lg">
              <div className="flex bg-gray-300 rounded-lg justify-center">
                <div className="text-xl font-bold italic">
                  {moment(order.tanggal).format("YYYY-MM-DD")}
                </div>
              </div>
              <div className="flex flex-col gap-y-4 py-2 pl-2 pr-3">
                <div className="flex justify-between ">
                  <div className="flex bg-gray-300 items-center h-8 pl-2 w-40 rounded-xl">
                    <div className="text-md">Merk : {order.merk}</div>
                  </div>
                  <div className="flex justify-between ">
                    <div className="flex bg-gray-300 items-center h-8 pl-2 w-40 rounded-xl">
                      <div className="text-md">
                        Jumlah Order : {order.jumlah}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex ">
                  <div className="flex bg-gray-300 justify-center items-center h-8 pl-2 w-full rounded-xl">
                    <div className="text-md">
                      Profit : {convertRupiah.convert(order.profit)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Content;
