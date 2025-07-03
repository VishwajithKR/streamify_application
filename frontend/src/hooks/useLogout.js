import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";


const useLogout= ()=>{
    const queryClient = useQueryClient();
    const {mutate,isPending,error}= useMutation({
        mutationFn: logout,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
      });
      return {  mutate, isPending: isPending, error: error };
}

export default useLogout;