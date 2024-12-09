import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import EditorJS, {OutputData} from "@editorjs/editorjs";
import MathEditor from "editorjs-mathlive";
import {useTheme} from "@mui/material";

const DEFAULT_INITIAL_DATA: OutputData = {
    "time": new Date().getTime(),
    "blocks": [
        {
            "type": "paragraph",
            "data": {
                "text": "Tutaj opisz swoje rozwiązanie...",
            }
        },
        {
            "type": "math",
            "data": {
                "latex": "1+2^3=3^2",
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "Możesz dodawać też działania tak jak wyżej!",
            }
        },
    ]
}

export function normalizeEditorOutputData(editorOutputData: OutputData): string {
    let outputStr = "";
    for (let block of editorOutputData.blocks) {
        outputStr += block.data.text ?? block.data.latex;
    }
    return outputStr;
}

interface EditorComponentProps {
    currentContent?: OutputData;
    setCurrentContent: Dispatch<SetStateAction<OutputData>>
}

export default function Editor(props: EditorComponentProps) {
    const theme = useTheme();
    const ejInstance = useRef<any>(null);
    const [editorContentState, _] = useState<OutputData>(props.currentContent ?? DEFAULT_INITIAL_DATA);


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
                math: MathEditor
            },
            minHeight: theme.spacing(6)
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