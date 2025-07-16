import EventCards from '@/components/EventsCard';
import config from '@/config/config';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export default function Events() {
    const { agenda } = config.data;
    const sectionRef = useRef(null);
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
        '/images/image2.jpg',
        '/images/image3.jpg',
        '/images/image4.jpg',
        '/images/image5.jpg'
    ];

    // Tự động chuyển ảnh mỗi 3 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Hiệu ứng scroll parallax nhẹ
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    return (
        <section 
            id="event" 
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden bg-white"
        >
            {/* ========== SLIDING BACKGROUNDS ========== */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`bg-${currentImage}`}
                    style={{ opacity: bgOpacity }}
                    className="absolute inset-0 bg-cover bg-center z-0"
                    initial={{ 
                        x: currentImage === 0 ? '-100%' : '100%',
                        opacity: 0 
                    }}
                    animate={{ 
                        x: '0%', 
                        opacity: 1,
                        transition: { 
                            duration: 1.2,
                            ease: [0.32, 0.72, 0, 1] 
                        }
                    }}
                    exit={{
                        x: currentImage === 0 ? '100%' : '-100%',
                        opacity: 0,
                        transition: { 
                            duration: 1.2,
                            ease: [0.32, 0.72, 0, 1] 
                        }
                    }}
                    style={{ 
                        backgroundImage: `url(${images[currentImage]})`,
                        backgroundSize: 'cover'
                    }}
                />
            </AnimatePresence>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 z-1" />

            {/* ========== MAIN CONTENT ========== */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 container mx-auto px-4 py-20"
            >
                {/* Header content... */}
                
                {/* Events grid... */}
            </motion.div>
        </section>
    );
}
