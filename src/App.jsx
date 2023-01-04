import React from "react";
import Content from "./Components/Home/Content";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Orders from "./Components/Orders/Orders";
import Home from "./Components/Home/Home";
import History from "./Components/Other/History";
import Print from "./Components/Other/Print";
import Itemlist from "./Components/Items/Itemlist";
import Additem from "./Components/Items/Additem";
import Addorders from "./Components/Orders/Addorders";
import Edititem from "./Components/Items/Edititem";


const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/orders",
    element:<Orders/>
  },
  {
    path:"/content",
    element:<Content/>
  },
  {
    path:"/history",
    element:<History/>
  },
  {
    path:"/print",
    element:<Print/>
  },
  {
    path:"/itemlist",
    element:<Itemlist/>
  },
  {
    path:"/additem",
    element:<Additem/>
  },
  {
    path:"/addorder",
    element:<Addorders/>
  },
  {
    path:"/edit/:id",
    element: <Edititem/>
  }
])


function App() {
  return (
    <div className="flex flex-col bg-gray-100 h-screen">
      <RouterProvider router={router}/>
    </div>
  );
}
export default App;




