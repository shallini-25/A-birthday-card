import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, ArrowLeft, Disc3, Info } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { RetroCassetteSticker } from '../common/CuteDoodles';
import { soundManager } from '../../utils/soundEffects';

interface MusicPlayerModalProps {
  onClose: () => void;
}

export const MusicPlayerModal: React.FC<MusicPlayerModalProps> = ({ onClose }) => {
  const { music } = birthdayConfig;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicBoxMode, setIsMusicBoxMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and handle HTML5 Audio
  useEffect(() => {
    const audio = new Audio(music.audioSrc);
    audioRef.current = audio;
    audio.volume = volume;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
        setAudioError(false);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      // Audio file not found or couldn't load -> fallback to built-in music box!
      setAudioError(true);
      setIsMusicBoxMode(true);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      soundManager.stopMusicBox();
    };
  }, [music.audioSrc]);

  // Handle Play/Pause
  const togglePlay = () => {
    soundManager.playPop();

    if (isPlaying) {
      // Pause
      if (isMusicBoxMode) {
        soundManager.stopMusicBox();
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      // Play
      if (isMusicBoxMode || audioError) {
        soundManager.playHappyBirthdayMusicBox(
          (curr, total) => {
            setCurrentTime(curr);
            setDuration(total);
          },
          () => {
            setIsPlaying(false);
            setCurrentTime(0);
          }
        );
        setIsPlaying(true);
      } else if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay rejected or missing audio -> fallback to music box synthesizer
            setIsMusicBoxMode(true);
            soundManager.playHappyBirthdayMusicBox(
              (curr, total) => {
                setCurrentTime(curr);
                setDuration(total);
              },
              () => {
                setIsPlaying(false);
                setCurrentTime(0);
              }
            );
            setIsPlaying(true);
          });
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    soundManager.playPop();
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume || 0.5;
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex flex-col items-center p-3 sm:p-6">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-yellow-200 my-auto text-left flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-yellow-200/80 mb-3">
          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-xs sm:text-sm font-heading font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Surprises Menu</span>
          </button>

          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-heading font-bold text-purple-950">
              Our Little Soundtrack 📼
            </h2>
            <p className="text-xs font-hand text-pink-600 font-bold">
              Music made for birthday smiles
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-800 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cassette Graphic & Player Body */}
        <div className="w-full bg-[#FFFDF9] rounded-2xl p-5 border-2 border-yellow-200/80 shadow-md flex flex-col items-center">
          
          {/* Animated Cassette Tape */}
          <div className="relative my-2">
            <RetroCassetteSticker className="w-36 h-36 sm:w-44 sm:h-44" isPlaying={isPlaying} />
          </div>

          {/* Track Info */}
          <div className="text-center mt-1">
            <h3 className="text-lg font-heading font-bold text-purple-950 flex items-center justify-center gap-1.5">
              <span>{isMusicBoxMode ? music.musicBoxTitle : music.songTitle}</span>
              <Disc3 className={`w-4 h-4 text-purple-500 ${isPlaying ? 'animate-spin' : ''}`} />
            </h3>
            <p className="text-xs font-hand font-semibold text-pink-600 mt-0.5">
              {isMusicBoxMode ? 'Synthesized Birthday Bells ✨' : music.artist}
            </p>
          </div>

          {/* Progress Bar & Timers */}
          <div className="w-full mt-4 px-2">
            <div className="w-full bg-yellow-100 h-2.5 rounded-full overflow-hidden border border-yellow-200">
              <div
                className="bg-gradient-to-r from-yellow-400 to-pink-400 h-full transition-all duration-200 rounded-full"
                style={{
                  width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-heading font-medium text-purple-600 mt-1.5">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls: Play/Pause & Volume */}
          <div className="w-full flex items-center justify-between mt-4 px-2">
            {/* Mode switch */}
            <button
              onClick={() => {
                soundManager.playPop();
                if (isPlaying) togglePlay();
                setIsMusicBoxMode(!isMusicBoxMode);
              }}
              className="text-[11px] font-heading font-medium text-purple-600 hover:text-purple-800 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 cursor-pointer"
            >
              {isMusicBoxMode ? 'Switch to MP3 🎵' : 'Dreamy Music Box 🔔'}
            </button>

            {/* Big Play / Pause Button */}
            <button
              id="cassette-play-pause-btn"
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-400 to-purple-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-transform active:scale-90 cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleMute}
                className="text-purple-600 hover:text-purple-800 cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-pink-500" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1.5 accent-pink-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Helpful audio info note */}
        <div className="mt-3 p-3 bg-yellow-50 rounded-2xl border border-yellow-200 text-xs text-yellow-900 flex items-start gap-2">
          <Info className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-heading font-semibold">Want to use your own song?</p>
            <p className="text-[11px] text-yellow-800 mt-0.5">
              Drop an MP3 file into <code className="bg-yellow-200/70 px-1 py-0.2 rounded font-mono">public/music/birthday-song.mp3</code>. If no file is present, our dreamy synthesized music box melody plays automatically!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
