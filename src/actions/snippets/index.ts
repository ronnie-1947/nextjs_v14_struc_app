"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editSnippit(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  revalidatePath('/');
  redirect('/');
}

export async function createSnippet(
  code: string,
  formState: { message: string },
  formData: FormData
) {
  try {
    // Check the user's input and make sure they are valid
    const title = formData.get("title") as string;

    if (typeof title !== "string" || title.length < 3)
      return { message: "Title must be longer" };
    if (typeof code !== "string" || code.length < 30)
      return { message: "Code must be longer" };

    // Create a new record in the database
    await db.snippet.create({ data: { code, title } });

    // Redirect the user back to the root route
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: "Something went wrong",
      };
    }
  }
  revalidatePath("/");
  redirect("/");
}
