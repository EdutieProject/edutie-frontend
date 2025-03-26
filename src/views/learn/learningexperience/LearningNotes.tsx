import {Box, Container, useTheme} from "@mui/material";
import React from "react";
import {LearningNotes} from "src/services/types";
import MarkdownLaTeXRenderer from "src/components/markdown/MarkdownLaTexRenderer";
import MermaidRenderer from "src/components/mermaid/MermaidRenderer";

interface LearningNotesProps {
    notes: LearningNotes
}

export default function LearningNotesComponent(props: LearningNotesProps) {

    return (
        <Container maxWidth="md" sx={{pb: 10}}>
            {
                props.notes.paragraphs.map(o => {
                    if (o.content.textContentType === "MARKDOWN")
                        return <Box sx={{px: {xs: 1, sm:2, md: 4}}}><MarkdownLaTeXRenderer content={o.content.text} /></Box>
                    if (o.content.visualisationType === "MERMAID")
                        return <MermaidRenderer chart={o.content.code}/>
                })
            }
        </Container>
    );
}
