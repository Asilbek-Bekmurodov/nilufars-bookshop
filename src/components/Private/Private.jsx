import {
  FaBell,
  FaBookOpen,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaComments,
  FaEdit,
  FaFire,
  FaHeart,
  FaHome,
  FaRegCalendarAlt,
  FaRegFileAlt,
  FaRegHeart,
  FaRegBookmark,
  FaRegStar,
  FaSearch,
  FaStar,
  FaTrophy,
  FaUser,
  FaUserCircle,
  FaUserPlus,
} from 'react-icons/fa'
import { GiBookshelf } from 'react-icons/gi'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './Private.module.css'
import { GrLanguage } from 'react-icons/gr'
import { useGetUsersQuery } from '../../app/services/authApi'
import Loader from '../Loader/Loader'

const menuItems = [
  { icon: <FaHome />, label: 'Home' },
  { icon: <FaBookOpen />, label: 'My Library', countKey: 'library' },
  { icon: <FaHeart />, label: 'Favourites', countKey: 'favourites' },
  { icon: <FaUserCircle />, label: 'Profile' },
  { icon: <FaComments />, label: 'Chats', countKey: 'chats' },
  { icon: <FaTrophy />, label: 'Leaderboard' },
]

const categories = [
  ['All', 52],
  ['Fiction', 8],
  ['History', 3],
  ['Psychology', 7],
  ['Philosophy', 9],
  ['Biography', 4],
  ['Self-Help', 12],
]

const filters = ['All', 'Fiction', 'History', 'Psychology', 'Philosophy', 'Biography', 'Self-Help', 'Sci-Fi']

const languages = ['UZB', 'RUS', 'ENG']
const currentGoalYear = new Date().getFullYear()

const books = [
  ['The Great Gatsby', 'F. Scott Fitzgerald', '$12.99', 'Fiction', '#31533f', '#18251e', '#d89b35', 218],
  ['Sapiens', 'Yuval Noah Harari', '$15.99', 'History', '#6a3030', '#311718', '#926e54', 443],
  ['Atomic Habits', 'James Clear', '$14.99', 'Self-Help', '#233848', '#111c25', '#d7bd69', 320],
  ['1984', 'George Orwell', '$10.99', 'Fiction', '#463628', '#18110d', '#ed9924', 328],
  ['Thinking, Fast and Slow', 'Daniel Kahneman', '$16.99', 'Psychology', '#28513c', '#10241a', '#679274', 499],
  ['The Alchemist', 'Paulo Coelho', '$11.99', 'Fiction', '#6a4923', '#241607', '#d4932b', 208],
  ['Educated', 'Tara Westover', '$13.99', 'Biography', '#442456', '#190c22', '#9c73b5', 352],
  ['The Power of Now', 'Eckhart Tolle', '$12.49', 'Philosophy', '#31584f', '#0f2723', '#7eb2a1', 236],
  ['Dune', 'Frank Herbert', '$17.99', 'Sci-Fi', '#4f5230', '#1d2012', '#b5a04d', 688],
  ['To Kill a Mockingbird', 'Harper Lee', '$11.49', 'Fiction', '#622d42', '#241018', '#b46b82', 336],
  ["Man's Search for Meaning", 'Viktor E. Frankl', '$10.49', 'Philosophy', '#293846', '#101923', '#7a8790', 184],
  ['The Midnight Library', 'Matt Haig', '$13.49', 'Fiction', '#202a42', '#0c101d', '#647497', 304],
]

const bookDetails = {
  'The Great Gatsby': {
    age: '15+',
    rating: 4.7,
    vibe: 'Classic, romantic, social drama',
    description: 'A stylish story about ambition, love, money, and the cost of chasing a perfect dream.',
    reviews: ['Beautiful writing and strong atmosphere.', 'Good for readers who like emotional classics.'],
  },
  Sapiens: {
    age: '16+',
    rating: 4.8,
    vibe: 'History, ideas, big-picture nonfiction',
    description: 'A broad look at how humans built societies, beliefs, power, and modern life.',
    reviews: ['Very interesting and easy to follow.', 'Makes history feel connected to today.'],
  },
  'Atomic Habits': {
    age: '13+',
    rating: 4.9,
    vibe: 'Self-growth, practical, motivational',
    description: 'A practical guide to building better habits through small daily changes.',
    reviews: ['Useful advice for real life.', 'Simple examples, strong motivation.'],
  },
  1984: {
    age: '16+',
    rating: 4.6,
    vibe: 'Dystopian, serious, political fiction',
    description: 'A tense novel about control, truth, fear, and the danger of total power.',
    reviews: ['Dark but unforgettable.', 'A book that makes you think deeply.'],
  },
  'Thinking, Fast and Slow': {
    age: '16+',
    rating: 4.5,
    vibe: 'Psychology, thinking, decision-making',
    description: 'An exploration of how people think, judge, choose, and make mistakes.',
    reviews: ['Deep and smart.', 'Best for patient nonfiction readers.'],
  },
  'The Alchemist': {
    age: '12+',
    rating: 4.7,
    vibe: 'Hopeful, philosophical, adventure',
    description: 'A short journey about dreams, signs, courage, and listening to your heart.',
    reviews: ['Simple but inspiring.', 'A warm book for any age.'],
  },
  Educated: {
    age: '16+',
    rating: 4.8,
    vibe: 'Memoir, biography, emotional',
    description: 'A powerful memoir about family, education, identity, and finding your own voice.',
    reviews: ['Very emotional and strong.', 'Feels honest from start to finish.'],
  },
  'The Power of Now': {
    age: '14+',
    rating: 4.4,
    vibe: 'Philosophy, calm, mindful',
    description: 'A reflective book about presence, awareness, and living with less mental noise.',
    reviews: ['Peaceful and thoughtful.', 'Good for slow reading.'],
  },
  Dune: {
    age: '15+',
    rating: 4.9,
    vibe: 'Epic sci-fi, politics, world-building',
    description: 'A huge desert-world story filled with power, prophecy, survival, and strategy.',
    reviews: ['Amazing world-building.', 'Perfect for sci-fi fans.'],
  },
  'To Kill a Mockingbird': {
    age: '14+',
    rating: 4.8,
    vibe: 'Classic, justice, coming-of-age',
    description: 'A moving story about childhood, justice, empathy, and moral courage.',
    reviews: ['Important and touching.', 'Characters stay with you.'],
  },
  "Man's Search for Meaning": {
    age: '16+',
    rating: 4.9,
    vibe: 'Philosophy, memoir, meaning',
    description: 'A short but deep reflection on suffering, hope, and the human need for meaning.',
    reviews: ['Small book, huge impact.', 'Very powerful.'],
  },
  'The Midnight Library': {
    age: '14+',
    rating: 4.6,
    vibe: 'Fiction, emotional, reflective',
    description: 'A story about regret, possible lives, choices, and learning how to want your own life.',
    reviews: ['Creative and emotional.', 'Easy to read, but meaningful.'],
  },
}

const audioBooks = [
  ['AH', 'Atomic Habits', 'Self-Help', '5h 42m', '#31533f', '#12301f'],
  ['S', 'Sapiens', 'History', '12h 13m', '#171d55', '#090b28'],
  ['TA', 'The Alchemist', 'Fiction', '4h 21m', '#6a3030', '#2a0d0d'],
  ['D', 'Dune', 'Sci-Fi', '21h 02m', '#5a390d', '#211100'],
  ['TF', 'Thinking, Fast and Slow', 'Psychology', '20h 05m', '#22283a', '#0b0e17'],
]

