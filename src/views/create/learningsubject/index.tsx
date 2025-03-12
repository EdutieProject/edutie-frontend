import {
    Autocomplete,
    Backdrop,
    Box,
    Container,
    Fade,
    Modal,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import NavLayout from "src/views/common/NavLayout";
import React from "react";
import {navSections} from "src/features/navigation/navigationPath";

import {Add, InfoOutlined, RadioRounded} from "@mui/icons-material";
import {Link} from "react-router";

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

    const [requirementModalOpen, setRequirementModalOpen] = React.useState(false);
    const handleRequirementModalOpen = () => setRequirementModalOpen(true);
    const handleRequirementModalClose = () => setRequirementModalOpen(false);

    const [knowledgeSourceModalOpen, setKnowledgeSourceModalOpen] = React.useState(false);
    const handleKnowledgeSourceModalOpen = () => setKnowledgeSourceModalOpen(true);
    const handleKnowledgeSourceModalClose = () => setKnowledgeSourceModalOpen(false);

    return (
        <NavLayout activeSectionIdOverride={navSections.home} variant={"view"}>
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
                            }} onClick={handleKnowledgeSourceModalOpen}>
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
                            <Link onClick={handleRequirementModalOpen} to={"#"}>
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
                open={requirementModalOpen}
                onClose={handleRequirementModalClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={requirementModalOpen}>
                    <Box sx={modalStyle}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Add Requirement
                        </Typography>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    </Box>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={knowledgeSourceModalOpen}
                onClose={handleKnowledgeSourceModalClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={knowledgeSourceModalOpen}>
                    <Box sx={modalStyle}>
                        <Typography id="transition-modal-title" variant="h6" component="h2" sx={{mb: 2}}>
                            Add Knowledge sources
                        </Typography>
                        <Autocomplete
                            disablePortal
                            options={[
                                {label: 'The Shawshank Redemption', year: 1994},
                                {label: 'The Godfather', year: 1972},
                                {label: 'The Godfather: Part II', year: 1974},
                                {label: 'The Dark Knight', year: 2008},
                                {label: '12 Angry Men', year: 1957},
                            ]}
                            sx={{width: {xs: "100%", md: "80%"}}}
                            renderInput={(params) => <TextField {...params} label="Add knowledge subject"/>}
                        />
                    </Box>
                </Fade>
            </Modal>
        </NavLayout>
    );
}
