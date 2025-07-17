import config from "@/config/config";
import { Clock, MapPin, CalendarCheck, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatEventDate } from "@/lib/formatEventDate";

export default function Location() {
  // Dữ liệu timeline
  const timelineEvents = [
    { time: "09:00", title: "Đón khách", icon: <Clock className="w-4 h-4" /> },
    { time: "09:30", title: "Lễ Thành Hôn", icon: <Clock className="w-4 h-4" /> },
    { time: "10:00", title: "Khai tiệc", icon: <Clock className="w-4 h-4" /> },
    { 
      time: "11:30", 
      title: "Chụp ảnh cùng",
      subtitle: "Cô Dâu & Chú Rể",
      icon: <Clock className="w-4 h-4" /> 
    }
  ];

  return (
    <section id="location" className="min-h-screen relative overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        {/* Phần Header giữ nguyên */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block text-rose-500 font-medium text-sm md:text-base"
          >
            Địa điểm sự kiện diễn ra
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-gray-800"
          >
            Địa điểm & Thời gian
          </motion.h2>

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

        {/* Grid Layout cho Desktop */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Cột 1: Bản đồ và Thông tin */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white"
            >
              <iframe
                src={config.data.maps_embed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl md:text-2xl font-serif text-gray-800 mb-4">{config.data.location}</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600 text-sm md:text-base">{config.data.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarCheck className="w-5 h-5 text-rose-500" />
                  <p className="text-gray-600 text-sm md:text-base">{formatEventDate(config.data.date)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-rose-500" />
                  <p className="text-gray-600 text-sm md:text-base">{config.data.time}</p>
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
          </div>

          {/* Cột 2: Timeline - Phiên bản tối ưu mobile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-2xl font-serif text-gray-800 mb-6 text-center">TIMELINE</h3>
            
            <div className="relative">
              {/* Đường timeline */}
              <div className="absolute left-[22px] top-0 h-full w-0.5 bg-rose-200/50" />
              
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 pb-6 relative last:pb-0 pl-2"
                >
                  {/* Dot và Icon */}
                  <div className="flex-shrink-0 relative">
                    <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-rose-500/10 border-2 border-rose-400 flex items-center justify-center">
                      {event.icon}
                    </div>
                  </div>
                  
                  {/* Nội dung */}
                  <div className="pt-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                      <span className="text-lg font-semibold text-rose-600 whitespace-nowrap">
                        {event.time}
                      </span>
                      <span className="text-base font-medium text-gray-700">
                        {event.title}
                      </span>
                    </div>
                    {event.subtitle && (
                      <p className="mt-1 text-sm text-gray-500 sm:pl-[3.5rem]">
                        {event.subtitle}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: timelineEvents.length * 0.1 + 0.3 }}
              className="mt-8 text-center italic text-gray-400 text-sm"
            >
              Phát Nhạc
            </motion.div>

            {/* Navigation cho mobile */}
            <div className="grid grid-cols-5 gap-2 mt-8 text-xs text-center">
              {['Tin tức', 'Sự kiện', 'Địa điểm', 'Quà', 'Lời chúc'].map((item) => (
                <button 
                  key={item}
                  className="py-2 px-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