const recommendationBooks = [
  ['Ibn Sino Hikmatlari', 'Ibn Sino', 'Ilmi', 'Health and wisdom for curious readers.', '#31584f', '#0f2723', '#7eb2a1', '16+'],
  ['Yulduzlar Siri', 'Mirzo Ulugbek', 'Ilmi', 'Astronomy, discovery, and patient thinking.', '#233848', '#111c25', '#d7bd69', '13+'],
  ['Xamsa', 'Alisher Navoi', 'Lirika', 'Classic poetry with deep human stories.', '#622d42', '#241018', '#b46b82', '16+'],
  ['Ulugbek Xazinasi', 'Odil Yoqubov', 'Tarixiy', 'A historical journey through knowledge and power.', '#6a4923', '#241607', '#d4932b', '16+'],
  ['Shum Bola', "G'afur G'ulom", 'Drama', 'Warm, sharp, and memorable Uzbek prose.', '#4f5230', '#1d2012', '#b5a04d', '12+'],
  ['Dune', 'Frank Herbert', 'Fantastika', 'Epic worlds, politics, and imagination.', '#4f5230', '#1d2012', '#b5a04d', '15+'],
  ['The Great Gatsby', 'F. Scott Fitzgerald', 'Romantika', 'Love, ambition, and a glittering old world.', '#31533f', '#18251e', '#d89b35', '15+'],
  ['Sherlock Holmes', 'Arthur Conan Doyle', 'Detektiv', 'Smart clues and classic mystery cases.', '#463628', '#18110d', '#ed9924', '12+'],
  ['1984', 'George Orwell', 'Fantaziya', 'A tense dystopian story about control and truth.', '#463628', '#18110d', '#ed9924', '16+'],
  ['Sapiens', 'Yuval Noah Harari', 'Tarixiy', 'Human history told with big, clear ideas.', '#6a3030', '#311718', '#926e54', '16+'],
  ['Atomic Habits', 'James Clear', "Ko'rin", 'Practical habits for better daily progress.', '#233848', '#111c25', '#d7bd69', '13+'],
  ['The Alchemist', 'Paulo Coelho', 'Fantaziya', 'A short, hopeful journey about dreams.', '#6a4923', '#241607', '#d4932b', '12+'],
  ['Oltin Zanglamas', 'Shuhrat', 'Drama', 'Character, courage, and difficult choices.', '#442456', '#190c22', '#9c73b5', '15+'],
  ['Kecha va Kunduz', "Abdulhamid Cho'pan", 'Drama', 'A classic story of society and personal fate.', '#28513c', '#10241a', '#679274', '16+'],
  ['Bahor Qaytmaydi', 'Otkir Hoshimov', 'Romantika', 'Tender feelings and the price of memory.', '#202a42', '#0c101d', '#647497', '15+'],
  ['Mehrobdan Chayon', 'Abdulla Qodiriy', 'Tarixiy', 'History, love, and sharp social conflict.', '#6a3030', '#311718', '#926e54', '16+'],
  ['Ikki Eshik Orasi', 'Otkir Hoshimov', 'Drama', 'Family, war, and lives changed by time.', '#31533f', '#18251e', '#d89b35', '16+'],
  ['Qorakoz Majnun', 'Said Ahmad', 'Lirika', 'Short prose with emotional depth.', '#622d42', '#241018', '#b46b82', '13+'],
  ['Harry Potter', 'J. K. Rowling', 'Fantaziya', 'Magic, friendship, and school adventures.', '#171d55', '#090b28', '#647497', '10+'],
  ['Murder on the Orient Express', 'Agatha Christie', 'Detektiv', 'A locked-room mystery with a famous detective.', '#463628', '#18110d', '#ed9924', '12+'],
  ['Foundation', 'Isaac Asimov', 'Fantastika', 'Big science fiction ideas across centuries.', '#233848', '#111c25', '#d7bd69', '15+'],
  ['Jane Eyre', 'Charlotte Bronte', 'Romantika', 'A strong voice, love, and independence.', '#622d42', '#241018', '#b46b82', '14+'],
]

const recommendationDetailBooks = recommendationBooks.map(
  ([title, author, genre, description, from, to, accent, age]) => [
    title,
    author,
    '$12.99',
    genre,
    from,
    to,
    accent,
    260,
    {
      age,
      rating: 4.6,
      vibe: `${genre} janridagi tavsiya qilingan kitob`,
      description,
      reviews: ['Recommendation didimiku, o‘qishga arziydi.', 'Janriga mos, yengil va qiziqarli tanlov.'],
    },
  ],
)

const leaders = [
  ['Alexandra K.', 'AK', 87, '#d49b22'],
  ['Marcus Chen', 'MC', 72, '#a9b0bd'],
  ['Sofia Navarro', 'SN', 65, '#c98542'],
  ['Daniel Reed', 'DR', 58, '#7f5539'],
  ['Maya Karim', 'MK', 52, '#6d5c4d'],
]

const streakDays = [
  ['Mon', 24],
  ['Tue', 35],
  ['Wed', 18],
  ['Thu', 46],
  ['Fri', 52],
  ['Sat', 38],
  ['Sun', 64],
]

const streakRewards = [
  ['3 days', 'Bronze Reader', 3],
  ['7 days', 'Golden Bookmark', 7],
  ['14 days', 'Free audiobook', 14],
  ['30 days', 'Legend badge', 30],
]

const heroContent = {
  Home: {
    eyebrow: 'Good morning, User',
    title: 'What will you read today?',
    text: '12,000+ books across every genre, curated just for you.',
  },
  'My Library': {
    eyebrow: 'Your private shelf',
    title: 'Continue your reading journey',
    text: 'Track saved books, progress, and the titles waiting for you.',
  },
  Favourites: {
    eyebrow: 'Favourite books',
    title: 'The stories you liked most',
    text: 'Your saved favourites stay close whenever you want to return.',
  },
  Profile: {
    eyebrow: 'Reader profile',
    title: 'Shape your personal library',
    text: 'Update your taste, reading goals, and account details here.',
  },
  Chats: {
    eyebrow: 'Book chats',
    title: 'Talk with readers and friends',
    text: 'Discuss books, share recommendations, and keep conversations alive.',
  },
  Leaderboard: {
    eyebrow: 'Reader leaderboard',
    title: 'See your reading rank',
    text: 'Compare progress, monthly pages, and achievements with other readers.',
  },
}

const menuViews = {
  'My Library': {
    title: 'My Library',
    text: 'Saqlangan va o\'qishga belgilangan kitoblaringiz shu yerda turadi.',
  },
  Favourites: {
    title: 'Favourites',
    text: 'Yoqtirgan kitoblaringizni tez topish uchun alohida ro\'yxat.',
  },
  Profile: {
    title: 'Profile',
    text: 'Manage your reader identity, favorite genres, and private account details.',
    stats: [['Name', 'User'], ['Goal', '20 books'], ['Level', 'Active reader']],
  },
  Chats: {
    title: 'Chats',
    text: 'Continue book conversations, share recommendations, and discuss new titles.',
    stats: [['Unread', '3'], ['Groups', '5'], ['Friends', '18']],
  },
  Leaderboard: {
    title: 'Leaderboard',
    text: 'Compare reading progress and see where you stand this month.',
    stats: [['Rank', '#35'], ['Pages', '1208'], ['Streak', '9 days']],
  },
}

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('user')) || null
  } catch {
    return null
  }
}

function readChatInvites() {
  try {
    return JSON.parse(localStorage.getItem('chatInvites')) || []
  } catch {
    return []
  }
}

function readStoredArray(key, fallback = []) {
  try {
    const value = JSON.parse(localStorage.getItem(key))

    return Array.isArray(value) ? value : fallback
  } catch {
    return fallback
  }
}

