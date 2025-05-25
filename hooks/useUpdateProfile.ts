import { useMutation } from '@tanstack/react-query';
import { UserProfile, updateUserProfile } from '@/lib/services/profile';

export const useUpdateProfile = () => {
    return useMutation<number, Error, { params: UserProfile; accessToken: string }>({
        mutationFn: updateUserProfile,
    });
};

export default useUpdateProfile;
