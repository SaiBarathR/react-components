import { motion } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

export const useElementOnScreen = (options) => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const makeAppear = (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) setIsVisible(true);
    };

    const makeAppearRepeating = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };

    const callBack = options.reappear ? makeAppearRepeating : makeAppear;

    useEffect(() => {
        const containerRefCurrent = containerRef.current;
        const observer = new IntersectionObserver(callBack, options);
        if (containerRefCurrent) observer.observe(containerRefCurrent);

        return () => {
            if (containerRefCurrent) {
                observer.unobserve(containerRefCurrent);
            }
        };
    }, [containerRef, options, callBack]);

    return [containerRef, isVisible];
};

const AnimateOnScroll = ({ type, children, initial, inView, reappear, threshold = 0.5, className, style }) => {
    const [containerRef, isVisible] = useElementOnScreen({
        threshold: threshold,
        reappear: reappear,
    });

    const inViewCss = useMemo(() => {
        const defaultCss = {
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0,
            transition: isVisible ? {
                duration: 4,
                type: "spring"
            } : null
        }
        return isVisible ? (inView || defaultCss) : (initial || { opacity: 0, scale: 0 })
    }, [inView, initial, isVisible])

    function AnimatedContent({ type, ref = containerRef, ...props }) {

        switch (type) {
            case 'h1': return <motion.h1 whileInView={{ transition: {} }} ref={ref} {...props} >{children}</motion.h1>
            case 'p': return <motion.p ref={ref} {...props} >{children}</motion.p>
            default: return <motion.div ref={ref} {...props} >{children}</motion.div>
        }

    }

    return (
        <AnimatedContent
            type={type}
            initial={initial || { opacity: 0, scale: 0 }}
            whileInView={inViewCss}
            className={className}
            style={style}
        />
    );
};

export default AnimateOnScroll;

