import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useEffect, useRef, useState } from 'react';
import {
    ChevronDown,
    Send,
    CheckCircle,
    XCircle,
    HelpCircle,
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

    const options = [
        { value: 'Vâng, tôi sẽ đến!', label: 'Vâng, tôi sẽ đến!' },
        { value: 'Không, tôi không thể đến.', label: 'Không, tôi không thể đến.' },
        { value: 'Có thể, tôi sẽ xác nhận sau.', label: 'Có thể, tôi sẽ xác nhận sau.' }
    ];

    const [wishes, setWishes] = useState([]);

    useEffect(() => {
        if (window.location.hash === '#wishes' && wishesRef.current) {
            wishesRef.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, []);

    const handleSubmitWish = async (e) => {
        e.preventDefault();
        if (!newWish.trim() || !guestName.trim()) return;

        setIsSubmitting(true);

        try {
            await fetch("/api/wish", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: guestName,
                    attendance,
                    wish: newWish
                })
            });

            setWishes(prev => [
                {
                    id: Date.now(),
                    name: guestName,
                    message: newWish,
                    timestamp: new Date().toISOString(),
                    attending: attendance
                },
                ...prev
            ]);
            
            setGuestName('');
            setNewWish('');
            setAttendance('');
            setShowConfetti(true);
            setSubmitSuccess(true);
            setTimeout(() => setShowConfetti(false), 3000);
            setTimeout(() => setSubmitSuccess(false), 5000);
        } catch (err) {
            console.error("Failed to send wish:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getAttendanceIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'vâng, tôi sẽ đến!':
                return <CheckCircle className="w-4 h-4 text-emerald-500" />;
            case 'không, tôi không thể đến.':
                return <XCircle className="w-4 h-4 text-rose-500" />;
            case 'có thể, tôi sẽ xác nhận sau.':
                return <HelpCircle className="w-4 h-4 text-amber-500" />;
            default:
                return null;
        }
    };

    return (
        <section 
            id="wishes" 
            ref={wishesRef} 
            className="py-8 px-4 md:py-12 max-w-2xl mx-auto"
        >
            <div class="text-center space-y-4 mb-16" style="opacity: 1; transform: none;"><h2 class="text-4xl md:text-5xl font-serif text-gray-800" style="opacity: 1; transform: none;">Lời Chúc</h2><div class="flex items-center justify-center gap-4 pt-4" style="transform: none;"><div class="h-[1px] w-12 bg-rose-200"></div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-heart h-[18px] w-[18px] sm:h-5 sm:w-5 mb-0.5 sm:mb-1 transition-colors duration-200 stroke-rose-500"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path><path d="M15.8 9.2a2.5 2.5 0 0 0-3.5 0l-.3.4-.35-.3a2.42 2.42 0 1 0-3.2 3.6l3.6 3.5 3.6-3.5c1.2-1.2 1.1-2.7.2-3.7"></path></svg><div class="h-[1px] w-12 bg-rose-200"></div></div></div>
            <form onSubmit={handleSubmitWish} className="space-y-4">
                
                {/* Input tên */}
                <div className="px-2">
                    <input
                        type="text"
                        placeholder="Nhập tên của bạn..."
                        value={guestName}
                        onChange={e => setGuestName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/80 border border-rose-100 focus:border-rose-300 focus:ring-2 focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm md:text-base"
                        required
                    />
                </div>

                {/* Dropdown attendance */}
                <div className="relative px-2">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full px-4 py-3 rounded-xl bg-white/80 border border-rose-100 focus:border-rose-300 focus:ring-2 focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-left flex items-center justify-between"
                    >
                        <span className={attendance ? 'text-gray-700' : 'text-gray-400'}>
                            {attendance || 'Chọn sự hiện diện...'}
                        </span>
                        <ChevronDown
                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                        />
                    </button>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-rose-100 overflow-hidden"
                            >
                                {options.map((option) => (
                                    <motion.button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            setAttendance(option.value);
                                            setIsOpen(false);
                                        }}
                                        whileHover={{ backgroundColor: 'rgb(255, 241, 242)' }}
                                        className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-2 ${
                                            attendance === option.value 
                                                ? 'bg-rose-50 text-rose-600' 
                                                : 'text-gray-700 hover:bg-rose-50'
                                        }`}
                                    >
                                        {getAttendanceIcon(option.value)}
                                        {option.label}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Textarea lời chúc */}
                <div className="px-2">
                    <textarea
                        placeholder="Lời chúc từ bạn tới Tụi mình ..."
                        value={newWish}
                        onChange={e => setNewWish(e.target.value)}
                        maxLength={300}
                        className="w-full min-h-[120px] max-h-[200px] p-4 rounded-xl bg-white/80 border border-rose-100 focus:border-rose-300 focus:ring-2 focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-sm md:text-base"
                        required
                    />
                    <span className="text-xs text-gray-500 text-right block mt-1">
                        {newWish.length}/300 ký tự
                    </span>
                </div>

                {/* Nút gửi */}
                <div className="px-2 pt-2">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        className={`flex items-center justify-center space-x-2 w-full px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 ${
                            isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600'
                        }`}
                    >
                        <Send className="w-4 h-4" />
                        <span className="text-sm md:text-base">
                            {isSubmitting ? 'Đang gửi...' : 'Gửi'}
                        </span>
                    </motion.button>
                </div>
            </form>

            {/* Thông báo thành công */}
            <AnimatePresence>
                {submitSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="text-emerald-600 text-center mt-4 text-sm md:text-base"
                    >
                        Cảm ơn lời chúc của bạn! ❤️
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hiệu ứng confetti */}
            <AnimatePresence>
                {showConfetti && (
                    <Confetti 
                        width={typeof window !== 'undefined' ? window.innerWidth : 300}
                        height={typeof window !== 'undefined' ? window.innerHeight : 500}
                        recycle={false}
                        numberOfPieces={500}
                        tweenDuration={3000}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
