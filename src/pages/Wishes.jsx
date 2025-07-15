import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import Marquee from "@/components/ui/marquee";
import {
    Calendar,
    Clock,
    ChevronDown,
    User,
    MessageCircle,
    Send,
    Smile,
    CheckCircle,
    XCircle,
    HelpCircle,
} from 'lucide-react';
import { useState } from 'react';
import { formatEventDate } from '@/lib/formatEventDate';

export default function Wishes() {
    const [showConfetti, setShowConfetti] = useState(false);
    const [newWish, setNewWish] = useState('');
    const [guestName, setGuestName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [attendance, setAttendance] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        { value: 'ATTENDING', label: 'Vâng, tôi sẽ đến!' },
        { value: 'NOT_ATTENDING', label: 'Không, tôi không thể đến.' },
        { value: 'MAYBE', label: 'Có thể, tôi sẽ xác nhận sau.' }
    ];

    const [wishes, setWishes] = useState([]);

    const handleSubmitWish = async (e) => {
        e.preventDefault();
        if (!newWish.trim() || !guestName.trim()) return;

        setIsSubmitting(true);

        const newWishObj = {
            name: guestName,
            attendance,
            wish: newWish,
        };

        try {
            await fetch("https://script.google.com/macros/s/AKfycbwk8BHdKeIceOm0-e6TC26EKEoKSz2U7taDWvSFl6f2s136ETTYvSIezCIy_YejlMjI/exec", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newWishObj)
            });

            setWishes(prev => [
                {
                    id: Date.now(),
                    name: guestName,
                    message: newWish,
                    timestamp: new Date().toISOString(),
                    attending: attendance.toLowerCase()
                },
                ...prev
            ]);
            setGuestName('');
            setNewWish('');
            setAttendance('');
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        } catch (err) {
            console.error("Failed to send wish:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getAttendanceIcon = (status) => {
        switch (status) {
            case 'attending':
                return <CheckCircle className="w-4 h-4 text-emerald-500" />;
            case 'not-attending':
                return <XCircle className="w-4 h-4 text-rose-500" />;
            case 'maybe':
                return <HelpCircle className="w-4 h-4 text-amber-500" />;
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmitWish} className="space-y-4">
            <input
                type="text"
                placeholder="Nhập tên của bạn..."
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-gray-700 placeholder-gray-400"
                required
            />

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-left flex items-center justify-between"
                >
                    <span className={attendance ? 'text-gray-700' : 'text-gray-400'}>
                        {attendance ? options.find(opt => opt.value === attendance)?.label : 'Chọn sự hiện diện...'}
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
                                    className={`w-full px-4 py-2.5 text-left transition-colors ${attendance === option.value ? 'bg-rose-50 text-rose-600' : 'text-gray-700 hover:bg-rose-50'}`}
                                >
                                    {option.label}
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <textarea
                placeholder="Lời chúc từ bạn tới Tụi mình ..."
                value={newWish}
                onChange={e => setNewWish(e.target.value)}
                className="w-full h-32 p-4 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 resize-none transition-all duration-200"
                required
            />

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className={`flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-200 ${isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600'}`}
            >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Đang gửi...' : 'Gửi'}</span>
            </motion.button>
        </form>
    );
}
