import { useMutation } from "@tanstack/react-query"
import { patchUser } from "../../apis/auth"
import { queryClient } from "../../App"
import { QUERY_KEY } from "../../constants/key"

export const usePatchUsers = () => {
  return useMutation({
    mutationFn: patchUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
    }
  });
}