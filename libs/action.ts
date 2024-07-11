"use server";

import { z } from "zod";
import { prisma } from "@/libs/prisma";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getImagesById } from "./data";

const UploadSchema = z.object({
  title: z.string().min(1),
  images: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" })
    .refine((file) => file.size == 0 || file.type.startsWith("image/"), {
      message: "only images",
    })
    .refine((File) => File.size < 4000000, {
      message: "Gambar anda lebih dari 4MB",
    }),
});

const EditSchema = z.object({
  title: z.string().min(1),
  images: z
    .instanceof(File)
    .refine((file) => file.size == 0 || file.type.startsWith("image/"), {
      message: "only images",
    })
    .refine((File) => File.size < 4000000, {
      message: "Gambar anda lebih dari 4MB",
    })
    .optional(),
});


export const UpluadImage = async (prevState: unknown, FormData: FormData) => {
  const validatedFileds = UploadSchema.safeParse(
    Object.fromEntries(FormData.entries())
  );
  if (!validatedFileds.success) {
    return {
      error: validatedFileds.error.flatten().fieldErrors,
    };
  }
  const { title, images } = validatedFileds.data;
  const { url } = await put(images.name, images, {
    access: "public",
    multipart: true,
  });
  try {
    await prisma.upload.create({
      data: {
        title,
        images: url,
      },
    });
  } catch (error) {
    return { messege: "Faild data" };
  }
  revalidatePath("/");
  redirect("/");
};

export const deleteImage = async (id: string) => {
  const data = await getImagesById(id);
  if (!data) return { message: "No data Found" };

  await del(data.images);
  try {
    await prisma.upload.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Faild to delete data" };
  }

  revalidatePath("/");
};

// Upadte Image
export const updateImage = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = EditSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = await getImagesById(id);
  if (!data) return { message: "No Data Found" };

  const { title, images } = validatedFields.data;
  let imagePath;
  if (!images || images.size <= 0) {
    imagePath = data.images;
  } else {
    await del(data.images);
    const { url } = await put(images.name, images, {
      access: "public",
      multipart: true,
    });
    imagePath = url;
  }

  try {
    await prisma.upload.update({
      data: {
        title,
        images: imagePath,
      },
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to update data" };
  }

  revalidatePath("/");
  redirect("/");
};
