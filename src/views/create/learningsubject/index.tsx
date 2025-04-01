import {
    Autocomplete,
    Backdrop,
    Box,
    Button,
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
import {navigationPath, navSections} from "src/features/navigation/navigationPath";

import {Add, InfoOutlined, Warning} from "@mui/icons-material";
import {Link, useNavigate, useParams} from "react-router";

import sleepyEmoji from "src/assets/svg/emoji/sleepy.svg";
import {ApiError, KnowledgeSubjectSearchView, LearningSubjectManagementView} from "src/services/types";
import {searchKnowledgeSubjects} from "src/services/management/knowledgeSubjectService";
import {
    addLearningSubjectRequirement,
    getLearningSubjectById,
    setKnowledgeSubject
} from "src/services/management/learningSubjectService";
import LoadingView from "src/views/common/LoadingView";
import MarkdownLaTeXRenderer from "src/components/markdown/MarkdownLaTexRenderer";
import Tooltip from '@mui/material/Tooltip';
import ErrorView from "src/views/common/ErrorView";
import LearningSubjectIcon from "src/components/icons/LearningSubjectIcon";
import KnowledgeSubjectIcon from "src/components/icons/KnowledgeSubjectIcon";
import {UniversalModalParams} from "src/views/common/types";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: "20rem", md: "24rem"},
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1
};

export default function LearningSubjectEditorView() {
    const theme = useTheme();
    const navigate = useNavigate();
    const {learningSubjectId} = useParams<{ learningSubjectId: string }>();
    const [error, setError] = useState<ApiError>();

    const [learningSubjectView, setLearningSubjectView] = useState<LearningSubjectManagementView>();
    const [selectedRequirementIdx, setSelectedRequirementIdx] = useState<number>(0);

    const [requirementModalOpen, setRequirementModalOpen] = React.useState(false);
    const handleRequirementModalOpen = () => setRequirementModalOpen(true);
    const handleRequirementModalClose = () => setRequirementModalOpen(false);

    const [knowledgeSourceModalOpen, setKnowledgeSourceModalOpen] = React.useState(false);
    const handleKnowledgeSourceModalOpen = () => setKnowledgeSourceModalOpen(true);
    const handleKnowledgeSourceModalClose = () => setKnowledgeSourceModalOpen(false);

    async function loadLearningSubject() {
        const response = await getLearningSubjectById(learningSubjectId as string);
        if (!response.success) {
            setError(response.error);
            return;
        }
        setLearningSubjectView(response.data);
    }

    async function handleLearningSubjectSetKnowledgeSubject(knowledgeSubjectId: string) {
        // @ts-ignore
        const response = await setKnowledgeSubject(learningSubjectView?.learningSubject.id, knowledgeSubjectId);
        if (!response.success) {
            setError(response.error);
            return;
        }
        setLearningSubjectView(undefined); //reset the view to re-load learning subject
        setKnowledgeSourceModalOpen(false);
    }

    async function handleAddLearningSubjectRequirement(title: string) {
        // @ts-ignore
        const response = await addLearningSubjectRequirement(learningSubjectView?.learningSubject.id, title, learningSubjectView?.learningSubject.requirements.length);
        if (!response.success) {
            setError(response.error);
            return;
        }
        setLearningSubjectView(undefined);
        // @ts-ignore
        setSelectedRequirementIdx(learningSubjectView?.learningSubject.requirements.length);
        setRequirementModalOpen(false);
    }

    useEffect(() => {
        loadLearningSubject().then();
    }, [learningSubjectView === undefined]);

    if (error)
        return <ErrorView error={error}/>

    if (learningSubjectView === null || learningSubjectView === undefined) {
        return <LoadingView/>
    }

    console.log(learningSubjectView);

    return (
        <NavLayout activeSectionIdOverride={navSections.home} variant={"view"}>
            <Container sx={{mt: 2}}>
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Typography variant={"h3"} sx={{mb: 4}}>
                        <LearningSubjectIcon sx={{mr: 2}}/>
                        {learningSubjectView.learningSubject.name}
                    </Typography>
                    {
                        learningSubjectView.learningSubject.learningEligible ? (
                            <Button onClick={() => navigate(
                                navigationPath.fillPath(navigationPath.learningSubjectLearn, learningSubjectView?.learningSubject.id)
                            )}>Go to learning view</Button>
                        ) : (<></>)
                    }

                </Box>
                <Grid container spacing={6} sx={{marginTop: 2}}>
                    <Grid size={{xs: 12, md: 4}}>
                        <Typography>Knowledge sources:</Typography>
                        {
                            learningSubjectView.learningSubject.knowledgeOriginEmpty ? (
                                <Box sx={{display: "flex", flexDirection: "column", alignItems: "stretch", gap: 2}}>
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
                                    <Box>
                                        <Typography variant={"subtitle1"} color={"textSecondary"}>
                                            <Warning sx={{mr: 1}}/>Learning subjects without knowledge subjects are not
                                            eligible for learning.
                                        </Typography>
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
                                        <KnowledgeSubjectIcon/>
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
                                    <Step
                                        key={o.id}
                                        onClick={() => setSelectedRequirementIdx(o.ordinal)}
                                        active={o.ordinal === selectedRequirementIdx}
                                    >
                                        <StepLabel>{o.title}</StepLabel>
                                    </Step>
                                )
                            }
                        </Stepper>
                        {
                            learningSubjectView.learningSubject.knowledgeOriginEmpty ? (
                                <Box>
                                    <Typography variant={"subtitle1"} color={"textSecondary"}>
                                        <Warning sx={{mr: 1}}/> You must add knowledge sources to the learning subject
                                        before you can add requirements.
                                    </Typography>
                                </Box>
                            ) : learningSubjectView.learningSubject.requirements.length === 0 ? (
                                <>
                                    <Box sx={{display: "flex", flexDirection: "column", mt: 2, gap: 1}}>
                                        <Link onClick={handleRequirementModalOpen} to={"#"}>
                                            Add new requirement
                                        </Link>
                                    </Box>
                                    <Box>
                                        <Typography variant={"subtitle1"} color={"textSecondary"}>
                                            <Warning sx={{mr: 1}}/> Learning subjects without requirements are not
                                            eligible
                                            for learning.
                                        </Typography>
                                    </Box>
                                </>
                            ) : (
                                <Box sx={{display: "flex", flexDirection: "column", mt: 2, gap: 1}}>
                                    <Link onClick={handleRequirementModalOpen} to={"#"}>
                                        Add new requirement
                                    </Link>
                                </Box>
                            )
                        }
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        {learningSubjectView.learningSubject.requirements.length !== 0 ? (
                            <>
                                <Box sx={{my: 2}}>
                                    <Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 1}}>
                                        <Typography color={"textSecondary"} variant={"caption"}>
                                            <b>Title</b>
                                        </Typography>
                                        <Tooltip
                                            title={"Title is being displayed to the learners and is not used in the learning materials generation process."}
                                            placement={"right"}>
                                            <InfoOutlined sx={{fontSize: 16}}/>
                                        </Tooltip>
                                    </Box>
                                    <Typography
                                        variant={"h5"}>{learningSubjectView.learningSubject.requirements[selectedRequirementIdx].title}</Typography>
                                </Box>
                                <Box sx={{my: 2}}>
                                    <Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 1}}>
                                        <Typography color={"textSecondary"} variant={"caption"}>
                                            <b>Student objective</b>
                                        </Typography>
                                        <Tooltip
                                            title={"Student objective is being used in learning materials generation process."}
                                            placement={"right"}>
                                            <InfoOutlined sx={{fontSize: 16}}/>
                                        </Tooltip>
                                    </Box>
                                    <MarkdownLaTeXRenderer
                                        content={learningSubjectView.learningSubject.requirements[selectedRequirementIdx].studentObjective}/>
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
                                <Typography variant={"h4"} sx={{mb: 1, textAlign: "center"}}><b>Nothing to be seen
                                    here.</b></Typography>
                                <Typography sx={{mb: 1, textAlign: "center"}}>Add a requirement to edit it in this
                                    section.</Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Container>
            <KnowledgeOriginModal isOpen={knowledgeSourceModalOpen} handleClose={handleKnowledgeSourceModalClose}
                                  setLearningSubjectKnowledgeSubjectId={handleLearningSubjectSetKnowledgeSubject}
                                  setError={setError}/>
            <AddRequirementModal isOpen={requirementModalOpen} handleClose={handleRequirementModalClose}
                                 addLearningSubjectRequirement={handleAddLearningSubjectRequirement}
                                 setError={setError}/>
        </NavLayout>
    );
}

