import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useEffect, useRef, useState } from 'react';
import {
    ChevronDown,
    Send,
    CheckCircle,
    XCircle,
    HelpCircle,
    Heart,
} from 'lucide-react';

export default function Wishes() {
    const wishesRef = useRef(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [newWish, setNewWish] = useState('');
    const [guestName, setGuestName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [attendance, setAttendance] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    const options = [
        { value: 'Vâng, tôi sẽ đến!', label: 'Vâng, tôi sẽ đến!' },
        { value: 'Không, tôi không thể đến.', label: 'Không, tôi không thể đến.' },
        { value: 'Có thể, tôi sẽ xác nhận sau.', label: 'Có thể, tôi sẽ xác nhận sau.' }
    ];

    const [wishes, setWishes] = useState([]);

    useEffect(() => {
        setHasAnimated(true);
        if (window.location.hash === '#wishes' && wishesRef.current) {
            wishesRef.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, []);

    // ... (giữ nguyên các hàm handleSubmitWish, getAttendanceIcon)

    return (
        <section 
            id="wishes" 
            ref={wishesRef} 
            className="py-8 px-4 md:py-12 max-w-2xl mx-auto"
        >
            {/* Phần tiêu đề kế thừa từ Gifts */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center space-y-4 mb-12"
            >
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="inline-block text-rose-500 font-medium"
                >
                    Lời chúc
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-5xl font-serif text-gray-800"
                >
                    Gửi lời chúc
                </motion.h2>

                {/* Decorative Divider với icon trái tim */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={hasAnimated ? { scale: 1 } : {}}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-4 pt-4"
                >
                    <div className="h-[1px] w-12 bg-rose-200" />
                    <Heart className="w-5 h-5 text-rose-400" />
                    <div className="h-[1px] w-12 bg-rose-200" />
                </motion.div>

                {/* Lời dẫn */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={hasAnimated ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                    className="text-gray-600 max-w-md mx-auto"
                >
                    Gửi những lời chúc tốt đẹp nhất đến với chúng mình nhé!
                </motion.p>

                {/* Optional: Additional Decorative Element */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={hasAnimated ? { scale: 1 } : {}}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-center gap-3 pt-4"
                >
                    <div className="h-px w-8 bg-rose-200/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                    <div className="h-px w-8 bg-rose-200/50" />
                </motion.div>
            </motion.div>

            {/* Phần form giữ nguyên như cũ */}
            <form onSubmit={handleSubmitWish} className="space-y-4">
                {/* ... (giữ nguyên phần form hiện tại) ... */}
            </form>

            {/* ... (giữ nguyên phần thông báo và confetti) ... */}
        </section>
    );
}
