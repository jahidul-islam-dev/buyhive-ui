export type Category =
  | "Electronics"
  | "Books"
  | "Components"
  | "Food"
  | "Others"

export type GroupStatus = "active" | "pending" | "completed" | "created"

export type Product = {
  id: string
  name: string
  image: string
  category: Category
  originalPrice: number
  groupPrice: number
  maxMembers: number
  joinedMembers: number
  deadline: string
  description: string
  host: string
  university: string
  aiReason?: string
}

export type ChatMessage = {
  id: string
  author: string
  avatar?: string
  text: string
  time: string
  system?: boolean
  self?: boolean
  status?: "paid" | "waiting"
}

export type NotificationItem = {
  id: string
  title: string
  body: string
  time: string
  type: "join" | "complete" | "reminder" | "deal"
  group: "Today" | "Yesterday" | "Earlier"
}

export const CURRENCY = "Tk "

export function money(amount: number) {
  return `${CURRENCY}${amount.toLocaleString("en-IN")}`
}

export const categories: { label: Category; icon: string }[] = [
  { label: "Electronics", icon: "cpu" },
  { label: "Books", icon: "book" },
  { label: "Food", icon: "utensils" },
  { label: "Components", icon: "plug" },
  { label: "Others", icon: "layers" },
]

export const products: Product[] = [
  {
    id: "arduino-uno",
    name: "Arduino Uno R3",
    image: "/products/arduino-uno.png",
    category: "Components",
    originalPrice: 750,
    groupPrice: 560,
    maxMembers: 6,
    joinedMembers: 4,
    deadline: "2 days left",
    description:
      "Genuine Arduino Uno R3 microcontroller board. Perfect for your embedded systems lab and IoT projects. Bulk order splits the shipping cost across the group.",
    host: "Aryan",
    university: "BUET",
    aiReason: "because you joined ESP32 groups",
  },
  {
    id: "esp32",
    name: "ESP32 Dev Board",
    image: "/products/esp32.png",
    category: "Components",
    originalPrice: 620,
    groupPrice: 430,
    maxMembers: 8,
    joinedMembers: 7,
    deadline: "6 hours left",
    description:
      "ESP32 WROOM dev board with built-in WiFi and Bluetooth. Ideal for wireless IoT projects. Almost full — grab the last spot!",
    host: "Rafi",
    university: "BUET",
  },
  {
    id: "raspberry-pi",
    name: "Raspberry Pi 4 (4GB)",
    image: "/products/raspberry-pi.png",
    category: "Electronics",
    originalPrice: 8500,
    groupPrice: 7200,
    maxMembers: 5,
    joinedMembers: 2,
    deadline: "5 days left",
    description:
      "Raspberry Pi 4 Model B with 4GB RAM. Great for servers, robotics, and machine learning at the edge.",
    host: "Nabila",
    university: "DU",
  },
  {
    id: "calculus-textbook",
    name: "Calculus: Early Transcendentals",
    image: "/products/textbook.png",
    category: "Books",
    originalPrice: 1200,
    groupPrice: 780,
    maxMembers: 10,
    joinedMembers: 6,
    deadline: "3 days left",
    description:
      "Stewart's Calculus, 8th edition. Bulk import from a single supplier means everyone saves on both price and delivery.",
    host: "Imran",
    university: "NSU",
    aiReason: "popular in your first-year batch",
  },
  {
    id: "streaming",
    name: "Streaming Premium (4 seats)",
    image: "/products/streaming.png",
    category: "Others",
    originalPrice: 1100,
    groupPrice: 280,
    maxMembers: 4,
    joinedMembers: 3,
    deadline: "1 day left",
    description:
      "Split a Premium family plan four ways. Each member pays only their share for a full year of streaming.",
    host: "Sadia",
    university: "BRAC",
  },
  {
    id: "keyboard",
    name: "Mechanical Keyboard 65%",
    image: "/products/keyboard.png",
    category: "Electronics",
    originalPrice: 3200,
    groupPrice: 2450,
    maxMembers: 6,
    joinedMembers: 5,
    deadline: "4 days left",
    description:
      "Hot-swappable 65% mechanical keyboard with blue switches. Bulk order unlocks a distributor discount.",
    host: "Tanvir",
    university: "BUET",
  },
  {
    id: "breadboard-kit",
    name: "Electronics Starter Kit",
    image: "/products/breadboard-kit.png",
    category: "Components",
    originalPrice: 950,
    groupPrice: 640,
    maxMembers: 12,
    joinedMembers: 9,
    deadline: "2 days left",
    description:
      "Breadboard, jumper wires, resistors, LEDs and sensors — everything you need for your circuits course.",
    host: "Farhan",
    university: "AIUB",
  },
  {
    id: "snacks",
    name: "Protein Snack Box (Bulk)",
    image: "/products/snacks.png",
    category: "Food",
    originalPrice: 1800,
    groupPrice: 1250,
    maxMembers: 8,
    joinedMembers: 4,
    deadline: "3 days left",
    description:
      "A bulk box of assorted protein bars and healthy snacks. Perfect for late-night study sessions in the dorm.",
    host: "Mim",
    university: "DU",
  },
]

