import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function CountdownProvider({ number, duration, style, className }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, number, { duration: duration });
        return animation.stop;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <motion.p className={className} style={{ style }}>{rounded}</motion.p>;
}
