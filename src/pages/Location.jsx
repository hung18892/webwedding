import config from "@/config/config";
import { Clock, Navigation as NavigationIcon, MapPin, CalendarCheck, Phone, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatEventDate } from "@/lib/formatEventDate";

export default function Location() {
    // Dữ liệu timeline (có thể move ra config nếu cần)
    const timelineEvents = [
        { time: "09:00", title: "Đón khách" },
        { time: "09:30", title: "Lễ Thành Hôn" },
        { time: "10:00", title: "Khai tiệc" },
        { 
            time: "11:30", 
            title: "Chụp ảnh cùng",
            subtitle: "Cô Dâu & Chú Rể" 
        }
    ];

    return (
        <>
            {/* Location section */}
            <section id="location" className="min-h-screen relative overflow-hidden bg-gray-50">
                <div className="container mx-auto px-4 py-20 relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center space-y-4 mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="inline-block text-rose-500 font-medium"
                        >
                            Địa điểm sự kiện diễn ra
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-serif text-gray-800"
                        >
                            Địa điểm & Thời gian
                        </motion.h2>

                        {/* Decorative Divider */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-center gap-4 pt-4"
                        >
                            <div className="h-[1px] w-12 bg-rose-200" />
                            <MapPin className="w-5 h-5 text-rose-400" />
                            <div className="h-[1px] w-12 bg-rose-200" />
                        </motion.div>
                    </motion.div>

                    {/* Grid Layout */}
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
                        {/* Column 1: Map */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            {/* Map Container */}
                            <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border-8 border-white bg-white">
                                <iframe
                                    src={config.data.maps_embed}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>

                            {/* Venue Details Card */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                            >
                                <h3 className="text-2xl font-serif text-gray-800 mb-4">{config.data.location}</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                                        <p className="text-gray-600">{config.data.address}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CalendarCheck className="w-5 h-5 text-rose-500" />
                                        <p className="text-gray-600">{formatEventDate(config.data.date)}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-rose-500" />
                                        <p className="text-gray-600">{config.data.time}</p>
                                    </div>
                                </div>
                                <motion.a
                                    href={config.data.maps_url}
                                    target="_blank"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-rose-600 hover:text-rose-700"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Xem bản đồ đầy đủ
                                </motion.a>
                            </motion.div>
                        </motion.div>

                        {/* Column 2: Timeline */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                        >
                            <h3 className="text-2xl font-serif text-gray-800 mb-6 text-center">TIMELINE</h3>
                            
                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-5 top-0 h-full w-0.5 bg-rose-100" />
                                
                                {timelineEvents.map((event, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex gap-4 pb-6 relative last:pb-0"
                                    >
                                        {/* Timeline dot */}
                                        <div className="flex-shrink-0 relative">
                                            <div className="w-3 h-3 rounded-full bg-rose-500 absolute top-1.5 left-4 transform -translate-x-1/2 z-10" />
                                            <div className="w-3 h-3 rounded-full bg-rose-100 absolute top-1.5 left-4 transform -translate-x-1/2 animate-ping" />
                                        </div>
                                        
                                        {/* Event content */}
                                        <div>
                                            <div className="text-lg font-semibold text-rose-600">{event.time}</div>
                                            <div className="mt-1 text-gray-700">
                                                <p className="font-medium">{event.title}</p>
                                                {event.subtitle && (
                                                    <p className="text-sm text-gray-500 mt-1">{event.subtitle}</p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Phát nhạc footer */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: timelineEvents.length * 0.1 + 0.3 }}
                                className="mt-8 text-center italic text-gray-400 text-sm"
                            >
                                Phát Nhạc
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}
