"use client";
import { useFormStatus } from "react-dom";
import { clsx } from "clsx";
import Link from "next/link";
import { deleteImage } from "@/libs/action";

export const SubmitButtom = ({ Label }: { Label: string }) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={clsx(
        "bg-blue-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm hover:bg-blue-600",
        {
          "opacity-50 cursor-progress": pending,
        }
      )}
      type="submit"
      disabled={pending}
    >
      {Label === "upload" ? (
        <>{pending ? "uploading..." : "Upload"}</>
      ) : (
        <>{pending ? "updating..." : "Update"}</>
      )}
    </button>
  );
};

export const EditButtom = ({ id }: { id: string }) => {
  return (
    <Link
      href={`edit/${id}`}
      className="py-3 text-sm bg-gray-50 rounded-bl-md text-center w-full hover:bg-gray-100"
    >
      Edit
    </Link>
  );
};

export const DeleteButtom = ({ id }: { id: string }) => {
  const deleteImageWithid = deleteImage.bind(null, id);
  return (
    <form
      action={deleteImageWithid}
      className="py-3 text-sm bg-gray-50 rounded-br-md w-full hover:bg-gray-100 text-center"
    >
      <DeleteBtn />
    </form>
  );
};

const DeleteBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
    {pending ? "Deleting.." : "Delete"}
  </button>
  );
};
