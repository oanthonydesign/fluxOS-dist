import React from "react";
import { Composition } from "remotion";
import { FluxShowcase } from "./FluxShowcase";
import "./style.css";

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="FluxShowcase"
                component={FluxShowcase}
                durationInFrames={1710}
                fps={60}
                width={1920}
                height={1080}
            />
        </>
    );
};
