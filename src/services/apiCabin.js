import supabase, { supabaseUrl } from "./supabase";
import { v4 as uuidv4 } from "uuid"; // `npm install uuid`

export async function getCabinData() {
  const { data, error } = await supabase.from("cabine").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabin data could not be loaded");
  } else {
    return data;
  }
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from("cabine")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

export async function createCabin(newCabin) {
  // create cabin
  const cabinName = newCabin.image[0].name;
  const cabinFullName = `${uuidv4()}-${cabinName}`.replaceAll("/", ""); // to create name unique
  const imageURL = `${supabaseUrl}/storage/v1/object/public/cabin-images/${cabinFullName}`; // create url of image
  console.log(imageURL);
  const { data, error } = await supabase
    .from("cabine")
    .insert({ ...newCabin, image: imageURL }) // inserting image key and its value
    .select();

  if (error) {
    throw new Error("Cabin could not be created");
  }

  // Upload image
  const { error: storageErr } = await supabase.storage
    .from("cabin-images") // name of the bucket in supabase
    .upload(cabinFullName, newCabin.image[0]);


  // if any error remove the entry
  if (storageErr) {
    const { error: deleteError } = await supabase
      .from("cabine")
      .delete()
      .eq("id", data[0].id); // Use data[0].id since .select() returns array

    if (deleteError) {
      console.error(
        "Failed to delete cabin after image upload failure:",
        deleteError
      );
      throw new Error(
        `Image upload failed and cabin could not be cleaned up: ${storageErr.message}`
      );
    }

    throw new Error(`Image upload failed: ${storageErr.message}`);
  }

}
