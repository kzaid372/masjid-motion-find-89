
// Dummy data for fallback when backend is unavailable

export const dummyMasjids = [
  {
    _id: "1",
    name: "Al-Noor Mosque",
    address: "123 Islamic Way, New York, NY 10001",
    distance: "1.2 km",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1545167496-28be8f7a29e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Al-Noor Mosque serves as a vibrant community center with daily prayers, Quran classes, and regular community events. The mosque welcomes Muslims from all backgrounds.",
    facilities: ['Parking', 'Wudhu Area', 'Women Section'],
    location: {
      type: "Point",
      coordinates: [-74.0060, 40.7128]
    },
    nextPrayer: {
      name: 'Asr',
      time: '4:30 PM',
    },
    prayerTimes: {
      fajr: '5:30 AM',
      dhuhr: '1:00 PM',
      asr: '4:30 PM',
      maghrib: '7:15 PM',
      isha: '8:45 PM',
      jummah: '1:30 PM'
    }
  },
  {
    _id: "2",
    name: "Masjid Al-Rahman",
    address: "456 Faith Street, New York, NY 10002",
    distance: "2.5 km",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1542379653-b926a529191d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Masjid Al-Rahman is known for its beautiful architecture and spacious prayer halls. The mosque provides educational programs and social services to the community.",
    facilities: ['Library', 'Prayer Mats', 'AC'],
    location: {
      type: "Point",
      coordinates: [-74.0059, 40.7125]
    },
    nextPrayer: {
      name: 'Asr',
      time: '4:35 PM',
    },
    prayerTimes: {
      fajr: '5:25 AM',
      dhuhr: '1:05 PM',
      asr: '4:35 PM',
      maghrib: '7:10 PM',
      isha: '8:40 PM',
      jummah: '1:20 PM'
    }
  },
  {
    _id: "3",
    name: "Islamic Center",
    address: "789 Deen Avenue, New York, NY 10003",
    distance: "3.0 km",
    rating: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1609158762357-c6f0c931ace5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "The Islamic Center combines modern facilities with traditional Islamic values. It offers a wide range of activities including youth programs and interfaith dialogues.",
    facilities: ['Quran Classes', 'Cafe', 'Wheelchair Access'],
    location: {
      type: "Point",
      coordinates: [-74.0065, 40.7135]
    },
    nextPrayer: {
      name: 'Asr',
      time: '4:32 PM',
    },
    prayerTimes: {
      fajr: '5:20 AM',
      dhuhr: '1:10 PM',
      asr: '4:32 PM',
      maghrib: '7:12 PM',
      isha: '8:50 PM',
      jummah: '1:15 PM'
    }
  },
  {
    _id: "4",
    name: "Masjid Al-Taqwa",
    address: "321 Peace Boulevard, New York, NY 10004",
    distance: "3.8 km",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1581451931630-5dd7c2b0216f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Masjid Al-Taqwa is dedicated to serving the Muslim community with a focus on education and spiritual growth. The mosque offers regular Quran and Islamic studies classes.",
    facilities: ['Women Section', 'Children Area', 'Parking'],
    location: {
      type: "Point",
      coordinates: [-74.0050, 40.7115]
    },
    nextPrayer: {
      name: 'Asr',
      time: '4:33 PM',
    },
    prayerTimes: {
      fajr: '5:22 AM',
      dhuhr: '1:08 PM',
      asr: '4:33 PM',
      maghrib: '7:11 PM',
      isha: '8:47 PM',
      jummah: '1:25 PM'
    }
  },
  {
    _id: "5",
    name: "Masjid Al-Furqan",
    address: "555 Guidance Street, New York, NY 10005",
    distance: "4.5 km",
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1584551246679-8e965f759e32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Masjid Al-Furqan features a beautiful prayer hall and offers five daily prayers as well as Jummah services. The community is known for its warm and welcoming atmosphere.",
    facilities: ['Library', 'Wudhu Area', 'Wheelchair Access'],
    location: {
      type: "Point",
      coordinates: [-74.0090, 40.7145]
    },
    nextPrayer: {
      name: 'Asr',
      time: '4:35 PM',
    },
    prayerTimes: {
      fajr: '5:28 AM',
      dhuhr: '1:07 PM',
      asr: '4:35 PM',
      maghrib: '7:13 PM',
      isha: '8:48 PM',
      jummah: '1:28 PM'
    }
  }
];

