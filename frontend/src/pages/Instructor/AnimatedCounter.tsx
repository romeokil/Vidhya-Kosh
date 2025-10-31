// AnimatedCounter.jsx

import useCounterAnimation from './useCounterAnimation';

const AnimatedCounter = ({ endValue, title,}) => {
    // Use the hook to get the animated count
    const animatedCount = useCounterAnimation(endValue, 2500); // 2.5 seconds duration

    return (
        <div 
            className={`
                p-6 rounded-xl shadow-2xl transition-all duration-500
                'dark:bg-indigo-900/50 dark:text-white dark:shadow-indigo-500/30 bg-white text-gray-900 shadow-xl'
            `}
        >
            <p className={`
                text-sm sm:text-base font-semibold uppercase mb-2 
                dark:text-indigo-300 text-indigo-600
            `}>
                {title}
            </p>
            <h3 
                className={`
                    text-4xl sm:text-6xl font-extrabold tracking-tight 
                    dark:text-indigo-400 text-indigo-700
                `}
            >
                {animatedCount.toLocaleString()}
            </h3>
        </div>
    );
};

export default AnimatedCounter;