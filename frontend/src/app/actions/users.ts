
import { getErrorMessage } from "@/libs/utils";
import { createSupabaseClient } from "@/auth/server";
export const createAccountAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const  auth  = createSupabaseClient();

    // Create user account
    const { data, error } = await auth.auth.signUp({
      email,
      password,
      options: {
        // Skip email verification
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          signup_method: "email",
        }
      }
    });

    if (error) throw error;

    // Return both auth data and user ID
    return { 
      errorMessage: null, 
      userId: data.user?.id,
      email: data.user?.email 
    };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

