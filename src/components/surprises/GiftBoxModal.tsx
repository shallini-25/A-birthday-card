import React, { useState } from 'react';
import { X, ArrowLeft, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../../config/birthdayConfig';
import { GiftBoxSticker } from '../common/CuteDoodles';
import { soundManager } from '../../utils/soundEffects';

interface GiftBoxModalProps {
  onClose: () => void;
}

export const GiftBoxModal: React.FC<GiftBoxModalProps> = ({ onClose }) => {
  const { giftBox, name } = birthdayConfig;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (isOpen) return;
    soundManager.playSparkle();
    setIsOpen(true);

    // Multi-color celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#FBBF24', '#A78BFA', '#34D399', '#60A5FA'],
    });
  };

  const handleRewrap = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPop();
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Tapping outside the card goes back to the surprise menu
    if (e.target === e.currentTarget) {
      soundManager.playPop();
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex flex-col items-center p-3 sm:p-6 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-indigo-200 my-auto text-left flex flex-col cursor-default"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-indigo-200/80 mb-4">
          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-xs sm:text-sm font-heading font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Surprises Menu</span>
          </button>

          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-heading font-bold text-purple-950">
              {giftBox.title}
            </h2>
            <p className="text-xs font-hand text-indigo-600 font-bold">
              {giftBox.subtitle}
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-800 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gift Box Container */}
        <div className="w-full flex flex-col items-center justify-center py-2">
          
          {/* Animated Gift Graphic */}
          <div
            onClick={!isOpen ? handleOpenGift : undefined}
            className={`cursor-pointer transition-transform duration-300 ${
              !isOpen ? 'hover:scale-105 active:scale-95 animate-bounce' : ''
            }`}
          >
            <GiftBoxSticker className="w-36 h-36 sm:w-44 sm:h-44" isOpen={isOpen} />
          </div>

          {/* Interactive Button if not opened yet */}
          {!isOpen && (
            <div className="mt-4 text-center">
              <button
                id="open-gift-box-btn"
                onClick={handleOpenGift}
                className="py-3 px-8 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-heading font-bold text-base cute-btn flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
                <span>Tap to Unwrap Surprise! 🎁</span>
              </button>
              <p className="text-xs font-hand font-semibold text-purple-600 mt-2">
                A special reminder crafted for {name}
              </p>
            </div>
          )}

          {/* Revealed Surprise Card */}
          {isOpen && (
            <div className="w-full mt-4 bg-[#FFFDF9] rounded-2xl p-5 sm:p-6 border-2 border-indigo-200 shadow-md animate-fadeIn flex flex-col items-center text-center">
              
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-purple-950 mb-2">
                {giftBox.revealedHeading}
              </h3>

              <p className="font-hand text-lg sm:text-xl font-bold text-purple-900 leading-relaxed max-w-md">
                "{giftBox.message}"
              </p>

              {/* Friendship Perks / Coupons */}
              <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                {giftBox.perks.map((perk, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-purple-50 border border-purple-100 text-xs font-heading font-medium text-purple-900 flex items-center gap-2"
                  >
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons: Open Again or Return to Surprises */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleRewrap}
                  className="inline-flex items-center gap-2 text-xs font-heading font-semibold text-purple-700 hover:text-purple-900 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{giftBox.openAgainText}</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playPop();
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Surprises</span>
                </button>
              </div>

              <p className="text-[11px] text-purple-400 font-hand font-medium mt-3">
                Tap anywhere outside to return to surprises 🌸
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
