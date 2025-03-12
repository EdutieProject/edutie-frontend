import {Backdrop, Box, Button, CircularProgress, Fade, Modal, TextField, Typography, useTheme} from "@mui/material";
import NavLayout from "src/views/common/NavLayout";
import React, {useState} from "react";
import {navigationPath, navSections} from "src/features/navigation/navigationPath";

import {RadioRounded} from "@mui/icons-material";
import {useNavigate} from "react-router";
import {createLearningSubject} from "src/services/management/learningSubjectService";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: "20rem", md: "24rem"},
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    alignItems: "flex-start"
};

export default function CreateView() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [createLearningSubjectModalOpen, setCreateLearningSubjectModalOpen] = useState(false);
    const handleClose = () => setCreateLearningSubjectModalOpen(false);
    const handleOpen = () => setCreateLearningSubjectModalOpen(true);

    return (
        <NavLayout activeSectionIdOverride={navSections.home} variant={"home"}>
            <Box sx={{my: 8, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4}}>
                <Box sx={{
                    p: 4,
                    display: "flex",
                    borderRadius: 1,
                    border: "1px solid lightgray",
                    gap: 2,
                    width: {xs: "100%", sm: "18rem"},
                    cursor: "pointer",
                    transition: "200ms ease",
                    "&:hover": {
                        boxShadow: theme.shadows[2]
                    }
                }} onClick={handleOpen}>
                    <RadioRounded/>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <Typography variant={"h6"}>Learning Subject</Typography>
                        <Typography variant={"subtitle1"} color={"textSecondary"}>Create a learning subject with
                            requirements you can learn from.</Typography>
                    </Box>
                </Box>
            </Box>
            <Typography>Or let's see what you've created:</Typography>
            <Box sx={{my: 8, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4}}>
                <Box sx={{
                    display: "flex",
                    gap: 2,
                    width: "18rem"
                }}>
                    <RadioRounded/>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <Typography variant={"h6"}>Blue banana</Typography>
                        <Typography variant={"subtitle1"} color={"textSecondary"}>Learning Subject</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    gap: 2,
                    width: "18rem"
                }}>
                    <RadioRounded/>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <Typography variant={"h6"}>An amazing story</Typography>
                        <Typography variant={"subtitle1"} color={"textSecondary"}>Story in mathematics</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    gap: 2,
                    width: "18rem"
                }}>
                    <RadioRounded/>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <Typography variant={"h6"}>An amazing story</Typography>
                        <Typography variant={"subtitle1"} color={"textSecondary"}>Story in mathematics</Typography>
                    </Box>
                </Box>
            </Box>
            <Typography>See more</Typography>
            <CreateLearningSubjectModal isOpen={createLearningSubjectModalOpen} handleClose={handleClose}/>
        </NavLayout>
    );
}


function CreateLearningSubjectModal(params: UniversalModalParams) {
    const [learningSubjectCreationLoading, setLearningSubjectCreationLoading] = useState(false);
    const [inputSubjectName, setInputSubjectName] = useState("");
    const navigate = useNavigate();

    async function handleCreateLearningSubject(name: string) {
        setLearningSubjectCreationLoading(true);
        if (name.length < 3) {
            setLearningSubjectCreationLoading(false);
            return
        }
        const response = await createLearningSubject(name);
        navigate(navigationPath.fillPath(navigationPath.learningSubjectEditor, response.data.id));
    }

    if (learningSubjectCreationLoading) {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={params.isOpen}
                onClose={params.handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={params.isOpen}>
                    <Box sx={modalStyle}>
                        <Box sx={{flexGrow: 1, width: "100%", display: "grid", placeItems: "center"}}>
                            <CircularProgress/>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        );
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={params.isOpen}
            onClose={params.handleClose}
            closeAfterTransition
            slots={{backdrop: Backdrop}}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={params.isOpen}>
                <Box sx={modalStyle}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Let's set up your learning subject
                    </Typography>
                    <TextField id="outlined-basic" label="Learning Subject name" variant="outlined"
                               onChange={(e) => setInputSubjectName(e.target.value)}/>
                    <Button variant={"contained"}
                            onClick={() => handleCreateLearningSubject(inputSubjectName)}>Create</Button>
                </Box>
            </Fade>
        </Modal>
    )
}