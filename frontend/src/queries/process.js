import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  changeProcessRound,
  changeProcessStatus,
  fetchProcesses,
} from "../services/process";
import { useAuth } from "../auth/authContext";

export const useFetchProcess = (jobId) => {
  const { user } = useAuth();

  return useQuery(
    "processes",
    () => fetchProcesses(jobId, user).then((res) => res.processes),
    {
      staleTime: 10000,
      enabled: !!jobId,
    }
  );
};

export const useChangeStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(changeProcessStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("processes");
    },
  });
};

export const useChangeRoundMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(changeProcessRound, {
    onSuccess: () => {
      queryClient.invalidateQueries("processes");
    },
  });
};