function saveStoredArray(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function saveChatInvites(invites) {
  localStorage.setItem('chatInvites', JSON.stringify(invites))
}

function getUserId(profile) {
  return String(
    profile?._id ||
      profile?.id ||
      profile?.userId ||
      profile?.uid ||
      profile?.email ||
      profile?.name ||
      '',
  )
}

function getUserName(profile) {
  const fullName = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ')
  return profile?.name || profile?.fullName || fullName || profile?.username || profile?.email || 'Unknown user'
}

function getUserEmail(profile) {
  return profile?.email || profile?.username || 'No email'
}

function getUserInitials(profile) {
  return getUserName(profile)
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function getUsersList(usersData) {
  const candidates = [
    usersData,
    usersData?.users,
    usersData?.user,
    usersData?.data,
    usersData?.data?.users,
    usersData?.data?.user,
    usersData?.data?.data,
    usersData?.result,
    usersData?.result?.users,
    usersData?.payload,
    usersData?.payload?.users,
  ]
  const usersArray = candidates.find((candidate) => Array.isArray(candidate))

  if (usersArray) return usersArray
  if (usersData && typeof usersData === 'object') {
    const objectValues = Object.values(usersData)

    if (objectValues.every((value) => value && typeof value === 'object')) {
      return objectValues
    }
  }

  return []
}

function getUserSearchText(profile) {
  return [
    profile?.name,
    profile?.fullName,
    profile?.firstName,
    profile?.lastName,
    profile?.username,
    profile?.email,
    profile?.phone,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function getNameParts(name = '') {
  const parts = name.trim().split(' ').filter(Boolean)

  return {
    firstName: parts[0] || '',
    lastName: parts.slice(1).join(' ') || '',
  }
}

function getProfileInfo(profile) {
  const nameParts = getNameParts(profile?.name || profile?.fullName || '')

  return {
    firstName:
      profile?.firstName ||
      profile?.first_name ||
      profile?.givenName ||
      nameParts.firstName ||
      'Kitob',
    lastName:
      profile?.lastName ||
      profile?.last_name ||
      profile?.surname ||
      profile?.familyName ||
      nameParts.lastName ||
      '',
    email: profile?.email || 'user@gmail.com',
  }
}

function getAgeNumber(age) {
  const parsedAge = Number(age)
  return Number.isFinite(parsedAge) ? parsedAge : 0
}

function getRecommendationScore(book, user) {
  const [, author, genre, , , , , ageLabel] = book
  const favAuthors = user?.favAuthors || []
  const favGenres = user?.favGenres || []
  const userAge = getAgeNumber(user?.age)
  const minAge = Number.parseInt(ageLabel, 10) || 0
  const genreAliases = {
    fiction: ['fiction', 'fantastika', 'fantaziya', 'drama'],
    history: ['history', 'tarixiy'],
    romance: ['romance', 'romantika'],
    romantic: ['romantic', 'romantika'],
    detective: ['detective', 'detektiv'],
    poetry: ['poetry', 'lirika'],
    science: ['science', 'ilmi'],
    sci: ['sci-fi', 'fantastika', 'ilmi'],
  }
  const normalizedGenre = genre.toLowerCase()
  const normalizedAuthor = author.toLowerCase()
  const genreMatches = favGenres.some((item) => {
    const normalizedItem = item.toLowerCase()
    const aliases = genreAliases[normalizedItem] || [normalizedItem]

    return aliases.includes(normalizedGenre) || normalizedGenre.includes(normalizedItem)
  })
  const authorMatches = favAuthors.some((item) => normalizedAuthor.includes(item.toLowerCase()))

  let score = 0

  if (authorMatches) score += 5
  if (genreMatches) score += 4
  if (userAge && minAge <= userAge) score += 1

  return score
}

function Private() {
  const authUser = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token')
  const user = authUser || readStoredUser()
  const currentUserId = getUserId(user)
  const { data: usersData, isLoading: usersLoading, isError: usersError } = useGetUsersQuery(
    undefined,
    { skip: !token },
  )
  const [activeMenu, setActiveMenu] = useState('Home')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [languageOpen, setLanguageOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBookTitle, setSelectedBookTitle] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('UZB')
  const [recommendationPage, setRecommendationPage] = useState(0)
  const [buddySearch, setBuddySearch] = useState('')
  const [chatInvites, setChatInvites] = useState(() => readChatInvites())
  const [profileInfo, setProfileInfo] = useState(() => getProfileInfo(user))
  const [profileDraft, setProfileDraft] = useState(profileInfo)
  const [profileEditing, setProfileEditing] = useState(false)
  const [interests, setInterests] = useState(['Reading', 'Writing', 'Traveling'])
  const [interestDraft, setInterestDraft] = useState(interests.join(', '))
  const [interestsEditing, setInterestsEditing] = useState(false)
  const [favGenres, setFavGenres] = useState(user?.favGenres || [])
  const [favAuthors, setFavAuthors] = useState(user?.favAuthors || [])
  const [preferencesDraft, setPreferencesDraft] = useState({
    genres: (user?.favGenres || []).join(', '),
    authors: (user?.favAuthors || []).join(', '),
  })
  const [preferencesEditing, setPreferencesEditing] = useState(false)
  const [readingGoal, setReadingGoal] = useState(() => Number(localStorage.getItem('readingGoal')) || 20)
  const [savedBookTitles, setSavedBookTitles] = useState(() =>
    readStoredArray('savedBookTitles', ['Atomic Habits', 'Dune']),
  )
  const [favoriteBookTitles, setFavoriteBookTitles] = useState(() =>
    readStoredArray('favoriteBookTitles', ['The Alchemist']),
  )
  const [completedBookTitles, setCompletedBookTitles] = useState(() =>
    readStoredArray('completedBookTitles', ['The Great Gatsby', 'Sapiens']),
  )
  const recommendationUser = {
    ...(user || {}),
    favGenres,
    favAuthors,
  }
  const recommendationAge = getAgeNumber(recommendationUser.age)
  const recommendedBooks = [...recommendationBooks]
    .filter((book) => {
      const minAge = Number.parseInt(book[7], 10) || 0

      return !recommendationAge || minAge <= recommendationAge
    })
    .map((book) => ({ book, score: getRecommendationScore(book, recommendationUser) }))
    .sort((first, second) => second.score - first.score)
  const recommendationPages = Math.max(Math.ceil(recommendedBooks.length / 4), 1)
  const visibleRecommendations = recommendedBooks.slice(
    recommendationPage * 4,
    recommendationPage * 4 + 4,
  )
  const filteredBooks =
    selectedCategory === 'All' ? books : books.filter((book) => book[3] === selectedCategory)
  const allDetailBooks = [...books, ...recommendationDetailBooks]
  const selectedBook = allDetailBooks.find(([title]) => title === selectedBookTitle)
  const normalizedBookSearch = searchQuery.trim().toLowerCase()
  const directSearchBooks = normalizedBookSearch
    ? books.filter(([title, author, , type]) =>
        `${title} ${author} ${type}`.toLowerCase().includes(normalizedBookSearch),
      )
    : []
  const searchBaseBook = directSearchBooks[0]
  const similarSearchBooks = searchBaseBook
    ? books.filter(([title, , , type]) => title !== searchBaseBook[0] && type === searchBaseBook[3])
    : []
  const savedBooks = books.filter(([title]) => savedBookTitles.includes(title))
  const favoriteBooks = books.filter(([title]) => favoriteBookTitles.includes(title))
  const completedBooks = books.filter(([title]) => completedBookTitles.includes(title))
  const streakCount = Math.max(3, completedBooks.length * 3 + favoriteBooks.length)
  const todayReadMinutes = Math.min(60, 18 + completedBooks.length * 4)
  const todayReadPercent = Math.min(Math.round((todayReadMinutes / 60) * 100), 100)
  const allUsers = getUsersList(usersData)
  const normalizedSearch = buddySearch.trim().toLowerCase()
  const incomingInvites = chatInvites.filter(
    (invite) => invite.to === currentUserId && invite.status === 'pending',
  )
  const notificationCount = incomingInvites.length
  const acceptedBuddyIds = chatInvites
    .filter(
      (invite) =>
        invite.status === 'accepted' &&
        (invite.from === currentUserId || invite.to === currentUserId),
    )
    .map((invite) => (invite.from === currentUserId ? invite.to : invite.from))
  const buddyUsers = allUsers.filter((profile) => acceptedBuddyIds.includes(getUserId(profile)))
  const foundUsers = allUsers.filter((profile) => {
    const profileId = getUserId(profile)
    const haystack = getUserSearchText(profile)

    return (
      profileId &&
      profileId !== currentUserId &&
      !acceptedBuddyIds.includes(profileId) &&
      (!normalizedSearch || haystack.includes(normalizedSearch))
    )
  })
  const shownUsers = normalizedSearch ? foundUsers : foundUsers.slice(0, 6)
  const menuCounts = {
    library: savedBooks.length,
    favourites: favoriteBooks.length,
    chats: buddyUsers.length + incomingInvites.length,
  }
  const pagesRead = completedBooks.reduce((total, book) => total + book[7], 0)
  const progressPercent = Math.min(Math.round((completedBooks.length / readingGoal) * 100), 100)
  const favoriteGenre =
    favoriteBooks[0]?.[3] || favGenres[0] || savedBooks[0]?.[3] || 'Fiction'
  const profileFullName = `${profileInfo.firstName} ${profileInfo.lastName}`.trim()
  const profileInitials = `${profileInfo.firstName[0] || ''}${profileInfo.lastName[0] || ''}`.toUpperCase()
  const chartMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const chartValues = [42, 28, 58, 24, 41, 40, 24, 41, 70, 36, 26, 46]
  const currentHero =
    selectedCategory === 'All'
      ? {
          ...heroContent[activeMenu],
          eyebrow: `Good morning, ${user?.name || 'User'}`,
        }
      : {
          eyebrow: `${selectedCategory} books`,
          title: `Explore ${selectedCategory.toLowerCase()} titles`,
          text: `${filteredBooks.length} selected books from the ${selectedCategory.toLowerCase()} category.`,
        }

  function chooseCategory(category) {
    setSelectedCategory(category)
    setActiveMenu('Home')
    setSelectedBookTitle('')
  }

  function changeRecommendationPage(direction) {
    setRecommendationPage((page) => (page + direction + recommendationPages) % recommendationPages)
  }

  function toggleStoredBook(title, setter, storageKey) {
    setter((currentTitles) => {
      const nextTitles = currentTitles.includes(title)
        ? currentTitles.filter((bookTitle) => bookTitle !== title)
        : [...currentTitles, title]

      saveStoredArray(storageKey, nextTitles)
      return nextTitles
    })
  }

  function openBook(title) {
    setSelectedBookTitle(title)
    setSearchQuery('')
    setSelectedCategory('All')
    setActiveMenu('Home')
  }

  function getSimilarBooks(book) {
    if (!book) return []
    const [title, author, , type] = book

    return allDetailBooks
      .filter(([bookTitle, bookAuthor, , bookType]) => {
        return bookTitle !== title && (bookType === type || bookAuthor === author)
      })
      .slice(0, 4)
  }

  function updateChatInvites(nextInvites) {
    setChatInvites(nextInvites)
    saveChatInvites(nextInvites)
  }

  function getInviteStatus(targetId) {
    const invite = chatInvites.find(
      (item) =>
        item.status === 'pending' &&
        ((item.from === currentUserId && item.to === targetId) ||
          (item.from === targetId && item.to === currentUserId)),
    )

    if (!invite) return ''
    return invite.from === currentUserId ? 'sent' : 'incoming'
  }

  function sendInvite(targetId) {
    if (!currentUserId || !targetId || getInviteStatus(targetId)) return

    updateChatInvites([
      ...chatInvites,
      {
        id: `${currentUserId}-${targetId}`,
        from: currentUserId,
        to: targetId,
        status: 'pending',
      },
    ])
  }

  function acceptInvite(inviteId) {
    updateChatInvites(
      chatInvites.map((invite) =>
        invite.id === inviteId ? { ...invite, status: 'accepted' } : invite,
      ),
    )
  }

  function saveProfileInfo() {
    const nextInfo = {
      firstName: profileDraft.firstName.trim() || profileInfo.firstName,
      lastName: profileDraft.lastName.trim() || profileInfo.lastName,
      email: profileDraft.email.trim() || profileInfo.email,
    }

    setProfileInfo(nextInfo)
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...(user || {}),
        ...nextInfo,
        name: `${nextInfo.firstName} ${nextInfo.lastName}`.trim(),
      }),
    )
    setProfileEditing(false)
  }

  function saveInterests() {
    const nextInterests = interestDraft
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)

    setInterests(nextInterests.length ? nextInterests : interests)
    setInterestsEditing(false)
  }

  function savePreferences() {
    const nextGenres = preferencesDraft.genres
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
    const nextAuthors = preferencesDraft.authors
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)

    setFavGenres(nextGenres)
    setFavAuthors(nextAuthors)
    setRecommendationPage(0)
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...(user || {}),
        ...profileInfo,
        name: profileFullName,
        favGenres: nextGenres,
        favAuthors: nextAuthors,
      }),
    )
    setPreferencesEditing(false)
  }

  function renderProfileView() {
    return (
      <section className={styles.profilePage}>
        <div className={styles.profileTitle}>
          <h1>My Profile</h1>
          <p>Manage your personal information and reading preferences</p>
        </div>

        <div className={styles.profileLayout}>
          <aside className={styles.profileSide}>
            <article className={styles.profileCard}>
              <div className={styles.profileAvatar}>{profileInitials || 'U'}</div>
              <h2>{profileFullName}</h2>
              <p>{profileInfo.email}</p>
              <span>Member since 2024</span>
            </article>

            <article className={styles.interestsCard}>
              <div className={styles.profileCardHead}>
                <h2>Interests & Hobbies</h2>
                <button
                  onClick={() => {
                    setInterestDraft(interests.join(', '))
                    setInterestsEditing((editing) => !editing)
                  }}
                >
                  <FaEdit /> {interestsEditing ? 'Close' : 'Edit'}
                </button>
              </div>

              {interestsEditing ? (
                <div className={styles.interestEditor}>
                  <input
                    value={interestDraft}
                    onChange={(event) => setInterestDraft(event.target.value)}
                    placeholder="Reading, Writing, Traveling"
                  />
                  <button onClick={saveInterests}>Save</button>
                </div>
              ) : (
                <div className={styles.interestTags}>
                  {interests.map((interest) => (
                    <span key={interest}>{interest}</span>
                  ))}
                </div>
              )}
            </article>
          </aside>

          <div className={styles.profileMain}>
            <article className={styles.personalInfoCard}>
              <div className={styles.profileCardHead}>
                <h2>Personal Information</h2>
                <button
                  onClick={() => {
                    setProfileDraft(profileInfo)
                    setProfileEditing((editing) => !editing)
                  }}
                >
                  <FaEdit /> {profileEditing ? 'Close' : 'Edit'}
                </button>
              </div>

              {profileEditing ? (
                <div className={styles.profileForm}>
                  <label>
                    <span>First name</span>
                    <input
                      value={profileDraft.firstName}
                      onChange={(event) =>
                        setProfileDraft((draft) => ({ ...draft, firstName: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    <span>Last name</span>
                    <input
                      value={profileDraft.lastName}
                      onChange={(event) =>
                        setProfileDraft((draft) => ({ ...draft, lastName: event.target.value }))
                      }
                    />
                  </label>
                  <label className={styles.profileWideInput}>
                    <span>Email address</span>
                    <input
                      type="email"
                      value={profileDraft.email}
                      onChange={(event) =>
                        setProfileDraft((draft) => ({ ...draft, email: event.target.value }))
                      }
                    />
                  </label>
                  <button onClick={saveProfileInfo}>Save changes</button>
                </div>
              ) : (
                <div className={styles.profileInfoGrid}>
                  <div>
                    <span>First name</span>
                    <strong>{profileInfo.firstName}</strong>
                  </div>
                  <div>
                    <span>Last name</span>
                    <strong>{profileInfo.lastName}</strong>
                  </div>
                  <div>
                    <span>Email address</span>
                    <strong>{profileInfo.email}</strong>
                  </div>
                </div>
              )}
            </article>

            <article className={styles.preferencesCard}>
              <div className={styles.profileCardHead}>
                <div>
                  <h2>Reading Preferences</h2>
                  <p>Registration paytida tanlangan janr va mualliflar</p>
                </div>
                <button
                  onClick={() => {
                    setPreferencesDraft({
                      genres: favGenres.join(', '),
                      authors: favAuthors.join(', '),
                    })
                    setPreferencesEditing((editing) => !editing)
                  }}
                >
                  <FaEdit /> {preferencesEditing ? 'Close' : 'Edit'}
                </button>
              </div>

              {preferencesEditing ? (
                <div className={styles.preferencesForm}>
                  <label>
                    <span>Favourite genres</span>
                    <input
                      value={preferencesDraft.genres}
                      onChange={(event) =>
                        setPreferencesDraft((draft) => ({ ...draft, genres: event.target.value }))
                      }
                      placeholder="Fiction, Drama, History"
                    />
                  </label>
                  <label>
                    <span>Favourite authors</span>
                    <input
                      value={preferencesDraft.authors}
                      onChange={(event) =>
                        setPreferencesDraft((draft) => ({ ...draft, authors: event.target.value }))
                      }
                      placeholder="Alisher Navoi, Odil Yoqubov"
                    />
                  </label>
                  <button onClick={savePreferences}>Save preferences</button>
                </div>
              ) : (
                <div className={styles.preferenceGroups}>
                  <div>
                    <span>Genres</span>
                    <section>
                      {(favGenres.length ? favGenres : ['Not selected']).map((genre) => (
                        <small key={genre}>{genre}</small>
                      ))}
                    </section>
                  </div>
                  <div>
                    <span>Authors</span>
                    <section>
                      {(favAuthors.length ? favAuthors : ['Not selected']).map((author) => (
                        <small key={author}>{author}</small>
                      ))}
                    </section>
                  </div>
                </div>
              )}
            </article>

            <section className={styles.profileStats}>
              <article className={styles.profileStatCard}>
                <FaBookOpen />
                <b>{completedBooks.length}</b>
                <span>Books Read</span>
              </article>
              <article className={styles.profileStatCard}>
                <FaRegCalendarAlt />
                <b>{completedBooks.length}</b>
                <span>This Month</span>
              </article>
              <article className={`${styles.profileStatCard} ${styles.profileStatDark}`}>
                <FaRegFileAlt />
                <b>{pagesRead.toLocaleString()}</b>
                <span>Pages Read</span>
              </article>
              <article className={styles.profileStatCard}>
                <FaRegStar />
                <b>{favoriteGenre}</b>
                <span>Fav Genre</span>
              </article>
            </section>

            <article className={styles.goalCard}>
              <div className={styles.goalTop}>
              <h2>{currentGoalYear} Reading Goal</h2>
                <span>{progressPercent}% complete</span>
              </div>
              <div className={styles.goalMeta}>
                <b>{completedBooks.length} books read</b>
                <label>
                  Goal:
                  <input
                    type="number"
                    min="1"
                    value={readingGoal}
                    onChange={(event) => {
                      const nextGoal = Math.max(1, Number(event.target.value) || 1)

                      setReadingGoal(nextGoal)
                      localStorage.setItem('readingGoal', String(nextGoal))
                    }}
                  />
                  books
                </label>
              </div>
              <div className={styles.goalProgress}>
                <span style={{ width: `${progressPercent}%` }} />
              </div>
              <div className={styles.goalChart}>
                {chartMonths.map((month, index) => (
                  <div key={month}>
                    <i style={{ height: `${chartValues[index]}px` }} />
                    <span>{month}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    )
  }

  function renderChatsView() {
    return (
      <section className={styles.chatPage}>
        <div className={styles.chatHeader}>
          <span>Chats</span>
          <h1>Find your buddy</h1>
          <p>Ism yoki email yozing, mos userlarni toping va chatga invite yuboring.</p>
        </div>

        <div className={styles.buddySearch}>
          <FaSearch />
          <input
            placeholder="Find your buddy..."
            type="text"
            value={buddySearch}
            onChange={(event) => setBuddySearch(event.target.value)}
          />
        </div>

        {incomingInvites.length > 0 && (
          <section className={styles.invitePanel}>
            <h2>Incoming invites</h2>
            {incomingInvites.map((invite) => {
              const sender = allUsers.find((profile) => getUserId(profile) === invite.from)

              return (
                <article className={styles.userRow} key={invite.id}>
                  <div className={styles.userAvatar}>{getUserInitials(sender)}</div>
                  <div>
                    <h3>{getUserName(sender)}</h3>
                    <p>{getUserEmail(sender)}</p>
                  </div>
                  <button onClick={() => acceptInvite(invite.id)}>
                    <FaCheck /> Accept
                  </button>
                </article>
              )
            })}
          </section>
        )}

        <section className={styles.chatLayout}>
          <div className={styles.userList}>
            <div className={styles.chatSectionTitle}>
              <h2>Search results</h2>
              <span>{shownUsers.length}</span>
            </div>

            {!token && (
              <p className={styles.chatNotice}>Usersni ko'rish uchun avval login qiling.</p>
            )}
            {usersLoading && <Loader label="Users yuklanmoqda..." />}
            {usersError && (
              <p className={styles.chatNotice}>
                Users olishda xatolik bor. Token eskirgan bo'lishi mumkin, qayta login qiling.
              </p>
            )}
            {!usersLoading && !usersError && token && shownUsers.length === 0 && (
              <p className={styles.chatNotice}>Mos user topilmadi.</p>
            )}

            {!usersLoading && !usersError && shownUsers.map((profile) => {
              const profileId = getUserId(profile)
              const inviteStatus = getInviteStatus(profileId)

              return (
                <article className={styles.userRow} key={profileId}>
                  <div className={styles.userAvatar}>{getUserInitials(profile)}</div>
                  <div>
                    <h3>{getUserName(profile)}</h3>
                    <p>{getUserEmail(profile)}</p>
                  </div>
                  <button
                    disabled={inviteStatus === 'sent' || inviteStatus === 'incoming'}
                    onClick={() => sendInvite(profileId)}
                  >
                    <FaUserPlus />
                    {inviteStatus === 'sent'
                      ? 'Sent'
                      : inviteStatus === 'incoming'
                        ? 'Pending'
                        : 'Invite'}
                  </button>
                </article>
              )
            })}
          </div>

          <div className={styles.buddyList}>
            <div className={styles.chatSectionTitle}>
              <h2>Your buddies</h2>
              <span>{buddyUsers.length}</span>
            </div>

            {buddyUsers.length === 0 ? (
              <div className={styles.chatEmpty}>
                <FaComments />
                <h3>Buddy hali yo'q</h3>
                <p>Invite qabul qilingandan keyin ikkalangiz bir-biringizga ko'rinasiz.</p>
              </div>
            ) : (
              buddyUsers.map((profile) => (
                <article className={styles.buddyCard} key={getUserId(profile)}>
                  <div className={styles.userAvatar}>{getUserInitials(profile)}</div>
                  <div>
                    <h3>{getUserName(profile)}</h3>
                    <p>{getUserEmail(profile)}</p>
                  </div>
                  <span>Connected</span>
                </article>
              ))
            )}
          </div>
        </section>
      </section>
    )
  }

  function renderBookList(bookList, emptyText) {
    if (!bookList.length) {
      return (
        <div className={styles.emptyState}>
          <FaBookOpen />
          <h3>Hali kitob tanlanmagan</h3>
          <p>{emptyText}</p>
          <button onClick={() => setActiveMenu('Home')}>Kitob tanlash</button>
        </div>
      )
    }

    return (
      <div className={styles.menuContentGrid}>
        {bookList.map(([title, author, price, type, from, to, accent, pages]) => (
          <article
            className={styles.smallBookCard}
            key={`${activeMenu}-${title}`}
            onClick={() => openBook(title)}
          >
            <div style={{ '--cover-from': from, '--cover-to': to, '--cover-accent': accent }}>
              {title.split(' ').slice(0, 2).map((word) => word[0]).join('')}
            </div>
            <section>
              <small>{type} · {pages} pages</small>
              <h3>{title}</h3>
              <p>{author}</p>
              <b>{price}</b>
              <div className={styles.libraryActions}>
                <button
                  onClick={(event) => {
                    event.stopPropagation()
                    toggleStoredBook(title, setSavedBookTitles, 'savedBookTitles')
                  }}
                >
                  {savedBookTitles.includes(title) ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation()
                    toggleStoredBook(title, setFavoriteBookTitles, 'favoriteBookTitles')
                  }}
                >
                  {favoriteBookTitles.includes(title) ? 'Liked' : 'Like'}
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation()
                    toggleStoredBook(title, setCompletedBookTitles, 'completedBookTitles')
                  }}
                >
                  {completedBookTitles.includes(title) ? 'Read' : 'Mark read'}
                </button>
              </div>
            </section>
          </article>
        ))}
      </div>
    )
  }

  function renderBookTiles(bookList, keyPrefix = 'book') {
    return bookList.map(([title, author, price, type, from, to, accent, pages], index) => (
      <article className={styles.bookCard} key={`${keyPrefix}-${title}`} onClick={() => openBook(title)}>
        <div
          className={styles.cover}
          style={{ '--cover-from': from, '--cover-to': to, '--cover-accent': accent }}
        >
          <button
            aria-label="save book"
            className={savedBookTitles.includes(title) ? styles.saved : ''}
            onClick={(event) => {
              event.stopPropagation()
              toggleStoredBook(title, setSavedBookTitles, 'savedBookTitles')
            }}
          >
            <FaRegBookmark />
          </button>
          <span>{title.split(' ').slice(0, 2).map((word) => word[0]).join('')}</span>
        </div>
        <small>{type} · {pages} pages</small>
        <h3>{title}</h3>
        <p>{author}</p>
        <div className={styles.cardBottom}>
          <span><FaStar /> {bookDetails[title]?.rating || `4.${(index % 7) + 2}`}</span>
          <b>{price}</b>
        </div>
        <div className={styles.bookActions}>
          <button
            className={favoriteBookTitles.includes(title) ? styles.liked : ''}
            onClick={(event) => {
              event.stopPropagation()
              toggleStoredBook(title, setFavoriteBookTitles, 'favoriteBookTitles')
            }}
          >
            {favoriteBookTitles.includes(title) ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button
            className={completedBookTitles.includes(title) ? styles.readDone : ''}
            onClick={(event) => {
              event.stopPropagation()
              toggleStoredBook(title, setCompletedBookTitles, 'completedBookTitles')
            }}
          >
            Read
          </button>
        </div>
      </article>
    ))
  }

  function renderSearchResults() {
    return (
      <section className={styles.searchResultsPage}>
        <div className={styles.searchResultsHead}>
          <span>Search</span>
          <h1>{searchQuery}</h1>
          <p>Kitob nomi, muallif yoki janr bo'yicha mos natijalar.</p>
        </div>

        {directSearchBooks.length ? (
          <>
            <div className={styles.sectionHead}>
              <h2>Topilgan kitoblar</h2>
              <button onClick={() => setSearchQuery('')}>Clear search</button>
            </div>
            <section className={styles.bookGrid}>{renderBookTiles(directSearchBooks, 'search')}</section>

            {similarSearchBooks.length > 0 && (
              <>
                <div className={styles.sectionHead}>
                  <h2>Shunga o'xshash kitoblar</h2>
                  <button>{searchBaseBook[3]}</button>
                </div>
                <section className={styles.bookGrid}>{renderBookTiles(similarSearchBooks, 'search-similar')}</section>
              </>
            )}
          </>
        ) : (
          <div className={styles.emptyState}>
            <FaSearch />
            <h3>Kitob topilmadi</h3>
            <p>Boshqa nom, muallif yoki janr bilan qidirib ko'ring.</p>
            <button onClick={() => setSearchQuery('')}>Homega qaytish</button>
          </div>
        )}
      </section>
    )
  }

  function renderBookDetail(book) {
    const [title, author, price, type, from, to, accent, pages, extraDetail] = book
    const detail = bookDetails[title] || extraDetail || {
      age: '12+',
      rating: 4.5,
      vibe: `${type} kitobi`,
      description: 'Bu kitob o‘z janridagi qiziqarli mavzular va o‘qishga qulay hikoya uslubi bilan ajralib turadi.',
      reviews: ['O‘qishga arziydigan kitob.', 'Janr muxlislari uchun mos tanlov.'],
    }
    const similarBooks = getSimilarBooks(book)

    return (
      <section className={styles.bookDetailPage}>
        <button className={styles.backToBooks} onClick={() => setSelectedBookTitle('')}>
          <FaChevronLeft /> Back to books
        </button>

        <section className={styles.bookDetailHero}>
          <div
            className={styles.detailCover}
            style={{ '--cover-from': from, '--cover-to': to, '--cover-accent': accent }}
          >
            <span>{title.split(' ').slice(0, 2).map((word) => word[0]).join('')}</span>
          </div>

          <div className={styles.detailInfo}>
            <small>{type} · {pages} pages · {detail.age}</small>
            <h1>{title}</h1>
            <p>{author}</p>
            <div className={styles.detailMeta}>
              <span><FaStar /> {detail.rating}</span>
              <span>{detail.age} yoshga mos</span>
              <span>{price}</span>
            </div>
            <h2>Kitob haqida qisqacha</h2>
            <p>{detail.description}</p>
            <h2>Qanaqa kitob?</h2>
            <p>{detail.vibe}</p>
            <div className={styles.detailActions}>
              <button
                className={savedBookTitles.includes(title) ? styles.savedAction : ''}
                onClick={() => toggleStoredBook(title, setSavedBookTitles, 'savedBookTitles')}
              >
                <FaRegBookmark /> {savedBookTitles.includes(title) ? 'Saved' : 'Save'}
              </button>
              <button
                className={favoriteBookTitles.includes(title) ? styles.likedAction : ''}
                onClick={() => toggleStoredBook(title, setFavoriteBookTitles, 'favoriteBookTitles')}
              >
                <FaHeart /> {favoriteBookTitles.includes(title) ? 'Liked' : 'Like'}
              </button>
              <button
                className={completedBookTitles.includes(title) ? styles.readDone : ''}
                onClick={() => toggleStoredBook(title, setCompletedBookTitles, 'completedBookTitles')}
              >
                {completedBookTitles.includes(title) ? 'Read' : 'Mark as read'}
              </button>
            </div>
          </div>
        </section>

        <section className={styles.reviewPanel}>
          <div className={styles.sectionHead}>
            <h2>Otzivlar</h2>
            <button>{detail.reviews.length} reviews</button>
          </div>
          <div className={styles.reviewGrid}>
            {detail.reviews.map((review, index) => (
              <article key={review}>
                <span><FaStar /> 4.{index + 6}</span>
                <p>{review}</p>
              </article>
            ))}
          </div>
        </section>

        {similarBooks.length > 0 && (
          <>
            <div className={styles.sectionHead}>
              <h2>Shunga o'xshash kitoblar</h2>
              <button>{type}</button>
            </div>
            <section className={styles.bookGrid}>{renderBookTiles(similarBooks, 'detail-similar')}</section>
          </>
        )}
      </section>
    )
  }

  function renderStreakView() {
    return (
      <section className={styles.streakPage}>
        <div className={styles.streakHero}>
          <div>
            <span>Reading streak</span>
            <h1>{streakCount} kunlik streak</h1>
            <p>Har kuni kamida 15 daqiqa o'qisangiz streak davom etadi va sovg'alar ochiladi.</p>
          </div>
          <div className={styles.streakBadge}>
            <FaFire />
            <b>{streakCount}</b>
            <small>days</small>
          </div>
        </div>

        <section className={styles.streakGrid}>
          <article className={styles.todayGoal}>
            <div className={styles.profileCardHead}>
              <h2>Bugungi o'qish</h2>
              <span>{todayReadPercent}%</span>
            </div>
            <strong>{todayReadMinutes} / 60 min</strong>
            <div className={styles.goalProgress}>
              <span style={{ width: `${todayReadPercent}%` }} />
            </div>
            <p>Yana {Math.max(60 - todayReadMinutes, 0)} daqiqa o'qisangiz bugungi goal yopiladi.</p>
          </article>

          <article className={styles.streakChartCard}>
            <h2>Haftalik chart</h2>
            <div className={styles.streakChart}>
              {streakDays.map(([day, value]) => (
                <div key={day}>
                  <i style={{ height: `${value + 18}px` }} />
                  <span>{day}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className={styles.rewardPanel}>
          <div className={styles.sectionHead}>
            <h2>Sovg'alar</h2>
            <button>{streakRewards.filter(([, , days]) => streakCount >= days).length} unlocked</button>
          </div>
          <div className={styles.rewardGrid}>
            {streakRewards.map(([daysText, reward, days]) => {
              const unlocked = streakCount >= days

              return (
                <article className={unlocked ? styles.rewardUnlocked : ''} key={reward}>
                  <FaTrophy />
                  <small>{daysText}</small>
                  <h3>{reward}</h3>
                  <p>{unlocked ? 'Unlocked' : `${days - streakCount} kun qoldi`}</p>
                </article>
              )
            })}
          </div>
        </section>
      </section>
    )
  }

  function renderHome() {
    if (selectedBook) {
      return renderBookDetail(selectedBook)
    }

    if (normalizedBookSearch) {
      return renderSearchResults()
    }

    return (
      <>
        <section className={styles.hero}>
          <div>
            <span>{currentHero.eyebrow}</span>
            <h1>{currentHero.title}</h1>
            <p>{currentHero.text}</p>
          </div>
          <div className={styles.heroButtons}>
            <button>Browse all books</button>
            <button>My reading list</button>
          </div>
        </section>

        <div className={styles.sectionHead}>
          <h2>Siz uchun tavsiyalar</h2>
          <div className={styles.recommendationControls}>
            <span>
              {recommendationPage + 1} / {recommendationPages}
            </span>
            <button aria-label="Oldingi tavsiyalar" onClick={() => changeRecommendationPage(-1)}>
              <FaChevronLeft />
            </button>
            <button aria-label="Keyingi tavsiyalar" onClick={() => changeRecommendationPage(1)}>
              <FaChevronRight />
            </button>
          </div>
        </div>

        <section className={styles.recommendations}>
          <div className={styles.recommendationIntro}>
            <span>Private recommendation</span>
            <h3>{user?.name ? `${user.name}, sizga mos kitoblar` : 'Sizga mos kitoblar'}</h3>
            <p>
              Tavsiyalar ro'yxatdan o'tishda tanlangan muallif, janr va yosh ma'lumotlariga qarab
              saralanadi.
            </p>
            <div>
              {(user?.favGenres || []).slice(0, 3).map((genre) => (
                <small key={genre}>{genre}</small>
              ))}
              {(user?.favAuthors || []).slice(0, 2).map((author) => (
                <small key={author}>{author}</small>
              ))}
            </div>
          </div>

          <div className={styles.recommendationGrid}>
            {visibleRecommendations.map(({ book, score }) => {
              const [title, author, genre, text, from, to, accent, ageLabel] = book

              return (
                <article className={styles.recommendationCard} key={title} onClick={() => openBook(title)}>
                  <div style={{ '--cover-from': from, '--cover-to': to, '--cover-accent': accent }}>
                    {title.split(' ').slice(0, 2).map((word) => word[0]).join('')}
                  </div>
                  <section>
                    <small>{genre} · {ageLabel}</small>
                    <h3>{title}</h3>
                    <p>{author}</p>
                    <span>{text}</span>
                    <b><FaHeart /> Match {Math.min(Math.max(score, 1) * 18, 98)}%</b>
                  </section>
                </article>
              )
            })}
          </div>
        </section>

        <div className={styles.sectionHead}>
          <h2>Featured</h2>
          <button>View all</button>
        </div>

        <section className={styles.collections}>
          <article>
            <small>Collection</small>
            <h3>New Arrivals This Week</h3>
            <p>20 fresh titles just added</p>
          </article>
          <article>
            <small>Collection</small>
            <h3>Staff Picks for May</h3>
            <p>Curated by our readers</p>
          </article>
        </section>

        <div className={styles.sectionHead}>
          <h2>{selectedCategory === 'All' ? 'All Books' : `${selectedCategory} Books`}</h2>
          <button>Sort by: Popular</button>
        </div>

        <div className={styles.filters}>
          {filters.map((filter) => (
            <button
              className={selectedCategory === filter ? styles.filterActive : ''}
              key={filter}
              onClick={() => chooseCategory(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <section className={styles.bookGrid}>{renderBookTiles(filteredBooks, 'home')}</section>

        <section className={styles.audioPanel}>
          <div className={styles.audioTop}>
            <div>
              <span>Listen & learn</span>
              <h2>Audio Books</h2>
            </div>
            <div>
              <button>Audio Books</button>
              <button>Podcasts</button>
              <button>View All</button>
            </div>
          </div>

          <div className={styles.audioGrid}>
            {audioBooks.map(([letters, title, type, time, from, to]) => (
              <article className={styles.audioCard} key={title}>
                <div style={{ '--cover-from': from, '--cover-to': to }}>
                  <b>{letters}</b>
                  <span>{time}</span>
                </div>
                <small>{type}</small>
                <h3>{title}</h3>
              </article>
            ))}
          </div>
        </section>
      </>
    )
  }

  function renderMenuView() {
    const view = menuViews[activeMenu]

    if (activeMenu === 'Leaderboard') {
      return (
        <section className={styles.leaderboardPage}>
          <div className={styles.leaderboardTitle}>
            <FaTrophy />
            <div>
              <h1>Leaderboard</h1>
              <p>Top readers this month</p>
            </div>
          </div>

          <div className={styles.leaderTabs}>
            <button className={styles.leaderTabActive}><FaFire /> Streak</button>
            <button><FaClock /> Reading Time</button>
            <button><FaBookOpen /> Pages Read</button>
          </div>

          <div className={styles.podium}>
            <article className={styles.secondPlace}>
              <span>2</span>
              <div>MC</div>
              <h3>Marcus Chen</h3>
              <b>72 <small>days</small></b>
              <i />
            </article>
            <article className={styles.firstPlace}>
              <span>1</span>
              <div>AK</div>
              <h3>Alexandra K.</h3>
              <b>87 <small>days</small></b>
              <i />
            </article>
            <article className={styles.thirdPlace}>
              <span>3</span>
              <div>SN</div>
              <h3>Sofia Navarro</h3>
              <b>65 <small>days</small></b>
              <i />
            </article>
          </div>

          <div className={styles.rankingCard}>
            <h2>All Rankings</h2>
            {leaders.map(([name, initials, days, color], index) => (
              <article className={styles.rankRow} key={name}>
                <span style={{ '--rank-color': color }}>{index + 1}</span>
                <div className={styles.rankAvatar}>{initials}</div>
                <strong>{name}</strong>
                <div className={styles.rankLine}>
                  <i style={{ width: `${days}%`, '--rank-color': color }} />
                </div>
                <b>{days}<small>days</small></b>
              </article>
            ))}
          </div>
        </section>
      )
    }

    if (activeMenu === 'My Library') {
      return (
        <section className={styles.menuPanel}>
          <span>My Library</span>
          <h1>My Library</h1>
          <p>Bookmark bosgan kitoblaringiz shu yerga qo'shiladi.</p>
          <div className={styles.menuStats}>
            <article>
              <small>Saved</small>
              <b>{savedBooks.length}</b>
            </article>
            <article>
              <small>Completed</small>
              <b>{completedBooks.length}</b>
            </article>
            <article>
              <small>Pages read</small>
              <b>{pagesRead}</b>
            </article>
          </div>
          {renderBookList(savedBooks, 'Home sahifasidagi bookmark tugmasini bosing.')}
        </section>
      )
    }

    if (activeMenu === 'Favourites') {
      return (
        <section className={styles.menuPanel}>
          <span>Favourites</span>
          <h1>Favourites</h1>
          <p>Yurakcha bosgan kitoblaringiz shu yerda yig'iladi.</p>
          <div className={styles.menuStats}>
            <article>
              <small>Liked books</small>
              <b>{favoriteBooks.length}</b>
            </article>
            <article>
              <small>Top genre</small>
              <b>{favoriteBooks[0]?.[3] || '-'}</b>
            </article>
            <article>
              <small>Last liked</small>
              <b>{favoriteBooks.at(-1)?.[0] || '-'}</b>
            </article>
          </div>
          {renderBookList(favoriteBooks, 'Home sahifasidagi yurakcha tugmasini bosing.')}
        </section>
      )
    }

    if (activeMenu === 'Chats') {
      return renderChatsView()
    }

    if (activeMenu === 'Profile') {
      return renderProfileView()
    }

    if (activeMenu === 'Streak') {
      return renderStreakView()
    }

    return (
      <section className={styles.menuPanel}>
        <span>{activeMenu}</span>
        <h1>{view.title}</h1>
        <p>{view.text}</p>
        <div className={styles.menuStats}>
          {view.stats.map(([label, value]) => (
            <article key={label}>
              <small>{label}</small>
              <b>{value}</b>
            </article>
          ))}
        </div>
        <div className={styles.menuContentGrid}>
          {books.slice(0, 6).map(([title, author, price, type, from, to, accent, pages]) => (
            <article
              className={styles.smallBookCard}
              key={`${activeMenu}-${title}`}
              onClick={() => openBook(title)}
            >
              <div style={{ '--cover-from': from, '--cover-to': to, '--cover-accent': accent }}>
                {title.split(' ').slice(0, 2).map((word) => word[0]).join('')}
              </div>
              <section>
                <small>{type} · {pages} pages</small>
                <h3>{title}</h3>
                <p>{author}</p>
                <b>{price}</b>
              </section>
            </article>
          ))}
        </div>
      </section>
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.logo}>
          <GiBookshelf className={styles.logoIcon} />
          <FaUserCircle className={styles.mobileProfileIcon} />
          <span>KitobXon</span>
        </div>

        <div className={styles.searchBar}>
          <FaSearch />
          <input
            placeholder="Search books, authors, genres..."
            type="text"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value)
              setSelectedBookTitle('')
              setActiveMenu('Home')
              setSelectedCategory('All')
            }}
          />
        </div>

        <div className={styles.actions}>
          <button
            className={styles.points}
            onClick={() => {
              setActiveMenu('Streak')
              setSelectedCategory('All')
              setSelectedBookTitle('')
              setSearchQuery('')
            }}
          >
            <FaFire />
            <span>{streakCount}</span>
          </button>
          <button onClick={() => {
            setActiveMenu('Leaderboard')
            setSelectedCategory('All')
          }}>
            <FaTrophy />
          </button>
          <div className={styles.notificationPicker}>
            <button
              aria-expanded={notificationOpen}
              aria-label="Notifications"
              className={notificationCount ? styles.hasNotification : ''}
              onClick={() => setNotificationOpen((open) => !open)}
              type="button"
            >
              <FaBell />
              {notificationCount > 0 && <span>{notificationCount}</span>}
            </button>
            {notificationOpen && (
              <div className={styles.notificationMenu}>
                <div className={styles.notificationHead}>
                  <strong>Notifications</strong>
                  <small>{notificationCount} new</small>
                </div>
                {notificationCount === 0 ? (
                  <p>Yangi notification yo'q.</p>
                ) : (
                  incomingInvites.map((invite) => {
                    const sender = allUsers.find((profile) => getUserId(profile) === invite.from)

                    return (
                      <article key={invite.id}>
                        <div className={styles.userAvatar}>{getUserInitials(sender)}</div>
                        <section>
                          <h3>{getUserName(sender)}</h3>
                          <p>Chats bo'limida sizga buddy invite yubordi.</p>
                        </section>
                        <button
                          onClick={() => {
                            acceptInvite(invite.id)
                            setNotificationOpen(false)
                          }}
                        >
                          Accept
                        </button>
                      </article>
                    )
                  })
                )}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setActiveMenu('Profile')
              setSelectedCategory('All')
            }}
          >
            <FaUser />
          </button>
          <div className={styles.languagePicker}>
            <button
              aria-expanded={languageOpen}
              aria-label="Choose language"
              className={styles.avatar}
              onClick={() => setLanguageOpen((open) => !open)}
              type="button"
            >
              <GrLanguage />
              <span>{selectedLanguage}</span>
            </button>
            {languageOpen && (
              <div className={styles.languageMenu}>
                {languages.map((language) => (
                  <button
                    className={selectedLanguage === language ? styles.languageActive : ''}
                    key={language}
                    onClick={() => {
                      setSelectedLanguage(language)
                      setLanguageOpen(false)
                    }}
                    type="button"
                  >
                    {language}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <aside className={styles.sidebar}>

        <p className={styles.navTitle}>Menu</p>
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <button
              className={`${styles.navItem} ${activeMenu === item.label ? styles.active : ''}`}
              key={item.label}
              onClick={() => {
                setActiveMenu(item.label)
                setSelectedCategory('All')
              }}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
              {item.countKey && <b>{menuCounts[item.countKey]}</b>}
            </button>
          ))}
        </nav>

        <p className={styles.navTitle}>Categories</p>
        <div className={styles.categoryList}>
          {categories.map(([name, count]) => (
            <button
              className={selectedCategory === name ? styles.categoryActive : ''}
              key={name}
              onClick={() => chooseCategory(name)}
            >
              <span>{name}</span>
              <b>{count}</b>
            </button>
          ))}
        </div>

        <div className={styles.readingCard}>
          <strong>Reading Progress</strong>
          <div>
            <span>Books read</span>
            <b>{completedBooks.length} / {readingGoal}</b>
          </div>
          <div className={styles.progressLine}>
            <span style={{ width: `${progressPercent}%` }} />
          </div>
          <div>
            <span>This month</span>
            <b>{completedBooks.length} books</b>
          </div>
          <div>
            <span>Pages read</span>
            <b>{pagesRead}</b>
          </div>
          <button
            onClick={() => {
              setActiveMenu('My Library')
              setSelectedCategory('All')
            }}
          >
            View progress
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        {activeMenu === 'Home' ? renderHome() : renderMenuView()}
      </main>
    </div>
  )
}

export default Private
