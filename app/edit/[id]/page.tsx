import EditFrorm from "@/components/Form/edit-form";
import { getImagesById } from "@/libs/data";
import { notFound } from "next/navigation";
import React from "react";

const EditPage = async ({params}:{params:{id:string}}) => {
  const data = await getImagesById(params.id);
  if(!data) return notFound
  return (
    <div className="min-h-screen flex  items-center justify-center bg-slate-100">
      <div className="bg-white rounded-sm shadow p-8">
        <h1 className="text-xl font-bold mb-5">Upload Images</h1>
        <EditFrorm data={data}/>
      </div>
    </div>
  );
};

export default EditPage;
