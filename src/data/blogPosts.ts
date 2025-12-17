export interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: string;
  status: 'draft' | 'published';
  publishedAt: Date;
  externalLinks?: { label: string; url: string }[];
}

// Using public image paths that work reliably
export const blogPosts: BlogPostData[] = [
  {
    id: "imole-global-mission",
    title: "CCC Light International: Spreading Divine Light Across 6 Nations",
    slug: "imole-global-mission-2024",
    content: `
      <h2>A Global Vision for Celestial Worship</h2>
      <p>CCC Light International Parish (Imole) stands as a beacon of celestial faith, spreading the divine light of Christ across 6 parishes in Nigeria, UAE, and Georgia. Under the leadership of Sup. Evang. FA Alebiosu (JP), our mission transcends borders.</p>
      
      <h3>Our Global Presence</h3>
      <p>From our headquarters in Alagbado, Lagos to the vibrant communities in Ajman, Abu Dhabi, and Tbilisi, CCC Light International unites believers across continents in celestial worship and spiritual growth.</p>
      
      <h3>The Imole Vision</h3>
      <p>"Imole" means "Light" in Yoruba, and our mission is to be that light to the nations. Every service, every prayer, every outreach program reflects our commitment to illuminating lives with the gospel of Christ.</p>
      
      <h3>Join Our Global Family</h3>
      <p>Whether you're in Nigeria, the UAE, or Georgia, there's a CCC Light parish waiting to welcome you home. Experience the warmth of celestial fellowship and the power of united worship.</p>
    `,
    excerpt: "CCC Light International Parish (Imole) spreads celestial faith across 6 parishes in Nigeria, UAE, and Georgia under divine leadership.",
    featuredImage: "/church-interior.jpg",
    category: "Church News",
    tags: ["Global Mission", "CCC Light", "Imole", "International"],
    author: "CCC Light Media Team",
    status: "published",
    publishedAt: new Date("2024-12-06T12:00:00"),
  },
  {
    id: "general-overseer-message",
    title: "A Message from the General Overseer: Walking in Divine Light",
    slug: "general-overseer-welcome-message",
    content: `
      <h2>Greetings in the Precious Name of Our Lord Jesus Christ</h2>
      <p>My beloved brethren across all our 6 parishes worldwide, I bring you greetings from the throne of grace. As your General Overseer, it fills my heart with joy to see how God has expanded our reach from Lagos to the UAE and Georgia.</p>
      
      <h3>The Journey of Light</h3>
      <p>When we started this mission, we knew God had a greater plan. Today, CCC Light International Parish stands as a testimony to His faithfulness—reaching souls across continents and transforming lives through celestial worship.</p>
      
      <h3>Our Sacred Calling</h3>
      <p>We are called to be the light of the world. Through our services, outreach programs, and community initiatives, we continue to fulfill this divine mandate in every nation where we are planted.</p>
      
      <h3>An Invitation to All</h3>
      <p>I warmly invite everyone—members and seekers alike—to experience the divine presence in any of our parishes. May the light of Christ guide your path always.</p>
      
      <p><em>Grace and peace be multiplied unto you.</em></p>
    `,
    excerpt: "The General Overseer of CCC Light International shares an inspiring message to the global congregation.",
    featuredImage: "/church-interior.jpg",
    category: "Pastoral Message",
    tags: ["General Overseer", "Welcome", "Spiritual", "Leadership"],
    author: "Sup. Evang. FA Alebiosu (JP)",
    status: "published",
    publishedAt: new Date("2024-12-06T11:00:00")
  },
  {
    id: "worship-experience",
    title: "The CCC Light Worship Experience: Where Heaven Meets Earth",
    slug: "worship-experience-ccc-light",
    content: `
      <h2>A Unique Spiritual Journey</h2>
      <p>At CCC Light International Parish, worship is more than singing—it's an encounter with the divine. Our services blend traditional Celestial Church elements with contemporary expressions of faith.</p>
      
      <h3>Service Schedule</h3>
      <p>Join us for powerful worship experiences throughout the week: Sunday Morning Service, Tuesday Morning Prayer, Wednesday Seekers Service, Wednesday Mercy Day, and Friday Power Day.</p>
      
      <h3>The Celestial Difference</h3>
      <p>Our worship incorporates the rich heritage of the Celestial Church of Christ—prophetic ministrations, celestial hymns, and Spirit-led services that draw believers into God's presence.</p>
      
      <h3>Experience It Yourself</h3>
      <p>Whether you're at our Lagos headquarters or any of our international parishes, you'll find the same anointing, the same commitment to excellence, and the same heart for souls.</p>
    `,
    excerpt: "Discover the unique worship experience at CCC Light International Parish where tradition meets spiritual power.",
    featuredImage: "/church-interior.jpg",
    category: "Features",
    tags: ["Worship", "Services", "Experience", "Celestial"],
    author: "CCC Light Media Team",
    status: "published",
    publishedAt: new Date("2024-12-06T10:00:00")
  },
  {
    id: "community-outreach",
    title: "Serving Communities: CCC Light's Global Outreach Programs",
    slug: "community-outreach-programs",
    content: `
      <h2>Faith in Action</h2>
      <p>CCC Light International Parish believes that true faith manifests through service. Across our 6 parishes, we're making tangible differences in communities through various outreach initiatives.</p>
      
      <h3>Education Initiatives</h3>
      <p>From scholarship programs in Nigeria to educational support in our international locations, we're investing in the next generation of leaders.</p>
      
      <h3>Health and Welfare</h3>
      <p>Regular health outreach programs, support for the less privileged, and community welfare initiatives demonstrate our commitment to holistic ministry.</p>
      
      <h3>Youth Empowerment</h3>
      <p>Our youth programs across all parishes focus on skills development, career guidance, and spiritual mentorship—preparing young people for success in life and faith.</p>
      
      <h3>Join the Mission</h3>
      <p>Be part of our community impact. Volunteer, donate, or simply pray with us as we continue to be light in dark places.</p>
    `,
    excerpt: "Explore CCC Light International's community impact through education, health, and youth empowerment programs across 6 nations.",
    featuredImage: "/church-interior.jpg",
    category: "Community",
    tags: ["Community", "Outreach", "Impact", "Youth"],
    author: "CCC Light Welfare Committee",
    status: "published",
    publishedAt: new Date("2024-12-06T08:00:00")
  },
  {
    id: "upcoming-events",
    title: "50th Harvest Celebration: A Golden Jubilee of Faith",
    slug: "50th-harvest-celebration-2024",
    content: `
      <h2>Celebrating 50 Years of Divine Harvest</h2>
      <p>CCC Light International Parish invites you to our historic 50th Harvest Celebration—a golden jubilee of thanksgiving, praise, and abundant blessings.</p>
      
      <h3>A Milestone of Faith</h3>
      <p>This harvest celebration marks 50 years of God's faithfulness to our ministry. From humble beginnings to a global presence across 6 nations, we have much to give thanks for.</p>
      
      <h3>Join the Celebration</h3>
      <p>All our parishes worldwide will participate in this momentous occasion. Whether in Lagos, Ajman, Abu Dhabi, Ikorodu, Tbilisi, or Mosa, join us in celebrating God's abundant provision.</p>
      
      <h3>A Time of Giving</h3>
      <p>The harvest is a season of generosity. As we celebrate, we also commit to giving back—supporting our community initiatives and expanding our reach to more souls.</p>
    `,
    excerpt: "Join CCC Light International for our historic 50th Harvest Celebration—a golden jubilee across all 6 parishes worldwide.",
    featuredImage: "/church-interior.jpg",
    category: "Events",
    tags: ["Harvest", "Celebration", "Anniversary", "Thanksgiving"],
    author: "CCC Light Events Committee",
    status: "published",
    publishedAt: new Date("2024-12-06T09:00:00")
  }
];
