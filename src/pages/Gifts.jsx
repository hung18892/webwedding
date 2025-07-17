import config from '@/config/config';
import { motion } from 'framer-motion';
import {
  Copy,
  Gift,
  CheckCircle,
  QrCode,
  Building2,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Gifts() {
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  
  useEffect(() => {
    setHasAnimated(true);
  }, []);
  
  const copyToClipboard = (text, bank) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(bank);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handleQrClick = (bankIndex, e) => {
    e.stopPropagation();
    // Hiển thị ảnh tương ứng với ngân hàng
    setCurrentImage(bankIndex === 0 ? '/images/image5.jpg' : '/images/image6.jpg');
  };

  const closeImageModal = () => {
    setCurrentImage(null);
  };

  return (
    <>
      {/* Modal hiển thị ảnh QR */}
      {currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-md w-full bg-white rounded-lg overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-1 shadow-md"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            <img 
              src={currentImage} 
              alt="QR Code" 
              className="w-full h-auto object-contain p-4"
            />
            <div className="p-4 text-center bg-gray-50 border-t">
              <p className="text-sm text-gray-600">Quét mã QR để chuyển khoản</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Phần nội dung chính */}
      <section id="gifts" className="min-h-screen relative overflow-hidden bg-rose-50/10">
        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block text-rose-500 font-medium"
            >
              Quà cưới
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-serif text-gray-800"
            >
              Tặng quà
            </motion.h2>

            <motion.div
              initial={{ scale: 0 }}
              animate={hasAnimated ? { scale: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="h-[1px] w-12 bg-rose-200" />
              <Gift className="w-5 h-5 text-rose-400" />
              <div className="h-[1px] w-12 bg-rose-200" />
            </motion.div>
          </motion.div>

          {/* Danh sách tài khoản ngân hàng */}
          <div className="max-w-2xl mx-auto grid gap-6">
            {config.data.banks.map((account, index) => (
              <motion.div
                key={account.accountNumber}
                initial={{ opacity: 0, y: 20 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 * index + 0.7 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-100/30 to-pink-100/30 rounded-2xl transform transition-transform group-hover:scale-[1.02] duration-300" />
                <div className="relative bg-white/90 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white p-2 shadow-sm border border-rose-100">
                        <Building2 className="w-full h-full text-rose-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{account.bank}</h3>
                        <p className="text-sm text-gray-500">{account.accountName}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleQrClick(index, e)}
                      className="text-rose-500 hover:text-rose-600 transition-colors"
                      aria-label={`Xem QR Code ${account.bank}`}
                    >
                      <QrCode className="w-6 h-6" />
                    </motion.button>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between bg-rose-50/50 px-4 py-3 rounded-lg border border-rose-100">
                      <p className="font-mono text-gray-700">{account.accountNumber}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyToClipboard(account.accountNumber, account.bank)}
                        className="flex items-center gap-1 text-rose-600 hover:text-rose-700 text-sm font-medium"
                      >
                        {copiedAccount === account.bank ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Đã copy</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Sao chép</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