const CREATED_PRODUCTS_KEY = "buyhive-created-products"

function readCreatedProducts(): Product[] {
  if (typeof window === "undefined") return []

  try {
    const raw = window.localStorage.getItem(CREATED_PRODUCTS_KEY)
    return raw ? (JSON.parse(raw) as Product[]) : []
  } catch {
    return []
  }
}

export function writeCreatedProduct(product: Product) {
  if (typeof window === "undefined") return

  const existing = readCreatedProducts()
  const next = [product, ...existing.filter((p) => p.id !== product.id)]
  window.localStorage.setItem(CREATED_PRODUCTS_KEY, JSON.stringify(next))
}

export function getProduct(id: string) {
  return [...products, ...readCreatedProducts()].find((p) => p.id === id)
}

export function savings(p: Product) {
  return p.originalPrice - p.groupPrice
}

export function progress(p: Product) {
  return Math.round((p.joinedMembers / p.maxMembers) * 100)
}

export type MyGroup = {
  id: string
  productId: string
  status: GroupStatus
}

export const myGroups: MyGroup[] = [
  { id: "g1", productId: "arduino-uno", status: "active" },
  { id: "g2", productId: "breadboard-kit", status: "active" },
  { id: "g3", productId: "keyboard", status: "pending" },
  { id: "g4", productId: "streaming", status: "completed" },
  { id: "g5", productId: "esp32", status: "created" },
]

export const chatMessages: ChatMessage[] = [
  {
    id: "m1",
    author: "System",
    text: "Arduino Uno group created. 6 members needed.",
    time: "10:02",
    system: true,
  },
  {
    id: "m2",
    author: "Aryan",
    avatar: "/avatars/aryan.png",
    text: "Hey everyone! I've placed the bulk order. Please send your share to complete the group.",
    time: "10:05",
    self: true,
  },
  {
    id: "m3",
    author: "Rafi",
    text: "Paid ✅ Transaction sent.",
    time: "10:11",
    status: "paid",
  },
  {
    id: "m4",
    author: "Nabila",
    text: "Paid just now!",
    time: "10:14",
    status: "paid",
  },
  {
    id: "m5",
    author: "Imran",
    text: "Waiting for my stipend, will pay by tonight.",
    time: "10:20",
    status: "waiting",
  },
  {
    id: "m6",
    author: "System",
    text: "3 of 6 members completed payment.",
    time: "10:21",
    system: true,
  },
  {
    id: "m7",
    author: "Aryan",
    avatar: "/avatars/aryan.png",
    text: "No worries! Delivery expected within 3 days once everyone pays.",
    time: "10:24",
    self: true,
  },
]

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Rafi joined your group",
    body: "Arduino Uno R3 · 4/6 joined",
    time: "2m ago",
    type: "join",
    group: "Today",
  },
  {
    id: "n2",
    title: "Almost there!",
    body: "ESP32 Dev Board needs just 1 more member",
    time: "1h ago",
    type: "reminder",
    group: "Today",
  },
  {
    id: "n3",
    title: "Group completed 🎉",
    body: "Streaming Premium is fully funded. Delivery on the way!",
    time: "5h ago",
    type: "complete",
    group: "Today",
  },
  {
    id: "n4",
    title: "New deal on your campus",
    body: "Mechanical Keyboard 65% — save ৳750",
    time: "Yesterday",
    type: "deal",
    group: "Yesterday",
  },
  {
    id: "n5",
    title: "Reminder: payment pending",
    body: "Your share for the Keyboard group is due tomorrow",
    time: "Yesterday",
    type: "reminder",
    group: "Yesterday",
  },
  {
    id: "n6",
    title: "Welcome to BuyHive!",
    body: "Start saving by joining your first group buy.",
    time: "3 days ago",
    type: "deal",
    group: "Earlier",
  },
]

export const currentUser = {
  name: "Aryan Rahman",
  firstName: "Aryan",
  university: "BUET",
  avatar: "/avatars/aryan.png",
  reputation: 4.8,
  reviews: 32,
  totalSaved: 8450,
  groupsJoined: 14,
  groupsCreated: 5,
}
