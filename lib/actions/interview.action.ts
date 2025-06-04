"use server";

import { db } from "@/firebase-config/admin";

export const getInterviewsByUserId = async (
  userId: string
): Promise<Interview[] | null> => {
  try {
    const interviews = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (error) {
    console.log(`failed to get interview, ${error}`);
    return null;
  }
};

export const getLatestInterviews = async (
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> => {
  try {
    const { userId, limit = 20 } = params;

    const interviews = await db
      .collection("interviews")
      .where("finalized", "==", true)
      .where("userId", "!=", userId)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();
      
    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (error) {
    console.log(`failed to get interview, ${error}`);
    return null;
  }
};
