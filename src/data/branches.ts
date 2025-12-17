// CCC Light (Imole) International Parish - All Branches Data

export interface Branch {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  isHeadquarters: boolean;
  address: {
    full: string;
    city: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  shepherd: {
    name: string;
    title: string;
    image?: string;
  };
  socials: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
  logo?: string; // Will be updated with actual branch logos
  image?: string; // Branch building image
}

export const branches: Branch[] = [
  {
    id: "alagbado-hq",
    name: "CCC Light International Parish (Headquarters)",
    shortName: "Alagbado HQ",
    slug: "alagbado",
    isHeadquarters: true,
    address: {
      full: "Pole 6, Nureni Yusuff Lane, Alagbado, Lagos",
      city: "Lagos",
      country: "Nigeria",
    },
    contact: {
      phone: "+234 703 504 1566",
      email: "ccclightinternationalparish@gmail.com",
    },
    shepherd: {
      name: "Sup Evang FA Alebiosu (JP)",
      title: "General Overseer",
    },
    socials: {
      facebook: "https://www.facebook.com/ImoleGlobalMediaccc/about",
      youtube: "https://www.youtube.com/@CCCLIGHTINTERNATIONAL",
    },
  },
  {
    id: "ajman-uae",
    name: "CCC Light International Parish Ajman",
    shortName: "Ajman, UAE",
    slug: "ajman",
    isHeadquarters: false,
    address: {
      full: "1306 B1 Falcon Tower, Ajman, UAE",
      city: "Ajman",
      country: "United Arab Emirates",
    },
    contact: {
      phone: "+971 52 111 8937",
      email: "ccclightinternationalparish@gmail.com",
    },
    shepherd: {
      name: "Snr Evang Ayomide Adebayo",
      title: "Shepherd In Charge",
    },
    socials: {
      facebook: "https://www.facebook.com/groups/423275412593038",
      instagram: "https://www.instagram.com/ccclightintparishajman_uae/",
      youtube: "https://tr.ee/uelEbne4VE",
    },
  },
  {
    id: "abudhabi-uae",
    name: "CCC Light International Parish Abu Dhabi",
    shortName: "Abu Dhabi, UAE",
    slug: "abudhabi",
    isHeadquarters: false,
    address: {
      full: "Flat 2402 ADCP Owabi Electra Street, Abu Dhabi, UAE",
      city: "Abu Dhabi",
      country: "United Arab Emirates",
    },
    contact: {
      phone: "+971 52 111 8937",
      email: "Imoleparish3@gmail.com",
    },
    shepherd: {
      name: "Snr Evang Tosin Adebanjo",
      title: "Shepherd In Charge",
    },
    socials: {
      facebook: "https://www.facebook.com/CCClightintparishUAE/",
      instagram: "https://www.instagram.com/ccclightintl_abudhabi/",
    },
  },
  {
    id: "ikorodu",
    name: "CCC Light International Parish Ikorodu",
    shortName: "Ikorodu",
    slug: "ikorodu",
    isHeadquarters: false,
    address: {
      full: "Pipeline Bus Stop, Isiwu, Ikorodu",
      city: "Ikorodu",
      country: "Nigeria",
    },
    contact: {
      phone: "+234 703 504 1566",
      email: "ccclightinternationalparish@gmail.com",
    },
    shepherd: {
      name: "Asst. Sup. Evang. Toluwalase Adebiyi",
      title: "Shepherd In Charge",
    },
    socials: {
      facebook: "https://www.facebook.com/ImoleGlobalMediaccc/about",
      youtube: "https://www.youtube.com/@CCCLIGHTINTERNATIONAL",
    },
  },
  {
    id: "georgia",
    name: "CCC Light International Parish Georgia",
    shortName: "Georgia",
    slug: "georgia",
    isHeadquarters: false,
    address: {
      full: "No 3, Batumi Street, Tbilisi, Georgia",
      city: "Tbilisi",
      country: "Georgia",
    },
    contact: {
      phone: "+971 521 966 115",
      email: "ccclightinternationalparish@gmail.com",
    },
    shepherd: {
      name: "Shepherd In Charge",
      title: "Shepherd In Charge",
    },
    socials: {
      instagram: "https://www.instagram.com/ccc_lightparishgeorgia/",
    },
  },
  {
    id: "mosa",
    name: "CCC Light International Parish Mosa",
    shortName: "Mosa",
    slug: "mosa",
    isHeadquarters: false,
    address: {
      full: "Mosa Iyana Ilogbo, Ogun State",
      city: "Mosa",
      country: "Nigeria",
    },
    contact: {
      phone: "+234 703 504 1566",
      email: "ccclightinternationalparish@gmail.com",
    },
    shepherd: {
      name: "Sup Evang Joseph Oladele",
      title: "Shepherd In Charge",
    },
    socials: {},
  },
];

export const getHeadquarters = () => branches.find(b => b.isHeadquarters);
export const getBranchBySlug = (slug: string) => branches.find(b => b.slug === slug);
export const getBranchById = (id: string) => branches.find(b => b.id === id);

// CCC Service Times (same across all branches)
export interface ServiceTime {
  day: string;
  time: string;
  type: string;
  description: string;
  accent: string;
  bgGradient: string;
  iconGradient: string;
  glowColor: string;
  featured?: boolean;
}

export const serviceTimes: ServiceTime[] = [
  {
    day: "Tuesday",
    time: "9:00 AM",
    type: "Breaking Yokes of Bondage",
    description: "Powerful morning service for spiritual deliverance and breaking of generational bondages.",
    accent: "hsl(15, 70%, 50%)",
    bgGradient: "from-orange-500/20 to-red-600/10",
    iconGradient: "from-orange-500 to-red-600",
    glowColor: "rgba(249,115,22,0.3)",
  },
  {
    day: "Wednesday",
    time: "9:00 AM",
    type: "Seekers Service",
    description: "Service for those seeking favor from the Lord. A time of intercession and spiritual breakthrough.",
    accent: "hsl(160, 60%, 45%)",
    bgGradient: "from-emerald-500/20 to-teal-600/10",
    iconGradient: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16,185,129,0.3)",
  },
  {
    day: "Wednesday",
    time: "6:00 PM",
    type: "Mercy Day",
    description: "Evening mercy service for divine intervention and blessings. Experience God's boundless mercy.",
    accent: "hsl(200, 70%, 50%)",
    bgGradient: "from-blue-500/20 to-cyan-600/10",
    iconGradient: "from-blue-500 to-cyan-600",
    glowColor: "rgba(59,130,246,0.3)",
  },
  {
    day: "Friday",
    time: "3:00 PM",
    type: "Pregnant Women Service",
    description: "Special service dedicated to expectant mothers, seeking divine protection and safe delivery.",
    accent: "hsl(330, 65%, 55%)",
    bgGradient: "from-pink-500/20 to-rose-600/10",
    iconGradient: "from-pink-500 to-rose-600",
    glowColor: "rgba(236,72,153,0.3)",
  },
  {
    day: "Friday",
    time: "6:00 PM",
    type: "Power Day Service",
    description: "A night of spiritual empowerment and prophetic declarations. Come receive divine power.",
    accent: "hsl(263, 70%, 58%)",
    bgGradient: "from-violet-500/20 to-purple-600/10",
    iconGradient: "from-violet-500 to-purple-600",
    glowColor: "rgba(139,92,246,0.3)",
  },
  {
    day: "Sunday",
    time: "10:00 AM",
    type: "Lord's Day Service",
    description: "The flagship divine worship with hymns, prophetic declarations, and powerful sermons. All are welcome.",
    accent: "hsl(43, 74%, 49%)",
    bgGradient: "from-gold/25 to-amber-500/15",
    iconGradient: "from-amber-500 to-yellow-500",
    glowColor: "rgba(212,175,55,0.4)",
    featured: true,
  },
  {
    day: "First Thursday",
    time: "10:00 PM",
    type: "New Moon Service",
    description: "Monthly vigil based on Ezekiel 46:1-6. A sacred night of deep intercession until dawn.",
    accent: "hsl(220, 65%, 50%)",
    bgGradient: "from-indigo-500/20 to-blue-600/10",
    iconGradient: "from-indigo-500 to-blue-600",
    glowColor: "rgba(99,102,241,0.3)",
  },
];

