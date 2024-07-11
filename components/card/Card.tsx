import Image from "next/image";
import { DeleteButtom, EditButtom } from "../ui/Buttom/SubmitButtom";
import type {Upload} from "@prisma/client"

const card = ({data}: {data:Upload}) => {
  return (
    <div className="max-w-sm border border-gray-200 rounded-md shadow">
      <div className="relative aspect-video">
        <Image
          src={data.images}
          alt=""
          fill
          priority
          sizes="(max-width 768px) 100vw, (max-width: 120px) 10vw, 33vw"
          className="rounded-t object-cover"
        />
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-bold text-gray-900 truncate">{data.title}</h1>
      </div>
      <div className="flex items-center justify-between">
        <EditButtom id={data.id} />
        <DeleteButtom id={data.id} />
      </div>
    </div>
  );
};

export default card;
