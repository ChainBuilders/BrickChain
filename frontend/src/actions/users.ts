"use server";

import { createSupabaseClient, protectRoute } from "../auth/server";
import { getErrorMessage } from "@/libs/utils";

export const createAccountAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const userType = formData.get("userType") as "investor" | "realtor" | null;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    if (!userType) {
      throw new Error("User type is required");
    }

    const { auth } = createSupabaseClient();

    // Add slight delay to prevent rapid successive requests
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { data, error } = await auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        data: {
          signup_method: "email",
          user_type: userType, // Store user type in metadata
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

    return { 
      errorMessage: null, 
      userId: data.user?.id,
      email: data.user?.email,
      session: data.session,
      userType // Return the user type
    };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const loginAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const { auth } = createSupabaseClient();

    const { data, error } = await auth.signInWithPassword({
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

    // Get user type from metadata
    const userType = data.user?.user_metadata?.user_type as "investor" | "realtor" | undefined;

    return { 
      errorMessage: null,
      userType: userType || null 
    };
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