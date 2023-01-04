import React from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import convertRupiah from "rupiah-format";
import { ordersAtom } from "../../globalState";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { HiArrowDownTray } from "react-icons/hi2";

export default function Print() {
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

  const createPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "b6");
    const data = await document.querySelector("#pdf");
    orders.map((order) => {
      pdf.html(data).then(() => {
        pdf.save(`${order.merk}_${moment(order.tanggal).format("YYYY-MM-DD")}.pdf`);
      });
    });
  };

  const toast = useRef(null);
  const accept = (createpdf) => {
    toast.current.show({
      severity: "success",
      summary: "Confirmed",
      detail: "Download PDF Success",
      life: 3000,
      style: { width: "90%" },
    });
    createPDF(createpdf);
  };

  const reject = () => {
    toast.current.show({
      severity: "error",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
      style: { width: "90%" },
    });
  };

  const confirm2 = (createpdf) => {
    confirmDialog({
      message: "Do you want to download this record?",
      header: "Download Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-succes",
      accept: () => accept(createpdf),
      reject,
    });
  };
  const moment = require("moment");
  return (
    <>
      <Toast ref={toast} position="top-left" />
      <ConfirmDialog />
      <div className="flex flex-col items-center h-full">
        <div className="flex flex-col mt-3">
          <div className="flex bg-gray-200 gap-3 rounded-3xl h-12 w-screen shadow">
            <Link to="/" className="flex text-green-700">
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
              <h1 className=" text-2xl text-green-700 italic ">Print</h1>
            </div>
          </div>
        </div>
        <div id="pdf" className="mt-9">
          {orders.map((order) => (
            <div className="flex flex-col w-fit items-center gap-2 bg-gray-200 rounded-lg mt-2 mx-3 pt-2 pb-3 px-3">
              <div className="flex flex-col gap-3 p-2 bg-gray-200 rounded-lg w-72 ">
                <div className="flex text-2xl">
                  <div>Rincian Orderan</div>
                </div>
                <div className="flex justify-between ">
                  <div>Tanggal Order : </div>
                  <div> {moment(order.tanggal).format("YYYY-MM-DD")}</div>
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
                  <div>Total Modal :</div>
                  <div>{convertRupiah.convert(order.modal)}</div>
                </div>
                <div className="flex justify-between">
                  <div>Total Penjualan :</div>
                  <div>{convertRupiah.convert(order.penjualan)}</div>
                </div>
                <div className="flex justify-between">
                  <div>Keuntungan : </div>
                  <div>{convertRupiah.convert(order.profit)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-3 mr-40 w-40 justify-between pl-1 pr-5 items-center bg-white border-green-600 border-2 rounded-full h-12">
          <div className="flex text-white justify-center items-center rounded-full text-2xl bg-green-600 w-10 h-10">
            <HiArrowDownTray />
          </div>
          <button
            onClick={() => {
              confirm2(createPDF);
            }}
            type="button"
          >
            <div className="text-green-600">Download</div>
          </button>
        </div>
      </div>
    </>
  );
}
