import React, { useState,useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { MdUploadFile } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { nanoid } from "@reduxjs/toolkit";
import { Form_Validation } from "./FormValidation/Form_Validation";
import { useDispatch } from "react-redux";
import { addFlashCard } from "../../ReduxToolkit/Reducer/flashcardSlice";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";

const CreateFlashCard = () => {
  const dispatch = useDispatch();
  const [selectFile, setSelectFile] = useState(null);
  const [selectTermImg, setSelectTermImg] = useState(null);
  const uniqueId = nanoid(4);
  const termInputRefs = useRef([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectFile(file);
  };

  const handleTermImageChange = (event) => {
    const file = event.target.files[0];
    setSelectTermImg(file);
  };

  const addNewFlashcard = (values, actions) => {
    dispatch(addFlashCard(values));
    actions.resetForm();
    setSelectFile(null);
    setSelectTermImg(null);
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
            card_img: null,
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
              <div className="flex items-center">
                <div>
                  <Field
                    type="text"
                    name="group_name"
                    className="pl-8 pr-2 py-2 md:w-96 border-slate-300 border-2 rounded-lg focus:border-slate-400"
                  />
                  <ErrorMessage
                    component={"div"}
                    className="text-sm text-red-500"
                    name="group_name"
                  />
                </div>

                <div className="flex flex-col relative ml-6">
                  {selectFile === null ? (
                    <>
                      <label
                        htmlFor="uploadImg"
                        className="flex items-center px-5 py-2 ml-6 bg-white border-2 border-slate-300 rounded-md active:border-blue-600 text-blue-700 font-semibold"
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
              <div className=" px-10 py-4 bg-white drop-shadow-lg rounded-md">
                {values.cards.map((card, index) => (
                  <div key={index} className=" ">
                    <div className="flex gap-5 items-center">
                      <div className="flex flex-col relative">
                        <h2 className="text-left">
                          Enter Term{" "}
                          <span className="relative left-0 top-1 pr-2 text-lg font-medium">
                            *
                          </span>
                        </h2>
                        <div className="flex items-center">
                          <div>
                            <Field
                              id={`termInput-${index}`}
                              type="text"
                              name={`cards.${index}.card_name`}
                              className="pl-8 pr-2 py-2 md:w-96 border-slate-300 border-2 rounded-lg focus:border-slate-400"
                              innerRef={(el) => (termInputRefs.current[index] = el)}
                            />
                            <ErrorMessage
                              component={"div"}
                              className="text-sm text-red-500"
                              name={`cards.${index}.card_name`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col relative">
                        <h2 className="text-left">
                          Enter Definition{" "}
                          <span className="relative left-0 top-1 pr-2 text-lg font-medium">
                            *
                          </span>
                        </h2>
                        <div className="flex items-center">
                          <div>
                            <Field
                              type="text"
                              name={`cards.${index}.card_description`}
                              className="pl-8 pr-2 py-2 md:w-96 border-slate-300 border-2 rounded-lg focus:border-slate-400"
                            />
                            <ErrorMessage
                              component={"div"}
                              className="text-sm text-red-500"
                              name={`cards.${index}.card_description`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col relative">
                        {selectTermImg === null ? (
                          <>
                            <label
                              htmlFor={`uploadImg-${index}`}
                              className="flex items-center px-5 py-2 mt-6 bg-white border-2 border-slate-300 rounded-md active:border-blue-600 text-blue-700 font-semibold"
                            >
                              <MdUploadFile className="text-xl xl:text-2xl mr-2" />{" "}
                              Select Image
                            </label>
                            <input
                              type="file"
                              id={`uploadImg-${index}`}
                              className="hidden"
                              onChange={handleTermImageChange}
                            />
                          </>
                        ) : (
                          <div className="mt-4">
                            <img
                              src={URL.createObjectURL(selectTermImg)}
                              alt="Selected"
                              className="flex items-center px-5 py-2 ml-6"
                              width={"150px"}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex-col items-center mt-4">
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
                  className="flex gap-2 mt-5 items-center cursor-pointer hover:text-blue-600"
                  onClick={() => {
                    push({
                      card_id: nanoid(2),
                      card_name: "",
                      card_description: "",
                      card_img: null,
                    });
                  }}
                >
                  <FiPlus className="text-xl" />
                  <span>
                   Add More</span>
                </div>
              </div>
            )}
          </FieldArray>

          <div className="flex justify-center w-full">
            <button
              disabled={isSubmitting}
              title="create"
              type="submit"
              className="border-2 cursor-pointer py-2 px-14 mt-4 bg-red-600 text-white rounded-md"
            >
              create
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateFlashCard;
