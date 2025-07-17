import config from '@/config/config';
import { motion } from 'framer-motion';
import {
  Copy,
  Gift,
  CheckCircle,
  Wallet,
  Building2,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Gifts() {
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showImage, setShowImage] = useState(false);
  
  useEffect(() => {
    setHasAnimated(true);
  }, []);
  
  const copyToClipboard = (text, bank) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(bank);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handleWalletClick = (e) => {
    e.stopPropagation(); // Ngăn sự kiện nổi bọt
    setShowImage(true);
  };

  const closeImageModal = () => {
    setShowImage(false);
  };

  return (
    <>
      {/* Modal hiển thị ảnh */}
      {showImage && (
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
              src="/images/image6.jpg" 
              alt="QR Code" 
              className="w-full h-auto object-contain"
            />
            <div className="p-4 text-center bg-gray-50">
              <p className="text-sm text-gray-600">Quét mã QR để chuyển khoản</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Phần nội dung chính */}
      <section id="gifts" className="min-h-screen relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            {/* ... (giữ nguyên phần header) ... */}
          </motion.div>

          {/* Bank Accounts Grid */}
          <div className="max-w-2xl mx-auto grid gap-6">
            {config.data.banks.map((account, index) => (
              <motion.div
                key={account.accountNumber}
                initial={{ opacity: 0, y: 20 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 * index + 0.7 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50 rounded-2xl transform transition-transform group-hover:scale-105 duration-300" />
                <div className="relative backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-white p-2 shadow-sm">
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
                      onClick={handleWalletClick}
                      className="text-rose-400 hover:text-rose-500 transition-colors"
                    >
                      <Wallet className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between bg-gray-50/80 px-4 py-3 rounded-lg">
                      <p className="font-mono text-gray-700">{account.accountNumber}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyToClipboard(account.accountNumber, account.bank)}
                        className="flex items-center space-x-1 text-rose-500 hover:text-rose-600"
                      >
                        {copiedAccount === account.bank ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        <span className="text-sm">
                          {copiedAccount === account.bank ? 'Copied!' : 'Copy'}
                        </span>
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
