import React, {useEffect} from "react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: true,
    theme: "forest",
    look: "handDrawn",
    layout: "elk",
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
        <div className="mermaid" style={{width: "100%", display: "grid", placeItems: "center"}}>{props.chart}</div>
    )
}