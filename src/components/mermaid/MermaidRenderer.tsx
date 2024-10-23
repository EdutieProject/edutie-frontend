import React, {useEffect} from "react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: true,
    theme: "forest",
    securityLevel: "loose"
});

interface MermaidRendererProps {
    chart: string;
}

export default function MermaidRenderer(props: MermaidRendererProps) {

    useEffect(() => {
        mermaid.contentLoaded();
    }, []);

    return (
        <div className="mermaid">{props.chart}</div>
    )
}