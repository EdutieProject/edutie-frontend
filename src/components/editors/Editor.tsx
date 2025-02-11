import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import EditorJS, {OutputData} from "@editorjs/editorjs";
import Header from "@editorjs/header"
import {useTheme} from "@mui/material";
import MathTool from "./mathTool"


export function normalizeEditorOutputData(editorOutputData: OutputData): string {
    let outputStr = "";
    for (let block of editorOutputData.blocks) {
        outputStr += block.data.text ?? block.data.latex;
        outputStr += " "; // Add space after block end
    }
    return outputStr;
}

interface EditorComponentProps {
    currentContent: OutputData;
    setCurrentContent: Dispatch<SetStateAction<OutputData>>
}

export default function Editor(props: EditorComponentProps) {
    const theme = useTheme();
    const ejInstance = useRef<any>(null);
    const [editorContentState, _] = useState<OutputData>(props.currentContent);


    const initEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs',
            onReady: () => {
                ejInstance.current = editor;
            },
            autofocus: true,
            data: editorContentState,
            onChange: async () => {
                let content = await editor.saver.save();
                console.log(content);
                props.setCurrentContent(content);
            },
            tools: {
                math: MathTool,
                header: Header
            },
            minHeight: theme.spacing(6) as unknown as number
        });
    };

    useEffect(() => {
        if (ejInstance.current === null) {
            initEditor();
        }

        return () => {
            ejInstance?.current?.destroy();
            ejInstance.current = null;
        };
    }, []);

    return (<>
        <div id='editorjs' style={{
            padding: theme.spacing(2),
            backgroundColor: theme.palette.common.white,
            borderRadius: theme.shape.borderRadius,
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6)
        }}></div>
    </>);
}