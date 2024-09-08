import axiosnew from "../axios";

export const fetchUsers = async (user) => {
  const url = `/user/all`;
  const response = await axiosnew.get(url, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response.data;
};
