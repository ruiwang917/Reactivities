import * as React from "react";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import { Avatar } from "@mui/material";
import ProfileCard from "../../../features/profiles/ProfileCard";
import { Link } from "react-router";

type Props = {
    profile: Profile;
};

export default function AvatarPopovers({ profile }: Props) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Avatar
                alt={profile.displayName}
                src={profile.imageUrl || "/assets/user.png"}
                sx={{ border: profile.following ? 3 : 0, borderColor: "secondary.main" }}
                component={Link}
                to={`/profile/${profile.id}`}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            />
            <Popover
                id="mouse-over-popover"
                sx={{ pointerEvents: "none" }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <ProfileCard profile={profile} />
            </Popover>
        </>
    );
}
