import {
    Autocomplete,
    Backdrop,
    Box, Button,
    CircularProgress,
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
import React, {useEffect, useState} from "react";
import {navSections} from "src/features/navigation/navigationPath";

import {Add, DataArrayOutlined, InfoOutlined, RadioRounded} from "@mui/icons-material";
import {Link, useParams} from "react-router";

import sleepyEmoji from "src/assets/svg/emoji/sleepy.svg";
import {KnowledgeSubjectSearchView, LearningSubjectManagementView} from "src/services/management/types";
import {searchKnowledgeSubjects} from "src/services/management/knowledgeSubjectService";
import {
    addLearningSubjectRequirement,
    getLearningSubjectById,
    setKnowledgeSubject
} from "src/services/management/learningSubjectService";
import LoadingView from "src/views/common/LoadingView";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: "20rem", md: "24rem"},
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function LearningSubjectEditorView() {
    const theme = useTheme();
    const {learningSubjectId} = useParams<{ learningSubjectId: string }>();

    const [learningSubjectView, setLearningSubjectView] = useState<LearningSubjectManagementView>();
    const [selectedRequirementId, setSelectedRequirementId] = useState<string>();

    const [requirementModalOpen, setRequirementModalOpen] = React.useState(false);
    const handleRequirementModalOpen = () => setRequirementModalOpen(true);
    const handleRequirementModalClose = () => setRequirementModalOpen(false);

    const [knowledgeSourceModalOpen, setKnowledgeSourceModalOpen] = React.useState(false);
    const handleKnowledgeSourceModalOpen = () => setKnowledgeSourceModalOpen(true);
    const handleKnowledgeSourceModalClose = () => setKnowledgeSourceModalOpen(false);

    async function loadLearningSubject() {
        const response = await getLearningSubjectById(learningSubjectId as string);
        if (!response.success)
            return; //TODO error handling
        setLearningSubjectView(response.data);
    }

    useEffect(() => {
        loadLearningSubject().then();
    }, [learningSubjectView === undefined]);

    if (learningSubjectView === null || learningSubjectView === undefined) {
        return <LoadingView/>
    }

    async function handleLearningSubjectSetKnowledgeSubject(knowledgeSubjectId: string) {
        // @ts-ignore
        const response = await setKnowledgeSubject(learningSubjectView?.learningSubject.id, knowledgeSubjectId);
        if (!response.success)
            return; //TODO error handling
        setLearningSubjectView(undefined); //reset the view to re-load learning subject
        setKnowledgeSourceModalOpen(false);
    }

    async function handleAddLearningSubjectRequirement(title: string) {
        // @ts-ignore
        const response = await addLearningSubjectRequirement(learningSubjectView?.learningSubject.id, title, learningSubjectView?.learningSubject.requirements.length);
        if (!response.success)
            return; //TODO error handling
        setLearningSubjectView(undefined);
        setRequirementModalOpen(false);
    }

    console.log(learningSubjectView);

    return (
        <NavLayout activeSectionIdOverride={navSections.home} variant={"view"}>
            <Container sx={{mt: 2}}>
                <Typography variant={"h3"} sx={{mb: 4}}>
                    <RadioRounded sx={{mr: 2}}/>
                    {learningSubjectView.learningSubject.name}
                </Typography>
                <Grid container spacing={6} sx={{marginTop: 2}}>
                    <Grid size={{xs: 12, md: 4}}>
                        <Typography>Knowledge sources:</Typography>
                        {
                            learningSubjectView.learningSubject.knowledgeOriginEmpty ? (
                                <Box sx={{display: "flex", flexDirection: "column", mt: 2, gap: 2}}>
                                    <Box sx={{
                                        p: 4,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        borderRadius: 1,
                                        border: "1px solid lightgray",
                                        gap: 2,
                                        cursor: "pointer",
                                        transition: "200ms ease",
                                        "&:hover": {boxShadow: theme.shadows[2]}
                                    }} onClick={handleKnowledgeSourceModalOpen}>
                                        <Add sx={{color: "gray"}}/>
                                        <Typography variant={"h6"} color={"textSecondary"}>Add new</Typography>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{display: "flex", flexDirection: "column", mt: 2, gap: 2}}>
                                    <Box sx={{
                                        p: 4,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        borderRadius: 1,
                                        border: "1px solid lightgray",
                                        gap: 2,
                                    }}>
                                        <DataArrayOutlined/>
                                        <Typography
                                            variant={"h6"}>{learningSubjectView.knowledgeSubjectDetails.title}</Typography>
                                        <Typography variant={"subtitle1"}>Knowledge Subject</Typography>
                                    </Box>
                                </Box>
                            )
                        }
                    </Grid>
                    <Grid size={{xs: 12, md: 4}} sx={{padding: {xs: 1, md: 3}}}>
                        <Stepper orientation={"vertical"}>
                            {
                                learningSubjectView.learningSubject.requirements.map(o =>
                                    <Step key={o.id}><StepLabel>{o.title}</StepLabel></Step>
                                )
                            }
                        </Stepper>
                        <Box sx={{display: "flex", flexDirection: "column", mt: 2, gap: 1}}>
                            <Link onClick={handleRequirementModalOpen} to={"#"}>
                                Add new requirement
                            </Link>
                        </Box>
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        {learningSubjectView.learningSubject.requirements.length !== 0 && selectedRequirementId ? (
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
            <KnowledgeOriginModal isOpen={knowledgeSourceModalOpen} handleClose={handleKnowledgeSourceModalClose}
                                  setLearningSubjectKnowledgeSubjectId={handleLearningSubjectSetKnowledgeSubject}/>
            <AddRequirementModal isOpen={requirementModalOpen} handleClose={handleRequirementModalClose}
                                 addLearningSubjectRequirement={handleAddLearningSubjectRequirement}/>
        </NavLayout>
    );
}

interface KnowledgeOriginModalParams extends UniversalModalParams {
    setLearningSubjectKnowledgeSubjectId: (id: string) => Promise<void>;
}

function KnowledgeOriginModal(params: KnowledgeOriginModalParams) {
    const theme = useTheme();
    const [searchedKnowledgeSubjects, setSearchedKnowledgeSubjects] = useState<Array<KnowledgeSubjectSearchView>>([]);
    const [knowledgeSubjectSetLoading, setKnowledgeSubjectSetLoading] = useState(false);

    async function updateSearchResults(searchPhrase: string) {
        const apiResponse = await searchKnowledgeSubjects(searchPhrase);
        if (!apiResponse.success)
            return; //TODO handle failure
        setSearchedKnowledgeSubjects(apiResponse.data as Array<KnowledgeSubjectSearchView>);
    }

    function handleKnowledgeSubjectChoice(knowledgeSubjectId: string) {
        setKnowledgeSubjectSetLoading(true);
        params.setLearningSubjectKnowledgeSubjectId(knowledgeSubjectId)
            .then(o => {
                setKnowledgeSubjectSetLoading(false);
            });
    }

    if (knowledgeSubjectSetLoading) {
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
                        <Box sx={{width: "100%", display: "grid", placeItems: "center"}}>
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
                    <Typography id="transition-modal-title" variant="h6" component="h2" sx={{mb: 2}}>
                        Add Knowledge sources
                    </Typography>
                    <Autocomplete
                        options={searchedKnowledgeSubjects}
                        getOptionLabel={(option) => option.title}
                        sx={{width: {xs: "100%", md: "80%"}}}
                        renderInput={(params) =>
                            <TextField {...params}
                                       label="Add knowledge subject"
                                       onChange={(e) => updateSearchResults(e.target.value)}/>
                        }
                        renderOption={(props, option) => (
                            <Box
                                sx={{p: 1, "&:hover": {backgroundColor: theme.palette.grey[50]}}}
                                onClick={() => handleKnowledgeSubjectChoice(option.knowledgeSubjectReference.id)}
                            >
                                <Typography>{option.title}</Typography>
                                <Typography variant={"caption"}
                                            color={"textSecondary"}>{option.description}</Typography>
                            </Box>
                        )}
                    />
                </Box>
            </Fade>
        </Modal>
    );
}

interface AddRequirementModalParams extends UniversalModalParams {
    addLearningSubjectRequirement: (title: string) => Promise<void>;
}

function AddRequirementModal(params: AddRequirementModalParams) {
    const [loading, setLoading] = useState(false);
    const [inputRequirementName, setInputRequirementName] = useState("");

    function handleAddRequirement() {
        setLoading(true);
        params.addLearningSubjectRequirement(inputRequirementName).then(() => {
            setLoading(false);
        });
    }

    if (loading) {
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
                        <Box sx={{width: "100%", display: "grid", placeItems: "center"}}>
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
                <Box sx={{...modalStyle, display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Add Learning Subject Requirement
                    </Typography>
                    <TextField id="outlined-basic" label="Requirement Name" variant="outlined"
                               onChange={(e) => setInputRequirementName(e.target.value)}/>
                    <Button onClick={handleAddRequirement}>Add requirement</Button>
                </Box>
            </Fade>
        </Modal>
    )
}