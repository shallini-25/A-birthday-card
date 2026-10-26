/**
 * ====================================================================
 * 🎂 BIRTHDAY WEBSITE CONFIGURATION
 * ====================================================================
 * 
 * Customize this file to personalize the entire website!
 * 
 * 📸 To add your photos:
 * 1. Place your pictures inside the "public/images/" folder
 * 2. Name them photo1.jpg, photo2.jpg, etc. (or update the URLs below)
 * 
 * 🔐 Secret Password:
 * Change `secretPassword` to any 4-digit code (e.g. their birthdate "1024" or "1234")
 */

export interface GalleryPhoto {
  id: number;
  url: string;
  caption: string;
  date?: string;
  rotation?: number; // tilt angle for scrapbook Polaroid
  sticker?: string;
  placeholderBg?: string; // pastel background for cute fallback card
  placeholderIllustration?: 'cafe' | 'beach' | 'laughing' | 'selfie' | 'celebrate' | 'journey';
}

export interface BirthdayConfig {
  // Personal Info
  name: string;
  nickname: string;
  birthdayDate: string;
  relationship: string;
  secretPassword: string;

  // Screen 1: Welcome Page
  welcome: {
    greeting: string;
    subGreeting: string;
    yesButtonText: string;
    noButtonText: string;
    noPlayfulResponses: string[];
  };

  // Screen 2: Password Gate
  passwordScreen: {
    title: string;
    subtitle: string;
    hintText: string;
    errorMessage: string;
    successMessage: string;
  };

  // Screen 3: Big Birthday Reveal
  revealScreen: {
    heading: string;
    subheading: string;
    cakeGreeting: string;
    buttonText: string;
    tagline: string;
  };

  // Screen 4: Interactive Surprise Menu
  surpriseMenu: {
    heading: string;
    subtitle: string;
    progressText: string;
    items: {
      camera: { title: string; subtitle: string; badge: string };
      letter: { title: string; subtitle: string; badge: string };
      gift: { title: string; subtitle: string; badge: string };
      reasons?: { title: string; subtitle: string; badge: string };
      wish?: { title: string; subtitle: string; badge: string };
    };
    finishButtonText: string;
  };

  // Surprise A: Photo Gallery
  gallery: {
    title: string;
    subtitle: string;
    photos: GalleryPhoto[];
  };

  // Surprise B: Friendship Letter
  letter: {
    title: string;
    subtitle: string;
    salutation: string;
    paragraphs: string[];
    signOff: string;
    sender: string;
  };

  // Surprise C: Gift Box
  giftBox: {
    title: string;
    subtitle: string;
    revealedHeading: string;
    message: string;
    perks: string[];
    openAgainText: string;
  };

  // Optional Music config (preserved for future use)
  music: {
    songTitle: string;
    artist: string;
    audioSrc: string;
    musicBoxTitle: string;
  };

  // Final Wish Screen ("One Last Wish for You" ending sequence)
  finalScreen: {
    heading: string;
    pauseText: string;
    pauseButtonText: string;
    letterParagraphs: string[];
    signature: string;
    finalPhoto: {
      url: string;
      alt?: string;
      caption: string;
    };
    finalMessage: string;
    replayButtonText: string;
    footerText: string;
    message?: string;
    wishes?: string[];
  };
}

