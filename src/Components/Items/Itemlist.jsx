import React from "react";
import { Button } from "primereact/button";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import convertRupiah from "rupiah-format";

function Itemlist() {
  const hostname = "192.168.1.2";
  // const hostname = "192.168.18.9";
  // const hostname = "10.200.7.9";

  const [Items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const response = await axios.get(`http://${hostname}:5000/items`);
      setItems(response.data);
    } catch (err) {
      const response = await axios.get(`http://localhost:5000/items`);
      setItems(response.data);
    }
  };
  const deleteItems = async (id) => {
    try {
      await axios.delete(`http://${hostname}:5000/items/${id}`);
      getItems();
    } catch (error) {
      await axios.delete(`http://localhost:5000/items/${id}`);
      getItems();
      console.log(error);
    }
  };
  const toast = useRef(null);
  const accept = (itemssid) => {
    toast.current.show({
      severity: "success",
      summary: "Confirmed",
      detail: "Delete Item Success",
      life: 3000,
      style: { width: "90%" },
    });
    deleteItems(itemssid);
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

  const confirm2 = (itemssid) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => accept(itemssid),
      reject,
    });
  };
  const moment = require("moment");
  return (
    <>
      <Toast ref={toast} position="top-left" />
      <ConfirmDialog />
      <div className="flex flex-col items-center ">
        <div className="flex flex-col mt-3">
          <div className="flex bg-gray-200 gap-3 rounded-3xl h-12 w-screen shadow">
            <Link to="/" className="flex text-purple-600">
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
              <h1 className=" text-2xl text-purple-600 italic ">Items</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="relative rounded-xl overflow-auto mt-2">
        <div className="shadow-sm overflow-hidden my-8">
          <table className="border-collapse table-auto w-full text-sm">
            <thead>
              <tr>
                <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">
                  Merk
                </th>
                <th className="border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">
                  Harga
                </th>
                <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                  Tanggal
                </th>
                <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {Items.map((itemss, urutanKe) => (
                <tr key={urutanKe}>
                  <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                    {itemss.merk}
                  </td>
                  <td className="border-b border-slate-100 p-4 text-slate-500">
                    {convertRupiah.convert(itemss.harga)}
                  </td>
                  <td className="border-b border-slate-100 p-4 pr-8 text-slate-500">
                    {moment(itemss.tgl).format("YYYY-MM-DD")}
                  </td>
                  <td className="p-4 pr-8 flex gap-1">
                    <Link className="no-underline" to={`/edit/${itemss._id}`}>
                      <Button
                        style={{ width: "25px", height: "25px" }}
                        icon="pi pi-file-edit"
                        className="p-button-info"
                      ></Button>
                    </Link>

                    <Button
                      onClick={() => {
                        confirm2(itemss._id);
                      }}
                      icon="pi pi-trash"
                      className="p-button-danger"
                      style={{ width: "25px", height: "25px" }}
                    ></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex fixed bottom-4 right-3 z-50">
        <Link className="no-underline" to="/additem">
          <Button
            icon="pi pi-plus"
            style={{
              width: "70px",
              height: "70px",
              backgroundColor: "blue",
              borderRadius: "100%",
              color: "white",
              border: "none",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                
            }}
          />
        </Link>
      </div>
    </>
  );
}

export default Itemlist;
