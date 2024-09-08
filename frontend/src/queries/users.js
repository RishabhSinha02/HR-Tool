import { useQuery } from "react-query";
import { useAuth } from "../auth/authContext";
import { fetchUsers } from "../services/users";

export const useFetchUsers = () => {
  const { user } = useAuth();
  return useQuery("users", () => fetchUsers(user).then((res) => res.users), {
    staleTime: 50000,
  });
};
