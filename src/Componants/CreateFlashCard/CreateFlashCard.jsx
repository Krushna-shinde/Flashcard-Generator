import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { MdUploadFile } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { nanoid } from "@reduxjs/toolkit";
import { Form_Validation } from "./FormValidation/Form_Validation";
import { useDispatch } from "react-redux";
import { addFlashCard } from "../../ReduxToolkit/Reducer/flashcardSlice";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateFlashCard = () => {
  const dispatch = useDispatch();
  const [selectFile, setSelectFile] = useState(null);
  const [selectTermImgs, setSelectTermImgs] = useState([]);
  const uniqueId = nanoid(4);
  const termInputRefs = useRef([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectFile(file);

    // Convert the image to Data URL and store it in localStorage
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("selectedImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleTermImageChange = (event, index) => {
    const file = event.target.files[0];

    // Create a copy of the array to avoid mutating the state directly
    const newSelectTermImgs = [...selectTermImgs];
    newSelectTermImgs[index] = file;

    setSelectTermImgs(newSelectTermImgs);

    // Convert the image to Data URL and store it in localStorage
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem(`selectedTermImage_${index}`, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const addNewFlashcard = (values, actions) => {
    // Retrieve images from localStorage before dispatching
    const groupImage = localStorage.getItem("selectedImage");
    

    // Add images to values before dispatching
    values.group_img = groupImage;
    values.cards.forEach((card, index) => {
      const termImage = localStorage.getItem(`selectedTermImage_${index}`);
      card.card_img = termImage;
    });

    dispatch(addFlashCard(values));
    actions.resetForm();
    setSelectFile(null);
    setSelectTermImgs([]); //reset the array for term imgs
    localStorage.removeItem("selectedImage");
    // Remove term images from localStorage
    values.cards.forEach((_, index) => {
      localStorage.removeItem(`selectedTermImage_${index}`);
    });
    // Notify with a successful message using react Toastify
    toast.success("Flashcard created Successfully....");
  };

  useEffect(() => {
    if (termInputRefs.current[0] && termInputRefs.current[0].focus) {
      termInputRefs.current[0].focus();
    }
  }, []);

  return (
    <Formik
      initialValues={{
        group_id: uniqueId,
        group_name: "",
        group_description: "",
        group_img: null,
        cards: [
          {
            card_id: nanoid(2),
            card_name: "",
            card_description: "",
            card_img: [],
          },
        ],
      }}
      validationSchema={Form_Validation}
      onSubmit={addNewFlashcard}
    >
      {({ isSubmitting, values }) => (
        <Form className="w-full space-y-5 text-slate-500 font-medium pb-5">
          <div className="px-10 py-4 bg-white drop-shadow-lg rounded-md">
            <div className="flex flex-col relative">
              <h2 className="text-left">
                Create Group{" "}
                <span className="relative left-0 top-1 pr-2 text-lg font-medium">
                  *
                </span>
              </h2>
              <div className="flex items-center flex-wrap ">
                <div>
                  <Field
                    type="text"
                    name="group_name"
                    className="pl-8 pr-2 mt-3 py-2 md:w-96 border-slate-300 border-2 rounded-lg focus:border-slate-400 w-full"
                  />
                  <ErrorMessage
                    component={"div"}
                    className="text-sm text-red-500"
                    name="group_name"
                  />
                </div>

                <div className="flex items-center relative mb-2">
                  {selectFile === null ? (
                    <>
                      <label
                        htmlFor="uploadImg"
                        className="lg:flex lg:items-center lg:w-[19rem] px-5 py-2 ml-6 bg-white border-2  border-slate-300 active:border-blue-600 text-blue-700 font-semibold rounded"
                      >
                        <MdUploadFile className="text-xl xl:text-2xl mr-2" />{" "}
                        Upload Image
                      </label>
                      <input
                        type="file"
                        id="uploadImg"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </>
                  ) : (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(selectFile)}
                        alt="Selected"
                        className="flex items-center px-5 py-2"
                        width={"150px"}
                      />
                    </div>
                  )}
                  <ErrorMessage
                    component={"div"}
                    className="text-sm text-red-500  "
                    name="group_image"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="add_description"
                className="block font-medium text-slate-500 mb-1 text-left"
              >
                Add Description
              </label>
              <Field
                type="textarea"
                id="add_description"
                name="group_description"
                className="w-full h-20 p-2 border-slate-300 border-2 rounded-lg focus:border-slate-400"
                placeholder="Describe the role, responsibility, skill required for the job and help the candidate to understand the role better."
              />
              <ErrorMessage
                component={"div"}
                className="text-sm text-red-500"
                name="group_description"
              />
            </div>
          </div>

          <FieldArray name="cards">
            {({ push, remove }) => (
              <div className=" px-10 py-4 bg-white drop-shadow-lg rounded-md ">
                {values.cards.map((card, index) => (
                  <div key={index} className=" ">
                    <div className="flex flex-col space-y-3 md:space-x-10 md:flex-row">
                      <div className="relative flex flex-col justify-center ">
                        <h2 className="text-left">
                          Enter Term{" "}
                          <span className="absolute  m-1 ml-2 ">
                            *
                          </span>
                        </h2>
                        <div className="flex items-center ">
                          <div>
                            <Field
                              id={`termInput-${index}`}
                              type="text"
                              name={`cards.${index}.card_name`}
                              className="border-slate-300 p-2 pl-2 pr-2 py-2 md:w-64 border-2 rounded-md  focus:border-slate-400 w-full "
                              innerRef={(el) =>
                                (termInputRefs.current[index] = el)
                              }
                            />
                            <ErrorMessage
                              component={"div"}
                              className="text-sm text-red-500"
                              name={`cards.${index}.card_name`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="relative flex flex-col justify-center">
                        <h2 className="text-left">
                          Enter Definition{" "}
                          <span className="absolute top-1 ml-2 ">
                            *
                          </span>
                        </h2>
                        <div className="flex items-center">
                          <div>
                            <Field
                              type="text"
                              name={`cards.${index}.card_description`}
                              className="border-slate-300 mb-3 p-2 pl-2 pr-2 py-2 md:w-64 border-2 rounded-md  focus:border-slate-400 w-full"
                            />
                            <ErrorMessage
                              component={"div"}
                              className="text-sm text-red-500"
                              name={`cards.${index}.card_description`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center relative">
                        {selectTermImgs[index] === undefined ? (
                          <>
                            <label
                              htmlFor={`uploadImg-${index}`}
                              className=" lg:flex lg:items-center lg:w-[19rem] px-5 py-2 ml-6 mb-1 bg-white border-2  border-slate-300 active:border-blue-600 text-blue-700 font-semibold rounded"
                            >
                              <MdUploadFile className="text-xl xl:text-2xl mr-2" />{" "}
                              Select Image
                            </label>
                            <input
                              type="file"
                              id={`uploadImg-${index}`}
                              className="hidden"
                              onChange={(event) =>
                                handleTermImageChange(event, index)
                              }
                            />
                          </>
                        ) : (
                          <div className="mt-4">
                            <img
                              src={URL.createObjectURL(selectTermImgs[index])}
                              alt="Selected"
                              className="flex items-center px-5 py-2 ml-6"
                              width={"150px"}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-around w-full md:flex-col md:space-y-4 md:mt-5">
                        <div className="flex items-center cursor-pointer mb-2 hover:text-blue-600">
                          {index >= 0 && (
                            <span
                              onClick={() => {
                                remove(index);
                              }}
                            >
                              <HiOutlineTrash className="text-3xl" />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center cursor-pointer mb-2 hover:text-blue-600">
                          {index >= 0 && (
                            <span
                              onClick={() => {
                                termInputRefs.current[index].focus();
                              }}
                            >
                              <HiOutlinePencilAlt className="text-3xl" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  className="flex items-center space-x-2 text-blue-600 font-medium text-sm bg-white w-full mb-5 px-5 py-2"
                  onClick={() => {
                    push({
                      card_id: nanoid(2),
                      card_name: "",
                      card_description: "",
                      card_img: "[]",
                    });
                  }}
                >
                  <FiPlus className="text-xl" />
                  <span>Add More</span>
                </div>
              </div>
            )}
          </FieldArray>

          <div className="flex justify-center w-full">
            <button
              disabled={isSubmitting}
              title="create"
              type="submit"
              className="py-2 px-14 mb-10  bg-red-600 text-white rounded-md"
            >
              create
            </button>
          </div>
          <ToastContainer />
        </Form>
      )}
    </Formik>
  );
};

export default CreateFlashCard;