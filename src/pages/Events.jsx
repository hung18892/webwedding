import EventCards from '@/components/EventsCard';
import config from '@/config/config';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useRef } from 'react';

export default function Events() {
    const { agenda } = config.data;
    const sectionRef = useRef(null);
    
    // Hook cho hiệu ứng parallax
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Animation cho image2 (trái -> giữa)
    const image2X = useTransform(scrollYProgress, [0, 1], ["-20%", "50%"]);
    const image2Opacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0.7]);
    
    // Animation cho image3 (phải -> giữa)
    const image3X = useTransform(scrollYProgress, [0, 1], ["120%", "50%"]);
    const image3Opacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0.7]);

    return (
        <section 
            id="event" 
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden bg-white"
        >
            {/* ========== BACKGROUND IMAGES ========== */}
            {/* Image 2 - Di chuyển từ trái sang giữa */}
            <motion.div
                style={{
                    x: image2X,
                    opacity: image2Opacity
                }}
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('/images/image2.jpg')" }}
            />
            
            {/* Image 3 - Di chuyển từ phải sang giữa */}
            <motion.div
                style={{
                    x: image3X,
                    opacity: image3Opacity
                }}
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('/images/image3.jpg')" }}
            />
            
            {/* Lớp phủ màu (nếu cần) */}
            <div className="absolute inset-0 bg-black/10 z-1" />

            {/* ========== MAIN CONTENT ========== */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="relative z-10 container mx-auto px-4 py-16 sm:py-20"
            >
                {/* Phần header và content giữ nguyên như trước */}
                <motion.header
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.15,
                                delayChildren: 0.2
                            }
                        }
                    }}
                    className="text-center space-y-4 mb-12 sm:mb-16"
                >
                    {/* ... (Giữ nguyên phần header) ... */}
                </motion.header>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="max-w-2xl mx-auto px-2 sm:px-0"
                >
                    <EventCards events={agenda} />
                </motion.div>
            </motion.div>
        </section>
    );
}
