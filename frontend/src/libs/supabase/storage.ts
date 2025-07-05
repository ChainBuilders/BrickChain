import { createSupabaseClient } from "@/auth/client";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";

type UploadResponse = {
  url: string;
  path: string;
  error?: string;
};

export const uploadRealtorDocument = async (
  file: File,
  documentType: "government-id" | "company-document"
): Promise<UploadResponse> => {
  const supabase = createSupabaseClient();
  
  // Generate unique filename
  const fileExtension = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  const filePath = `${documentType}/${fileName}`;

  // Compress if image (not PDF)
  let processedFile = file;
  if (file.type.startsWith('image/')) {
    try {
      processedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      });
    } catch (error) {
      console.error("Image compression failed, using original:", error);
    }
  }

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('realtor')
    .upload(filePath, processedFile);

  if (error) {
    console.error("Upload error:", error);
    return { url: "", path: "", error: error.message };
  }

  return {
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/realtor/${filePath}`,
    path: filePath
  };
};

export const deleteRealtorDocument = async (filePath: string): Promise<boolean> => {
  const supabase = createSupabaseClient();
  const { error } = await supabase.storage
    .from('realtor')
    .remove([filePath]);
  
  if (error) {
    console.error("Delete error:", error);
    return false;
  }
  return true;
};