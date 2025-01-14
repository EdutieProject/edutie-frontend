import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import EditorJS, {OutputData} from "@editorjs/editorjs";
import MathEditor from "editorjs-mathlive";
import Header from "@editorjs/header"
import {useTheme} from "@mui/material";

const DEFAULT_INITIAL_DATA: OutputData = {
    "time": new Date().getTime(),
    "blocks": [
        {
            "type": "header",
            "data": {
                "text": "Podejście do problemu",
                "level": 2
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "Problemy rozwiążę poprzez zastosowanie [...]. Korzystam z tego, ponieważ [...]"
            }
        },
        {
            "type": "header",
            "data": {
                "text": "Obliczenia",
                "level": 2
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "Poniżej zawieram obliczenia (o ile są potrzebne)"
            }
        },
        {
            "type": "math",
            "data": {
                "latex": "1+2^3=3^2",
            }
        },
        {
            "type": "header",
            "data": {
                "text": "Podsumowanie rozwiązania",
                "level": 2
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "Zastosowane zostały założenia zagadnienia [...]",
            }
        },
    ]
}

export function normalizeEditorOutputData(editorOutputData: OutputData): string {
    let outputStr = "";
    for (let block of editorOutputData.blocks) {
        outputStr += block.data.text ?? block.data.latex;
        outputStr += " "; // Add space after block end
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
                math: {
                    class: MathEditor,
                    inlineToolbar: true,
                    config: {
                        virtualKeyboardMode: 'onfocus',
                        defaultMode: 'math',
                        smartMode: true,
                        virtualKeyboardTheme: 'apple',
                    },
                },
                header: Header
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