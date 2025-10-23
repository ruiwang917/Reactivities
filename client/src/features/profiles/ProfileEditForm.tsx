import { Box, Button } from "@mui/material";
import TextInput from "../../app/shared/components/TextInput";
import { editProfileSchema, EditProfileSchema } from "../../lib/schemas/editProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useProfile } from "../../lib/hooks/useProfile";
import { useParams } from "react-router";
import { useEffect } from "react";

type Props = {
    setEditMode: (editMode: boolean) => void;
};

export default function ProfileEditForm({ setEditMode }: Props) {
    const { id } = useParams();
    const { updateProfile, profile } = useProfile(id);
    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty, isValid },
    } = useForm<EditProfileSchema>({
        resolver: zodResolver(editProfileSchema),
        mode: "onTouched",
    });

    const onSubmit = async (data: EditProfileSchema) => {
        await updateProfile.mutateAsync(data);
        setEditMode(false);
        reset(data);
    };

    useEffect(() => {
        reset({
            displayName: profile?.displayName,
            bio: profile?.bio || "",
        });
    }, [profile, reset]);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            display="flex"
            flexDirection="column"
            alignContent="center"
            gap={3}
            mt={3}
        >
            <TextInput label="DisplayName" name="displayName" control={control}></TextInput>
            <TextInput label="Bio" name="bio" control={control} multiline rows={4}></TextInput>
            <Button type="submit" variant="contained" disabled={!isValid || !isDirty || updateProfile.isPending}>
                Update profile
            </Button>
        </Box>
    );
}
