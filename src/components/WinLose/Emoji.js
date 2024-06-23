// Emoji.js
import React from 'react';

const HappyEmoji = () => (
    <span role="img" aria-label="happy" style={{ fontSize: '4rem' }}>
        🙂
    </span>
);

const SadEmoji = () => (
    <span role="img" aria-label="sad" style={{ fontSize: '4rem' }}>
        😢
    </span>
);

export { HappyEmoji, SadEmoji };