// CCC Annual Events/Festivals
export interface AnnualEvent {
  id: string;
  name: string;
  month: string;
  description: string;
  significance: string;
}

export const annualEvents: AnnualEvent[] = [
  {
    id: "founder-birthday",
    name: "Founder's Birthday Celebration",
    month: "September 29",
    description: "Celebration of the birth of Pastor Founder S.B.J. Oshoffa",
    significance: "Honoring the divine vessel through whom CCC was established",
  },
  {
    id: "annual-harvest",
    name: "Annual Harvest Thanksgiving",
    month: "December",
    description: "Grand thanksgiving harvest celebration across all parishes",
    significance: "Gratitude to God for blessings throughout the year",
  },
  {
    id: "holy-week",
    name: "Holy Week & Easter",
    month: "March/April",
    description: "Passion Week services culminating in Easter celebration",
    significance: "Commemoration of Christ's death and resurrection",
  },
  {
    id: "divine-mercy",
    name: "Divine Mercy Sunday",
    month: "April",
    description: "Special mercy service on the Sunday after Easter",
    significance: "Celebration of God's infinite mercy",
  },
  {
    id: "pentecost",
    name: "Pentecost/Whitsunday",
    month: "May/June",
    description: "Celebration of the descent of the Holy Spirit",
    significance: "Commemoration of the birth of the Church",
  },
  {
    id: "church-anniversary",
    name: "Church Anniversary",
    month: "September",
    description: "Annual celebration of the founding of CCC (September 1947)",
    significance: "Thanksgiving for the establishment of the celestial ark",
  },
  {
    id: "christmas",
    name: "Christmas Celebration",
    month: "December 25",
    description: "Celebration of the birth of Jesus Christ",
    significance: "The incarnation of our Lord and Savior",
  },
  {
    id: "crossover",
    name: "Cross Over Night",
    month: "December 31",
    description: "Year-end vigil and transition into the new year",
    significance: "Thanksgiving and prayers for divine guidance in the coming year",
  },
];
