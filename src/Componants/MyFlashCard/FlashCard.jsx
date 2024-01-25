import React, { useState } from "react";
import DefaultImg from "../../assets/DefaultImg.jpg";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-daisyui";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TrashIcon } from "@heroicons/react/outline";
import {
  deleteFlashCard,
  updateState,
} from "../../ReduxToolkit/Reducer/flashcardSlice";

export const FlashCard = ({ card, flashcards }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDelete, setshowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // This function will delete selected group of card which user want to delete.
  const deleteCard = (group_id, group_name) => {
    setshowDelete(true);
    setDeleteId({ group_id: group_id, group_name: group_name });
  };

  //this funtion will close the delete modal.
  const closeDelete = () => {
    setshowDelete(false);
  };

  const notify = () => {
    toast("Deleted Successfully....");
  };

  //this function will handle the deleteFlashcard funtion from reducer.
  const handleDelete = () => {
    dispatch(deleteFlashCard(deleteId));
    dispatch(updateState());
    closeDelete();
    notify();
  };

  if (!card || typeof card !== "object" || !card.group_id) {
    return null;
  }

  return (
    <div
      key={card.group_id}
      className="p-4 m-6 mx-auto flex flex-col space-y-3 items-center justify-center bg-white rounded-md  text-black w-[20rem] h-[14rem] relative border-2 border-slate-200"
    >
      <div className="absolute rounded-full  -top-8  ">
        {/* displaying group img */}
        {typeof card.group_img !== "undefined" && card.group_img !== null ? (
          <img
            style={{ border: "1px solid red" }}
            className="rounded-full   w-16 h-16"
            src={card.group_img}
            alt={card.group_name}
          />
        ) : (
          <img
            className="rounded-full w-16 h-16"
            src={DefaultImg}
            alt={card.group_name}
          />
        )}
      </div>
      <div className="text-center">
        <div>
          <h2 className="font-bold text-lg m-3">{card.group_name}</h2>
        </div>
        <div className="mb-3">
          <p className="text-center font-medium text-sm text-slate-600 line-clamp-2">
            {card.group_description}
          </p>
        </div>
        <p className="font-medium text-sm text-slate-700">
          {card.cards ? card.cards.length : 0} Cards
        </p>
      </div>
      <div>
        <button
          title="View Cards"
          // on clicking this button it will navigate to FlashCardDetails component.
          onClick={() => navigate(`/flashcard-details/${card.group_id}`)}
          className="py-1 px-16 text-red-600 font-bold rounded-sm border-red-600 ring-2 ring-red-600"
        >
          View Cards
        </button>
        <button
          title="Delete Flashcard"
          // on clicking this button it will open delete modal.
          className="absolute right-[3.5rem] p-1 transition ease-in-out delay-60 duration-300  hover:-translate-y-1 hover:scale-40"
          onClick={() => deleteCard(card.group_id, card.group_name)}
        >
          <TrashIcon className="h-6 text-red-500" />
        </button>
      </div>
      {/* delete Modal */}
      <Modal open={showDelete}>
        <Button
          size="sm"
          shape="circle"
          className="absolute right-2 top-2 bg-white border-none "
          onClick={closeDelete}
          title="Cancel"
        >
          ❌
        </Button>
        <Modal.Body>
          <div class="p-2 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <h3 class="mb-5 text-lg font-semibold text-gray-600 dark:text-gray-600">
              Are you sure you want to delete these flashcards?
            </h3>
            <button
              onClick={handleDelete}
              type="button"
              title="Yes, I'm sure"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={closeDelete}
              type="button"
              title="No, Cancel"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  );
};
