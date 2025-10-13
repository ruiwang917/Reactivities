import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useAccount } from "./useAccount";

export const useActivities = (id?: string) => {
    const queryClient = useQueryClient();
    const { currentUser } = useAccount();
    const location = useLocation();

    // get activities list
    const { data: activities, isLoading } = useQuery({
        queryKey: ["activities"],
        queryFn: async () => {
            const response = await agent.get<Activity[]>("/activities");
            return response.data;
        },
        enabled: !id && location.pathname === "/activities" && !!currentUser,
        select: (data) => {
            return data.map((activitiy) => {
                return {
                    ...activitiy,
                    isHost: currentUser?.id === activitiy.hostId,
                    isGoing: activitiy.attendees.some((x) => x.id === currentUser?.id),
                };
            });
        },
    });

    // get activity details
    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ["activities", id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id && !!currentUser,
        select: (data) => {
            return {
                ...data,
                isHost: currentUser?.id === data.hostId,
                isGoing: data.attendees.some((x) => x.id === currentUser?.id),
            };
        },
    });

    // update activity
    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put<Activity>("/activities", activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["activities"] });
        },
    });

    // create activity
    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response = await agent.post<Activity>("/activities", activity);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["activities"] });
        },
    });

    // delete activity
    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/activities/${id}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["activities"] });
        },
    });

    // update attendance
    const updateAttendance = useMutation({
        mutationFn: async (id: string) => {
            await agent.post(`/activities/${id}/attend`);
        },
        onMutate: async (activityId: string) => {
            await queryClient.cancelQueries({ queryKey: ["activities", activityId] });

            const prevActivity = queryClient.getQueryData<Activity>(["activities", activityId]);

            queryClient.setQueryData<Activity>(["activities", activityId], (oldActivity) => {
                if (!oldActivity || !currentUser) return oldActivity;

                const isHost = currentUser.id === oldActivity.hostId;
                const isAttneding = oldActivity.attendees.some((x) => x.id === currentUser.id);

                return {
                    ...oldActivity,
                    isCancelled: isHost ? !oldActivity.isCancelled : oldActivity.isCancelled,
                    attendees: isAttneding
                        ? isHost
                            ? oldActivity.attendees
                            : oldActivity.attendees.filter((x) => x.id !== currentUser.id)
                        : [
                              ...oldActivity.attendees,
                              {
                                  id: currentUser.id,
                                  displayName: currentUser.displayName,
                                  imageUrl: currentUser.imageUrl || undefined,
                                  isHost: false,
                              },
                          ],
                };
            });
            return { prevActivity };
        },
        onError: (_error, activityId, context) => {
            if (context?.prevActivity) {
                queryClient.setQueryData<Activity>(["activities", activityId], context.prevActivity);
            }
        },
    });

    return {
        activities,
        isLoading,
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isLoadingActivity,
        updateAttendance,
    };
};
