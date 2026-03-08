import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Scene1ThePast } from './scenes/Scene1ThePast';
import { Scene2TheConflict } from './scenes/Scene2TheConflict';
import { Scene3TheResolution } from './scenes/Scene3TheResolution';
import { Scene4MasterFeature } from './scenes/Scene4MasterFeature';
import { Scene5Analytics } from './scenes/Scene5Analytics';
import { Scene6HowItWorks } from './scenes/Scene6HowItWorks';
import { OutroLogo } from './scenes/OutroLogo'; // Using previous outro

export const FluxShowcase: React.FC = () => {
    return (
        <AbsoluteFill className="bg-[#0A0A0A]">

            {/* 0:00 - 0:03 (0-180) */}
            <Sequence from={0} durationInFrames={180}>
                <Scene1ThePast />
            </Sequence>

            {/* 0:03 - 0:05 (181-300) */}
            <Sequence from={180} durationInFrames={120}>
                <Scene2TheConflict />
            </Sequence>

            {/* 0:05 - 0:08 (301-480) */}
            <Sequence from={300} durationInFrames={180}>
                <Scene3TheResolution />
            </Sequence>

            {/* 0:08 - 0:13 (481-780) */}
            <Sequence from={480} durationInFrames={300}>
                <Scene4MasterFeature />
            </Sequence>

            {/* 0:13 - 0:20 (781-1230) */}
            <Sequence from={780} durationInFrames={450}>
                <Scene5Analytics />
            </Sequence>

            {/* 0:20 - 0:24 (1231-1470) */}
            <Sequence from={1230} durationInFrames={240}>
                <Scene6HowItWorks />
            </Sequence>

            {/* 0:24 - 0:28 (1471-1710) */}
            <Sequence from={1470} durationInFrames={240}>
                <OutroLogo />
            </Sequence>

        </AbsoluteFill>
    );
};
