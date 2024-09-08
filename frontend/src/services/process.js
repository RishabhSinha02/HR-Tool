import axios from "axios";
import { PORT } from "../congif";
import axiosnew from "../axios";

export const fetchProcesses = async (jobId, user) => {
  if (!jobId) return;
  const url = `/process?jobId=${jobId}`;
  const response = await axiosnew.get(url, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response.data;
};

export const changeProcessStatus = async ({ processId, newStatus, user }) => {
  const response = await axiosnew.patch(
    `/process/${processId}/change-status`,
    {
      newStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return response.data;
};

export const changeProcessRound = async ({
  processId,
  roundDetails,
  roundNumber,
  user,
}) => {
  const response = await axiosnew.patch(
    `/process/${processId}/rounds`,
    {
      roundDetails,
      roundNumber,
    },
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return response.data;
};