export const birthdayConfig: BirthdayConfig = {
  // 🌸 1. PERSONAL INFORMATION
  name: "Deamon",
  nickname: "Cutie",
  birthdayDate: "Today",
  relationship: "My Favorite Human",

  // 🔐 4-Digit Password Gate (default: '1234')
  secretPassword: "2610",

  // 🐶 2. WELCOME SCREEN
  welcome: {
    greeting: "Hey !! 🎀",
    subGreeting: "I made something special for you... wanna see it? 🥹💗",
    yesButtonText: "YES PLEASE!! 💗",
    noButtonText: "NOPE 🙈",
    noPlayfulResponses: [
      "Excuse me?! I made this just for you 😭💕",
      "Hey! That's illegal! Press YES 🥺🎀",
      "You know you're curious... click YES! 😜✨",
      "Don't do this to me! Look how cute this is 🥹💖",
      "There is literally no other choice! Click YES! 🌸",
    ],
  },

  // 🔐 3. SECRET PASSWORD SCREEN
  passwordScreen: {
    title: "Psst... this is a little secret 🤫",
    subtitle: "Enter your secret code!",
    hintText: "✨ Hint: Try 2 6 1 0 ( magic code)",
    errorMessage: "Hmm... try your secret number again! 🥺",
    successMessage: "YAY! You unlocked it!! 🎉💖",
  },

  // 🎂 4. BIG BIRTHDAY REVEAL
  revealScreen: {
    heading: "HAPPIEST BIRTHDAYYYYY!! 🎂💗",
    subheading: "To my favourite human ✨",
    cakeGreeting: "Make a wish! 🕯️✨",
    buttonText: "OPEN YOUR SURPRISES 💌",
    tagline: "Celebrating another year of your kindness, laughs, and pure magic 🌸",
  },

  // 💌 5. SURPRISE MENU (3 Surprises: Photos, A Small Letter, and Surprise Gift)
  surpriseMenu: {
    heading: "Okay, your little surprises are waiting! 🌸",
    subtitle: "Tap each one to open 💗",
    progressText: "Surprises opened",
    items: {
      camera: {
        title: "Photo Gallery",
        subtitle: "Using 2025 images on your 2026 birthday candid moments & sweet memories 📸",
        badge: "Moments",
      },
      letter: {
        title: "A Small Letter for You",
        subtitle: "Heartfelt, a little funny & straight from me 💌",
        badge: "Open Me",
      },
      gift: {
        title: "Just a digitally wrapped Box",
        subtitle: "A delicate box wrapped just for you 🎁",
        badge: "Surprise!",
      },
      reasons: {
        title: "6 Reasons I Love You",
        subtitle: "Plus 1 little secret thing I hate the most ♡",
        badge: "Confession ♡",
      },
      wish: {
        title: "Make a Birthday Wish",
        subtitle: "A tradition we can't skip: blow your candle! 🕯️✨",
        badge: "Wish Time 🎂",
      },
    },
    finishButtonText: "SEE FINAL WISH ✨",
  },

  // 📸 6. PHOTO GALLERY
  gallery: {
    title: "Memories in Pictures 🌸",
    subtitle: "A little collection of moments, laughs & memories ✨",
    photos: [
      {
        id: 1,
        url: "/images/photo1.jpg",
        caption: "Partners in crime & laughing till it hurts! 🌸",
        rotation: -2,
        sticker: "🌸",
        placeholderBg: "#FCE7F3",
        placeholderIllustration: "selfie",
      },
      {
        id: 2,
        url: "/images/photo2.jpg",
        caption: "A book worm✨",
        date: "A professional page turner ✨",
        rotation: 2,
        sticker: "🌼",
        placeholderBg: "#FEF9C3",
        placeholderIllustration: "laughing",
      },
      {
        id: 3,
        url: "/images/photo3.jpg",
        caption: "Got no caption for this one",
        date: "A sweet Memory",
        rotation: -1.5,
        sticker: "🌷",
        placeholderBg: "#E0E7FF",
        placeholderIllustration: "cafe",
      },
      {
        id: 4,
        url: "/images/photo4.jpg",
        caption: "Looking radiant & effortlessly gorgeous 👑✨",
        date: "Pure sunshine no doubt",
        rotation: 2.5,
        sticker: "💖",
        placeholderBg: "#EDE9FE",
        placeholderIllustration: "celebrate",
      },
      {
        id: 5,
        url: "/images/photo5.jpg",
        caption: "umm looking fineshit in glasses 😂",
        date: "A random picture of yours",
        rotation: -2,
        sticker: "🌿",
        placeholderBg: "#FEF08A",
        placeholderIllustration: "beach",
      },
      {
        id: 6,
        url: "/images/photo6.jpg",
        caption: "Grateful for every single moment together 💫",
        date: "Always & forever",
        rotation: 1,
        sticker: "💌",
        placeholderBg: "#FBCFE8",
        placeholderIllustration: "journey",
      },
    ],
  },

  // 💌 7. A SMALL LETTER FOR YOU
  letter: {
    title: "A Small Letter for You 💌",
    subtitle: "Heartfelt words, straight from my heart",
    salutation: "Dear Deamon,",
    paragraphs: [
      "Happy Birthday to the one who will always have a special place in my heart. 🎂✨",
      "Today is all about celebrating you — the person who made my life brighter in so many beautiful ways. I truly hope this new year brings you endless happiness, good health, success, and countless reasons to smile.",
      "No matter how life changes or where it takes us, I'll always be grateful for every memory we shared. You've been my support system, my cheerleader, my constant, and my safe place. Thank you for being there through thick and thin, for understanding me even when I couldn't explain myself, and for making every moment more meaningful just by being in it.",
      "You deserve a life filled with love, peace, and dreams that come true. May you always be surrounded by people who value you, inspire you, and bring out the best in you — just like you do for everyone around you.",
      "Seeing you happy will always make my heart happy too. 💗",
      "Thank you for being someone I'll never forget. You're truly one of a kind and so incredibly special.",
      "May your birthday be as kind, beautiful, and amazing as your soul.",
      "Keep smiling, keep shining, and never stop believing in yourself. You are capable of achieving so much, and I'll always be rooting for you in everything you do.",
      "Happy Birthday. I'll always wish the very best for you, today and always. 🌸",
    ],
    signOff: "With so much love,",
    sender: "Your favorite person 🌷",
  },


  // 🎁 8. GIFT BOX
  giftBox: {
    title: "A Little Surprise Present 🎁",
    subtitle: "Untie the ribbon to see what's inside!",
    revealedHeading: "A Little Reminder For You 🌸",
    message:
      "Your presence brings so much warmth and light to everyone around you. Thank you for just being you. Here's to more laughter, gentle peaceful days, fun memories, and another wonderful year celebrating you. 💗",
    perks: [
      "☕ Lifetime pass for Yapping with you",
      "🛋️ 24/7 hotline for venting, laughs & comfort",
      "🌸 Endless support for all your dreams & goals",
      "✨ A loyal friend who will always have your back!",
    ],
    openAgainText: "WRAP IT UP & OPEN AGAIN 🎀",
  },

  // 🎵 Optional Music
  music: {
    songTitle: "Just a melody 🎵",
    artist: "Digitally wishing you happy birthday!!",
    audioSrc: "/music/birthday-song.mp3",
    musicBoxTitle: "Dreamy Music Box - Happy Birthday",
  },

  // ✨ 9. FINAL SCREEN: "ONE LAST WISH FOR YOU" ENDING SEQUENCE
  finalScreen: {
    heading: "One Last Wish for You 🌸",
    pauseText: "And if I could make one wish for you…",
    pauseButtonText: "There's something I want you to know ♡",
    letterParagraphs: [
      "I hope this year brings you the kind of happiness that stays, the kind of peace that makes everything feel lighter, and the courage to follow the dreams you sometimes keep to yourself. I hope you find little reasons to smile on ordinary days, people who understand you without needing too many words, and moments that remind you how special life can be.",
      "And whenever life gets a little difficult, I hope you remember that you don't have to have everything figured out. You're allowed to grow at your own pace, to make mistakes, and to begin again.",
      "More than anything, I hope you always find reasons to be kind to yourself. You deserve beautiful things, genuine happiness, and memories that make you smile long after they happen.",
      "Happy Birthday, you. I'm really glad this world has you in it. ♡",
    ],
    signature: "With lots of love, always ♡",
    finalPhoto: {
      url: "/images/final-memory.jpg",
      alt: "A treasured memory",
      caption: "One more memory for our little collection ♡",
    },
    finalMessage: "No matter how many birthdays come and go, I'm glad this world has you in it. ♡",
    replayButtonText: "Replay the surprise ↺",
    footerText: "Made with love, just for you 🌸",
    message:
      "May this new chapter bring you beautiful memories, peaceful days, exciting adventures, and all the happiness you deserve.",
    wishes: [
      "May your days be filled with warmth, quiet peace & sunshine 🌸",
      "May every dream you hold close find its way to you 🕊️",
      "May you always remember how deeply appreciated you are ✨",
    ],
  },
};
