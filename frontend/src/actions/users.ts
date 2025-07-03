"use server";

import { createSupabaseClient, protectRoute } from "../auth/server";
import { getErrorMessage } from "@/libs/utils";

export const createAccountAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const { auth } = createSupabaseClient();

    // Add slight delay to prevent rapid successive requests
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { data, error } = await auth.signUp({
      email,
      password,
      options: {
        // This should match your Supabase config
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        // Attempt to skip confirmation (must be enabled in Supabase settings)
        data: {
          signup_method: "email",
          registered_at: new Date().toISOString()
        }
      }
    });

    if (error) {
      if (error.status === 429) {
        throw new Error("Too many attempts. Please wait before trying again.");
      }
      throw error;
    }

    // Return all relevant data
    return { 
      errorMessage: null, 
      userId: data.user?.id,
      email: data.user?.email,
      session: data.session 
    };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};


// In your login action
export const loginAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const { auth } = createSupabaseClient();

    // First check if user exists (alternative method)
    const { data: { users }, error: userError } = await auth.admin.listUsers();
    if (userError) throw userError;
    
    const userExists = users.some(u => u.email === email);
    if (!userExists) {
      throw new Error("No account found with this email");
    }

    // Then attempt login
    const { error } = await auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Email not confirmed")) {
        throw new Error("Please verify your email first");
      }
      if (error.message.includes("Invalid login credentials")) {
        throw new Error("Incorrect email or password");
      }
      throw error;
    }

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};


export const signOutAction = async () => {
  try {
    await protectRoute();

    const { auth } = createSupabaseClient();

    const { error } = await auth.signOut();

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};