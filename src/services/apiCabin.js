
import supabase from "./supabase";

export async function getCabinData() {
  const { data, error } = await supabase.from("cabine").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabin data could not be loaded");
    }else{
        return data;
    }
}
