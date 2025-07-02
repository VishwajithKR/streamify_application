import { useQuery } from "@tanstack/react-query"
import { getAuthUser } from "../lib/api"

const useAuthUser = ()=>{
    const authUser = useQuery({
        queryKey: ["authUser"],
        queryFn:getAuthUser,
        retry: false
    })
    console.log(authUser,"kk")
    return {
        authUser: authUser?.data?.user,
        isLoading: authUser?.isLoading,
    }
}

export default useAuthUser;