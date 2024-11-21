import React, { useState } from "react";
import { CircularLoader } from "../../../utils/Loaders";
import { Cancel, CheckCircle } from "@mui/icons-material";
import Button from "../../../utils/Button";
import { useList } from "../../../../providers/ListProvider";

interface ConfirmProps {
  listId: string;
  toggleConfirm: () => void;
}

const Confirm: React.FC<ConfirmProps> = ({ toggleConfirm, listId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { deleteList } = useList();
  const handleSubmit = async () => {
    setLoading(true);
    const response = await deleteList(listId);
    if (response === "") toggleConfirm();
    else {
      alert("Failed to delete list");
    }
    setLoading(false)
  };
  const handleCancel = () => {
    toggleConfirm();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-800 text-zinc-100 rounded-lg p-6 sm:p-8 shadow-3xl max-w-xs sm:max-w-xl w-full">
        {loading ? (
          <CircularLoader size={50} />
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              Are you sure you want to delete the list?
            </h2>
            <div className="grid grid-cols-2 gap-4 pt-10">
              <Button
                label="Yes"
                icon={CheckCircle}
                className="hover:-translate-y-1 bg-zinc-900 hover:bg-zinc-950 "
                onClickFunc={handleSubmit}
              />
              <Button
                label="No"
                icon={Cancel}
                className="hover:-translate-y-1 bg-zinc-900 hover:bg-zinc-950"
                onClickFunc={handleCancel}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Confirm;
