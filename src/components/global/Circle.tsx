import {Avatar, useTheme} from "@mui/material";
import React from "react";

interface CircleProps {
    backgroundColor: string;
    size: number;
    onClick?: () => void;
    children: React.ReactNode;
}

export default function Circle(props: CircleProps) {
    const theme = useTheme();
    return (
        <Avatar
            sx={{
                backgroundColor: props.backgroundColor,
                width: props.size,
                height: props.size,
                boxShadow: theme.shadows[4],
                cursor: "pointer",
            }}
            onClick={props.onClick}
        >
            {props.children}
        </Avatar>
    );
}
