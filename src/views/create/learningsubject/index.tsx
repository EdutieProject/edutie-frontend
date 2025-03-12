import {
    Backdrop,
    Box,
    Button,
    Container,
    Fade,
    Modal,
    Step,
    StepLabel,
    Stepper,
    Typography,
    useTheme
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import NavLayout from "src/views/common/NavLayout";
import React from "react";
import {navigationPath, navSections} from "src/features/navigation/navigationPath";

import {Add, ArrowBack, InfoOutlined, RadioRounded} from "@mui/icons-material";
import {Link} from "react-router";

import logo from "src/assets/svg/logo.svg";
import sleepyEmoji from "src/assets/svg/emoji/sleepy.svg";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function CreateLearningSubjectView() {
    const theme = useTheme();

    const [modalOpen, setModalOpen] = React.useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    return (
        <NavLayout activeSectionIdOverride={navSections.home}>
            <Box sx={{
                alignSelf: "stretch",
                padding: theme.spacing(1),
                display: "flex",
                gap: 2,
                justifyContent: "space-between",
                mb: 2,
                position: "relative"
            }}>
                <Box sx={{display: "grid", placeItems: "center"}}>
                    <Link to={navigationPath.create}>
                        <ArrowBack sx={{color: "black"}}/>
                    </Link>
                </Box>
                <Box sx={{display: "flex", gap: 2}}>
                    <Button color={"secondary"}>Sign in</Button>
                    <Button variant={"contained"} color={"secondary"}>Register</Button>
                </Box>
                <Box sx={{
                    position: "absolute",
                    width: "100%",
                    top: 0,
                    left: {xs: "-20%", md: 0},
                    display: "grid",
                    placeItems: "center",
                    zIndex: "-1"
                }}>
                    <img src={logo} alt={""} height={"45"}/>
                </Box>
            </Box>
            <Container sx={{mt: 2}}>
                <Typography variant={"h3"} sx={{mb: 4}}>
                    <RadioRounded sx={{mr: 2}}/>
                    Integration by parts
                </Typography>
                <Grid container spacing={6} sx={{marginTop: 2}}>
                    <Grid size={{xs: 12, md: 4}}>
                        <Typography>Knowledge sources:</Typography>

                        <Box sx={{display: "flex", flexDirection: "column", mt: 2, gap: 2}}>
                            <Box sx={{
                                p: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                borderRadius: 1,
                                border: "1px solid lightgray",
                                gap: 2
                            }}>
                                <RadioRounded/>
                                <Typography variant={"h6"}>Learning Subject</Typography>
                            </Box>
                        </Box>
                        <Box sx={{display: "flex", flexDirection: "column", mt: 2, gap: 2}}>
                            <Box sx={{
                                p: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                borderRadius: 1,
                                border: "1px solid lightgray",
                                gap: 2
                            }}>
                                <Add sx={{color: "gray"}}/>
                                <Typography variant={"h6"} color={"textSecondary"}>Add new</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{xs: 12, md: 4}} sx={{padding: {xs: 1, md: 3}}}>
                        <Stepper orientation={"vertical"}>
                            <Step key={"A"}>
                                <StepLabel>A</StepLabel>
                            </Step>
                            <Step key={"B"}>
                                <StepLabel>Handling cyclic cases</StepLabel>
                            </Step>
                            <Step key={"C"}>
                                <StepLabel>C</StepLabel>
                            </Step>
                        </Stepper>
                        <Box sx={{display: "flex", flexDirection: "column", mt: 2, gap: 1}}>
                            <Link onClick={handleOpen} to={"#"}>
                                Add new requirement
                            </Link>
                        </Box>
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        {1 != 1 ? (
                            <>
                                <Box sx={{my: 2}}>
                                    <Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 1}}>
                                        <Typography color={"textSecondary"} variant={"caption"}>
                                            <b>Title</b>
                                        </Typography>
                                        <InfoOutlined sx={{fontSize: 16}}/>
                                    </Box>
                                    <Typography variant={"h5"}>Handling cyclic cases</Typography>
                                </Box>
                                <Box sx={{my: 2}}>
                                    <Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 1}}>
                                        <Typography color={"textSecondary"} variant={"caption"}>
                                            <b>Student objective</b>
                                        </Typography>
                                        <InfoOutlined sx={{fontSize: 16}}/>
                                    </Box>
                                    <Typography variant={"body2"}>Some integrals (e.g., ∫excos⁡(x)dx\int e^x \cos(x)
                                        dx∫excos(x)dx) form cycles where repeating integration by parts returns to the
                                        original
                                        integral. Solve such cases algebraically.</Typography>
                                </Box>
                            </>
                        ) : (
                            <Box sx={{
                                my: 2,
                                py: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <img src={sleepyEmoji} alt={""} width={"100px"}/>
                                <Typography variant={"h5"}>Nothing to be seen here.</Typography>
                                <Typography>Add a requirement to edit it in this section.</Typography>
                            </Box>
                        )}

                    </Grid>
                </Grid>
            </Container>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalOpen}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={modalOpen}>
                    <Box sx={modalStyle}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="transition-modal-description" sx={{mt: 2}}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </NavLayout>
    );
}
