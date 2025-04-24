import { useEffect, useRef } from 'react';

function ScrollAnimation({ children, threshold = 0.1, rootMargin = '0px', className = '' }) {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Once the animation has played, we can unobserve the element
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold, // How much of the element needs to be visible
                rootMargin  // Margin around the root
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, rootMargin]);

    return (
        <div ref={ref} className={`slide-in ${className}`}>
            {children}
        </div>
    );
}

export default ScrollAnimation;