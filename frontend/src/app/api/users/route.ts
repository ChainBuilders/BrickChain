import { createSupabaseClient } from "@/auth/server";
import { NextResponse } from "next/server";
import { getErrorMessage } from "@/libs/utils";



export async function POST(request: Request) {
  try {
    const supabase = createSupabaseClient();
    
    // Verify the user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { userData } = await request.json();
    
    // Validate required fields including userType
    if (!userData?.id || !userData?.email || !userData?.userType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate userType is either 'investor' or 'realtor'
    if (!['investor', 'realtor'].includes(userData.userType)) {
      return NextResponse.json(
        { error: "Invalid user type" },
        { status: 400 }
      );
    }

    // Additional validation for realtors
    if (userData.userType === 'realtor') {
      if (!userData.businessName || !userData.governmentIdUrl || !userData.companyDocumentUrl) {
        return NextResponse.json(
          { error: "Missing required fields for realtor" },
          { status: 400 }
        );
      }
    }

    // Ensure the authenticated user matches the user being created
    if (user.id !== userData.id) {
      return NextResponse.json(
        { error: "Unauthorized to create this user" },
        { status: 403 }
      );
    }
    
    // Insert into users table
    const { data, error } = await supabase
      .from("users")
      .insert({
        id: userData.id,
        email: userData.email,
        full_name: userData.fullName,
        user_type: userData.userType,
        nin: userData.nin,
        phone: userData.phone,
        business_name: userData.businessName,
        government_id_url: userData.governmentIdUrl,
        company_document_url: userData.companyDocumentUrl,
        is_verified: userData.userType === 'realtor' ? false : true, // Realtors need verification
        registered_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}