interface KnowledgeOriginModalParams extends UniversalModalParams {
    setLearningSubjectKnowledgeSubjectId: (id: string) => Promise<void>;
}

function KnowledgeOriginModal(props: KnowledgeOriginModalParams) {
    const theme = useTheme();
    const [searchedKnowledgeSubjects, setSearchedKnowledgeSubjects] = useState<Array<KnowledgeSubjectSearchView>>([]);
    const [knowledgeSubjectSetLoading, setKnowledgeSubjectSetLoading] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState(""); // Track input value

    // Debounce function using useEffect
    useEffect(() => {
        if (searchPhrase.trim() === "") return;

        const handler = setTimeout(() => {
            updateSearchResults(searchPhrase).then();
        }, 500); // 500ms delay

        return () => clearTimeout(handler); // Cleanup function cancels previous calls
    }, [searchPhrase]); // Re-run when searchPhrase changes

    async function updateSearchResults(searchPhrase: string) {
        const apiResponse = await searchKnowledgeSubjects(searchPhrase);
        if (!apiResponse.success) {
            props.setError(apiResponse.error);
            return;
        }
        setSearchedKnowledgeSubjects(apiResponse.data as Array<KnowledgeSubjectSearchView>);
    }

    function handleKnowledgeSubjectChoice(knowledgeSubjectId: string) {
        setKnowledgeSubjectSetLoading(true);
        props.setLearningSubjectKnowledgeSubjectId(knowledgeSubjectId)
            .then(() => setKnowledgeSubjectSetLoading(false));
    }

    if (knowledgeSubjectSetLoading) {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.isOpen}
                onClose={props.handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={props.isOpen}>
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
            open={props.isOpen}
            onClose={props.handleClose}
            closeAfterTransition
            slots={{backdrop: Backdrop}}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={props.isOpen}>
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
                                       onChange={(e) => setSearchPhrase(e.target.value)} // Update search phrase state
                            />
                        }
                        clearOnBlur={false} clearOnEscape={false}
                        renderOption={(props, option) => (
                            <Box
                                sx={{p: 1, "&:hover": {backgroundColor: theme.palette.grey[50]}}}
                                onClick={() => handleKnowledgeSubjectChoice(option.knowledgeSubjectReference.id)}
                            >
                                <Typography>{option.title}</Typography>
                                <Typography variant="caption" color="textSecondary">{option.description}</Typography>
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
                <Box sx={{...modalStyle, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2}}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Add Learning Subject Requirement
                    </Typography>
                    <TextField id="outlined-basic" label="Requirement Name" variant="outlined"
                               onChange={(e) => setInputRequirementName(e.target.value)}/>
                    <Button onClick={handleAddRequirement} variant={"contained"}>Add requirement</Button>
                </Box>
            </Fade>
        </Modal>
    )
}