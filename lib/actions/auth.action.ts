"use server";
import { auth, db } from "@/firebase-config/admin";
import { cookies } from "next/headers";

export const signUp = async (params: SignUpParams) => {
  try {
    const { uid, name, email, password } = params;

    const user = await db.collection("users").doc(uid).get();

    if (user.exists) {
      return {
        success: false,
        message: "account already exist with this email, please signin",
      };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "account created successfully, please signin",
    };
  } catch (error: any) {
    console.log(`error creating an account`, error);

    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "account already exist with this email, please signin",
      };
    }

    return {
      success: false,
      message: "failed to create an account",
    };
  }
};

export const signIn = async (params: SignInParams) => {
  console.log("CAME IN SIGNIN")
  try {
    const { idToken, email } = params;

    const user = await auth.getUserByEmail(email);

    if (!user) {
      return {
        success: false,
        message: "no account exists with this email, please signup",
      };
    }

    await setSessionCookie(idToken);
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "failed to signin",
    };
  }
};

export const setSessionCookie = async (idToken: string) => {
  const cookieStore = await cookies();

  const ONE_WEEK_EXPIRY = 7 * 24 * 60 * 60 * 1000;

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK_EXPIRY,
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK_EXPIRY,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
};

export const getCurrentUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decoded = await auth.verifySessionCookie(sessionCookie, true);

    const user = await db.collection("users").doc(decoded.uid).get();

    if (!user.exists) {
      return null;
    }

    return {
      ...user.data(),
      id: user.id,
    } as User;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const isAuthenticated = async () => {
  try {
    const user = await getCurrentUser();
    return !!user;
  } catch (error) {
    console.log(error);
  }
};