export const dummyMasjidDetails = [
  {
    _id: "1",
    name: "Al-Noor Mosque",
    address: "123 Islamic Way, New York, NY 10001",
    email: "contact@alnoormasjid.org",
    phone: "+1 (212) 555-1234",
    website: "https://www.alnoormasjid.org",
    description: "Al-Noor Mosque serves as a vibrant community center with daily prayers, Quran classes, and regular community events. The mosque welcomes Muslims from all backgrounds and provides a peaceful environment for worship and community gathering. Founded in 1985, it has been serving the local Muslim community for decades and continues to expand its programs and facilities.",
    rating: 4.5,
    reviewCount: 87,
    imageUrl: "https://images.unsplash.com/photo-1545167496-28be8f7a29e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585129918930-80dee053a029?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559125148-869baf517c9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508036927137-36b403ba3959?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    facilities: [
      'Parking',
      'Wudhu Area',
      'Women Section',
      'Library',
      'Children Area',
      'Quran Classes',
      'Wheelchair Access'
    ],
    prayerTimes: {
      fajr: '5:30 AM',
      dhuhr: '1:00 PM',
      asr: '4:30 PM',
      maghrib: '7:15 PM',
      isha: '8:45 PM',
      jummah: '1:30 PM'
    },
    location: {
      type: "Point",
      coordinates: [-74.0060, 40.7128]
    },
    distance: "1.2 km",
    programs: [
      {
        name: "Weekly Quran Circle",
        description: "Join us every Wednesday for Quran recitation and tafsir.",
        day: "Wednesday",
        time: "8:00 PM - 9:30 PM"
      },
      {
        name: "Weekend Islamic School",
        description: "Islamic education for children ages 5-15.",
        day: "Saturday",
        time: "10:00 AM - 1:00 PM"
      },
      {
        name: "Monthly Community Dinner",
        description: "A time for the community to gather and share a meal together.",
        day: "First Saturday",
        time: "6:30 PM - 8:30 PM"
      }
    ],
    socialMedia: {
      facebook: "https://facebook.com/alnoormasjid",
      instagram: "https://instagram.com/alnoormasjid",
      twitter: "https://twitter.com/alnoormasjid"
    }
  },
  {
    _id: "2",
    name: "Masjid Al-Rahman",
    address: "456 Faith Street, New York, NY 10002",
    email: "info@masjid-alrahman.org",
    phone: "+1 (212) 555-5678",
    website: "https://www.masjid-alrahman.org",
    description: "Masjid Al-Rahman is known for its beautiful architecture and spacious prayer halls. The mosque provides educational programs and social services to the community. Established in 1990, Masjid Al-Rahman has been a cornerstone of the Muslim community, offering a range of services from daily prayers to community outreach programs.",
    rating: 4.8,
    reviewCount: 124,
    imageUrl: "https://images.unsplash.com/photo-1542379653-b926a529191d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1626958390936-162ecc49eb77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513072349613-ab0d7e37b8d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607607004696-7ede9649d815?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    facilities: [
      'Library',
      'Prayer Mats',
      'AC',
      'Women Section',
      'Parking',
      'Islamic School',
      'Funeral Services'
    ],
    prayerTimes: {
      fajr: '5:25 AM',
      dhuhr: '1:05 PM',
      asr: '4:35 PM',
      maghrib: '7:10 PM',
      isha: '8:40 PM',
      jummah: '1:20 PM'
    },
    location: {
      type: "Point",
      coordinates: [-74.0059, 40.7125]
    },
    distance: "2.5 km",
    programs: [
      {
        name: "Daily Quran Classes",
        description: "Learn Quran recitation and tajweed rules with qualified teachers.",
        day: "Monday to Thursday",
        time: "7:00 PM - 8:30 PM"
      },
      {
        name: "Islamic Studies Circle",
        description: "Deep discussions on Islamic jurisprudence and theology.",
        day: "Friday",
        time: "7:30 PM - 9:00 PM"
      },
      {
        name: "Youth Program",
        description: "Activities and education designed for Muslim youth.",
        day: "Sunday",
        time: "4:00 PM - 6:00 PM"
      }
    ],
    socialMedia: {
      facebook: "https://facebook.com/alrahmanmasjid",
      instagram: "https://instagram.com/alrahmanmasjid",
      youtube: "https://youtube.com/alrahmanmasjid"
    }
  }
];

export const dummyReviews = [
  {
    _id: "r1",
    masjidId: "1",
    userId: "u1",
    rating: 5,
    text: "Excellent facilities and a very welcoming community. The prayer hall is spacious and clean. I particularly enjoyed the Friday khutbah which was both enlightening and relevant to contemporary issues.",
    createdAt: "2023-09-15T08:30:00Z",
    user: {
      displayName: "Ahmed Ali",
      photoURL: null
    }
  },
  {
    _id: "r2",
    masjidId: "1",
    userId: "u2",
    rating: 4,
    text: "A beautiful masjid with good facilities. The prayer areas are well-maintained and the atmosphere is peaceful. The only downside is limited parking during Jummah prayers.",
    createdAt: "2023-08-21T14:15:00Z",
    user: {
      displayName: "Fatima Hassan",
      photoURL: null
    }
  },
  {
    _id: "r3",
    masjidId: "1",
    userId: "u3",
    rating: 5,
    text: "MashaAllah! This masjid has been a spiritual home for me since I moved to the area. The Islamic classes they offer are excellent and the community is very supportive.",
    createdAt: "2023-07-10T11:45:00Z",
    user: {
      displayName: "Omar Khan",
      photoURL: null
    }
  },
  {
    _id: "r4",
    masjidId: "2",
    userId: "u4",
    rating: 5,
    text: "One of the best masjids I've visited. The facilities are modern and the prayer hall is beautifully designed. The imam's khutbahs are always insightful and delivered in both Arabic and English.",
    createdAt: "2023-09-05T09:20:00Z",
    user: {
      displayName: "Zaynab Ahmed",
      photoURL: null
    }
  },
  {
    _id: "r5",
    masjidId: "2",
    userId: "u5",
    rating: 4,
    text: "Great masjid with a friendly community. They organize frequent events for youth which is much appreciated. The only suggestion would be to improve the women's section facilities.",
    createdAt: "2023-08-12T16:30:00Z",
    user: {
      displayName: "Ibrahim Mohammad",
      photoURL: null
    }
  }
];
