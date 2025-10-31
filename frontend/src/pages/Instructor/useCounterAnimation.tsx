// useCounterAnimation.js

import { useState, useEffect } from 'react';

/**
 * Custom hook to animate a number count from zero to a target value.
 * @param {number} endValue - The final number to reach.
 * @param {number} duration - The duration of the animation in milliseconds.
 * @returns {number} The current count value.
 */
const useCounterAnimation = (endValue, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (endValue === 0) return; // Avoid animation if the target is zero

        let startTime;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            
            // Calculate the current value based on progress and duration
            const currentValue = Math.min(endValue, (progress / duration) * endValue);

            setCount(Math.ceil(currentValue));

            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);

        // Cleanup function
        return () => {
            startTime = null;
        };
    }, [endValue, duration]);

    return count;
};

export default useCounterAnimation;