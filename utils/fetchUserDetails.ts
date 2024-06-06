import { clerkClient } from "@clerk/nextjs/server";

export const fetchUserDetails = async (userId: string) => {
  try {
    const user = await clerkClient.users.getUser(userId);
    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses[0]?.emailAddress || "",
    };
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    return null;
  }
};
