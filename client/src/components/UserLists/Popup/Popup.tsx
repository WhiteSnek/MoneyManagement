import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import AddUrl from "./AddUrl/AddUrl";
import AddManuallyButton from "./AddManual/AddManuallyButton";
import AddManualForm from "./AddManual/AddManualForm";
import { Products } from "../List/List";
import AddServiceNo from "./AddUrl/AddServiceNo";
export interface ProductDetails {
  name: string;
  specifications: string;
  image: string | ArrayBuffer | null | File;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface PopupProps {
  togglePopup: () => void;
  month: string;
  setProducts: React.Dispatch<React.SetStateAction<Products[]>>;
  products: Products[];
}

const Popup: React.FC<PopupProps> = ({
  togglePopup,
  month,
  setProducts,
  products,
}) => {
  const [manual, setManual] = useState<boolean>(false);
  const [service, setService] = useState<boolean>(false);
  const [details, setDetails] = useState<ProductDetails>({
    name: "",
    specifications: "",
    image: null,
    imageUrl: "",
    price: 0,
    quantity: 1,
  });

  const toggleManual = () => {
    setManual(!manual);
  };

  const toggleService = () => {
    setService(!service);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-800 text-zinc-100 rounded-lg p-6 sm:p-8 shadow-3xl max-w-xs sm:max-w-3xl w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-lg sm:text-2xl font-bold mb-4">
            Add an {service ? "Service" :"Item"} for {month}
          </h2>
          <button
            onClick={togglePopup}
            className="text-white flex justify-center items-center p-1 hover:bg-zinc-900 rounded-full"
          >
            <Close sx={{ fontSize: window.innerWidth > 768 ? 30 : 20 }} />
          </button>
        </div>

        {!manual ? 
          service ? <AddServiceNo /> : <AddUrl />
        : (
          <AddManualForm
            details={details}
            setDetails={setDetails}
            products={products}
            service={service}
            setProducts={setProducts}
            togglePopup={togglePopup}
          />
        )}
        <AddManuallyButton toggleManual={toggleManual} manual={manual} service={service} toggleService={toggleService} />
      </div>
    </div>
  );
};

export default Popup;
