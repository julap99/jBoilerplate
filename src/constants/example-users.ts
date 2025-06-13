interface User {
  id: string;
  email: string;
  fullname: string;
  user_type: "superadmin" | "studio" | "photographer" | "affiliate";
  avatar: string;
}

export const exampleUsers: User[] = [
  {
    id: "superadmin",
    email: "superadmin@example.com",
    fullname: "Super Admin",
    user_type: "superadmin",
    avatar: "https://i.pravatar.cc/300?img=1",
  },
  {
    id: "studio",
    email: "studio@example.com",
    fullname: "Studio",
    user_type: "studio",
    avatar: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: "photographer",
    email: "photographer@example.com",
    fullname: "Photographer",
    user_type: "photographer",
    avatar: "https://i.pravatar.cc/300?img=4",
  },
  {
    id: "affiliate",
    email: "affiliate@example.com",
    fullname: "Affiliate",
    user_type: "affiliate",
    avatar: "https://i.pravatar.cc/300?img=3",
  },
];

// Helper function to get a user by role
export const getUserByRole = (role: User["user_type"]): User | undefined => {
  return exampleUsers.find((user: User) => user.user_type === role);
};

// Helper function to get mock credentials for a user
export const getMockCredentials = (user: User) => {
  return {
    email: user.email,
    password: "abc123", // Example password, in real app would be hashed
  };
};
