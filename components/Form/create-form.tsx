"use client"
import React from "react";
import { UpluadImage } from "@/libs/action";
import { useFormState } from "react-dom";
import { SubmitButtom } from "../ui/Buttom/SubmitButtom";

const CreateFrorm = () => {
  const [state, formAction] = useFormState(UpluadImage, null)
  return (
    <form action={formAction}>
      <div className="mb-4 pt-2">
        <input
          type="text"
          name="title"
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
          placeholder="title"
        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.error?.title}</p>
        </div>
      </div>
      <div className="mb-4 pt-2">
        <input
          type="file"
          name="images"
          className="file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-200 hover:file:bg-gray-300 file:cursor-pointer border border-gray-400 w-full"
        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.error?.images}</p>
        </div>
      </div>
      <div className="mb-4 pt-4">
        <SubmitButtom Label="upload"/>
      </div>
    </form>
  );
};

export default CreateFrorm;
