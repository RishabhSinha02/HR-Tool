import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createJobDescription,
  createJobOpening,
  fetchJobOpenings,
  generateEmail,
  getJobQuestions,
} from "../services/job";
import { useAuth } from "../auth/authContext";

export const useFetchJobOpenings = () => {
  const { user } = useAuth();
  return useQuery(
    "jobs",
    () => fetchJobOpenings(user).then((res) => res.jobs),
    {
      staleTime: 10000,
    }
  );
};

export const useCreateJobMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(createJobOpening, {
    onSuccess: () => {
      queryClient.invalidateQueries("jobs");
    },
  });
};

export const useCreateJobDescriptionMutation = (setJD) => {
  const queryClient = useQueryClient();

  return useMutation(createJobDescription, {
    onSuccess: (data) => {
      setJD(data.jobDescription);
    },
  });
};

export const useGenerateEmail = ({
  setGeneratedEmail,
  setIsGeneratingEmail,
}) => {
  return useMutation(generateEmail, {
    onSuccess: (data) => {
      setGeneratedEmail(data?.email);
    },
    onSettled: () => {
      setIsGeneratingEmail(false);
    },
  });
};

export const useGenerateQuestions = ({
  setGeneratedQnA,
  setIsGeneratingQnA,
}) => {
  return useMutation(getJobQuestions, {
    onSuccess: (data) => {
      setGeneratedQnA(data?.questions);
    },
    onSettled: () => {
      setIsGeneratingQnA(false);
    },
  });
};
