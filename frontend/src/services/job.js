import axiosnew from "../axios";

export const createJobOpening = async ({ formData, user }) => {
  const response = await axiosnew.post(`/jobs`, formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response.data;
};

export const createJobDescription = async ({ formData, user }) => {
  const response = await axiosnew.post(`/jobs/generate-jd`, formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response.data;
};

export const fetchJobOpenings = async (user) => {
  console.log(user);
  const response = await axiosnew.get(`/jobs`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response.data;
};

export const generateEmail = async ({ formData, user }) => {
  const response = await axiosnew.post(`/jobs/generate-email`, formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response.data;
};

export const getJobQuestions = async ({ prompt, user }) => {
  const response = await axiosnew.post(`/jobs/generate-questions`, {prompt}, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response.data;
};
