import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdUploadFile } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { nanoid } from "@reduxjs/toolkit";

const CreateFlashCard = () => {
  const [selectFile, setSelectFile] = useState(null);
  const [selectTermImg, setSelectTermImg] = useState(null);
  const uniqueId = nanoid(4);
  const id = nanoid(2);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectFile(file);
  };
  const handleTermImageChange = (event) => {
    const file = event.target.files[0];
    setSelectTermImg(file);
  };

  return (
    <Formik 
    initialValues={{
      group_id : uniqueId,
      group_name :"",
      group_descreption:"",
      group_img : null,
      cards: [
        {
          card_id : id,
          card_name :"",
          card_description:"",
          card_img :null,
        },
      ] ,
    }}
    >
      <Form className="w-full space-y-5 text-slate-500 font-medium pb-5" >
        <div className=" px-10 py-4 bg-white drop-shadow-lg rounded-md">
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
                  onChange={() => {}}
                  name="group_name"
                  className="pl-8 pr-2 py-2 md:w-96 border-slate-300 border-2 rounded-lg focus:border-slate-400"
                />
                <ErrorMessage
                  component={"div"}
                  className="text-sm text-red-500"
                  name="group_name"
                />
              </div>

              <div className="flex flex-col relative">
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
                      className=" flex items-center px-5 py-2 ml-6"
                      width={"150px"}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col relative mt-5">
            <label
              htmlFor="add_description"
              className="block font-medium text-slate-500 mb-1 text-left"
            >
              Add Description
            </label>
            <Field
              type="textarea"
              id="add_description"
              className="w-full h-20 p-2 border-slate-300 border-2 rounded-lg focus:border-slate-400"
              onChange={() => {}}
              placeholder="Describe the role, responsibility skill required for the job and help candidate to understand the role better."
            />
          </div>
        </div>
        <div className=" px-10 py-4 bg-white drop-shadow-lg rounded-md">
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
                    type="text"
                    onChange={() => {}}
                    name="card_name"
                    className="pl-8 pr-2 py-2 md:w-96 border-slate-300 border-2 rounded-lg focus:border-slate-400"
                  />
                  <ErrorMessage
                    component={"div"}
                    className="text-sm text-red-500"
                    name="card_name"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col relative">
              <h2 className="text-left">
                Enter Defination{" "}
                <span className="relative left-0 top-1 pr-2 text-lg font-medium">
                  *
                </span>
              </h2>
              <div className="flex items-center">
                <div>
                  <Field
                    type="text"
                    onChange={() => {}}
                    name="card_name"
                    className="pl-8 pr-2 py-2 md:w-96 border-slate-300 border-2 rounded-lg focus:border-slate-400"
                  />
                  <ErrorMessage
                    component={"div"}
                    className="text-sm text-red-500"
                    name="card_name"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col relative">
              {selectTermImg === null ? (
                <>
                  <label
                    htmlFor="uploadImg"
                    className="flex items-center px-5 py-2 mt-6 bg-white border-2 border-slate-300 rounded-md active:border-blue-600 text-blue-700 font-semibold"
                  >
                    <MdUploadFile className="text-xl xl:text-2xl mr-2" /> Upload
                    Image
                  </label>
                  <input
                    type="file"
                    id="uploadImg"
                    className="hidden"
                    onChange={handleTermImageChange}
                  />
                </>
              ) : (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(selectTermImg)}
                    alt="Selected"
                    className=" flex items-center px-5 py-2 ml-6"
                    width={"150px"}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-5 items-center cursor-pointer hover:text-blue-600">
            <FiPlus className="text-xl" />
            <span> Add More</span>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <button
            title="create"
            type="submmit"
            className="border-2 cursor-pointer py-2 px-14 mt-4 bg-red-600 text-white rounded-md"

          >
            create
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateFlashCard;
