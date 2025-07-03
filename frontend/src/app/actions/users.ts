import { getErrorMessage } from "@/libs/utils";
import { createSupabaseClient } from "@/auth/server";

export const createAccountAction = async (credentials: {
  email: string;
  password: string;
  userType: string;
}) => {
  try {
    const { auth } = createSupabaseClient();

    // Create user account with user type in metadata
    const { data, error } = await auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          signup_method: "email",
          user_type: credentials.userType // Add user type to metadata
        }
      }
    });

    if (error) throw error;

    return { 
      errorMessage: null, 
      userId: data.user?.id,
      email: data.user?.email 
    };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};