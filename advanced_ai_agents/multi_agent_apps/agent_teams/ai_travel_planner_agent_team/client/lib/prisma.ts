// MOCKED in-memory Prisma store for AI Studio preview environment
export interface TripPlanRecord {
  id: string;
  name: string;
  destination: string;
  startingLocation: string;
  travelDatesStart: string;
  travelDatesEnd?: string | null;
  dateInputType: string;
  duration?: number | null;
  travelingWith: string;
  adults: number;
  children: number;
  ageGroups: string[];
  budget: number;
  budgetCurrency: string;
  travelStyle: string;
  budgetFlexible: boolean;
  vibes: string[];
  priorities: string[];
  interests?: string | null;
  rooms: number;
  pace: number[];
  beenThereBefore?: string | null;
  lovedPlaces?: string | null;
  additionalInfo?: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId?: string | null;
  status?: TripPlanStatusRecord | null;
  output?: TripPlanOutputRecord | null;
}

export interface TripPlanStatusRecord {
  id: string;
  tripPlanId: string;
  status: string; // "pending" | "processing" | "completed" | "failed"
  currentStep?: string | null;
  error?: string | null;
  startedAt?: Date | null;
  completedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TripPlanOutputRecord {
  id: string;
  tripPlanId: string;
  itinerary: string;
  summary?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function buildItineraryJson(plan: {
  name: string;
  destination: string;
  startingLocation: string;
  budget?: number;
  budgetCurrency?: string;
  duration?: number | null;
  travelStyle?: string;
  vibes?: string[];
}) {
  const dest = plan.destination || "Kyoto, Japan";
  const curr = plan.budgetCurrency || "USD";
  const numDays = plan.duration || 5;

  const dayPlans = [];
  for (let d = 1; d <= numDays; d++) {
    dayPlans.push({
      day: d,
      date: `Day ${d}`,
      morning: `Explore iconic morning landmarks in ${dest}, enjoying traditional morning coffee or matcha and taking in local architecture.`,
      afternoon: `Visit premier cultural sites, artisan markets, and scenic viewpoints throughout ${dest}.`,
      evening: `Dine at recommended local eateries, stroll through illuminated historic quarters, and soak in the evening atmosphere.`,
      notes: `Wear comfortable walking shoes. Pre-booking entrance passes is recommended.`,
    });
  }

  const itineraryObject = {
    day_by_day_plan: dayPlans,
    hotels: [
      {
        hotel_name: `${dest} Grand Heritage Hotel`,
        price: `${curr === "USD" ? "$" : curr}210/night`,
        rating: "4.9",
        address: `Central District, ${dest}`,
        amenities: ["Free High-Speed Wi-Fi", "Spa & Wellness", "Gourmet Breakfast Included", "Concierge"],
        description: `Top-rated stay in the heart of ${dest} featuring panoramic views and world-class hospitality.`,
        url: "#",
      },
      {
        hotel_name: `${dest} Boutique Sanctuary`,
        price: `${curr === "USD" ? "$" : curr}145/night`,
        rating: "4.7",
        address: `Arts & Historic Quarter, ${dest}`,
        amenities: ["Free Wi-Fi", "Garden Terrace", "Bicycle Rental", "Eco-friendly Amenities"],
        description: `Charming boutique retreat situated minutes away from historic avenues and lively markets.`,
        url: "#",
      },
    ],
    attractions: [
      {
        name: `Historic Old Town & Central Plaza of ${dest}`,
        description: `A UNESCO World Heritage area filled with centuries of preserved history, vibrant shops, and striking architecture.`,
      },
      {
        name: `${dest} Panorama Sky Terrace`,
        description: `Breathtaking 360-degree vista overlooking the entire city, hills, and surrounding waterways.`,
      },
      {
        name: `${dest} Botanical Sanctuary & Gardens`,
        description: `Sprawling lush gardens featuring indigenous flora, tranquil walking paths, and peaceful reflection pools.`,
      },
    ],
    flights: [
      {
        duration: "8h 45m",
        price: `${curr === "USD" ? "$" : curr}650`,
        departure_time: "08:30 AM",
        arrival_time: "05:15 PM",
        airline: "Global Airways Express",
        flight_number: "GA-402",
        stops: 0,
        url: "#",
      },
      {
        duration: "10h 15m",
        price: `${curr === "USD" ? "$" : curr}520`,
        departure_time: "01:00 PM",
        arrival_time: "11:15 PM",
        airline: "Skylink International",
        flight_number: "SL-884",
        stops: 1,
        url: "#",
      },
    ],
    restaurants: [
      {
        name: `The Local Spoon in ${dest}`,
        description: `Farm-to-table cuisine highlighting the freshest seasonal produce and regional traditions.`,
        location: `Historic District`,
        url: "#",
      },
      {
        name: `Trattoria della Piazza`,
        description: `Beloved local staple renowned for handmade pasta, wood-fired specialties, and curated pairings.`,
        location: `Old Quarter`,
        url: "#",
      },
      {
        name: `Sunset Harbor Bistro`,
        description: `Waterfront dining with catch-of-the-day specials and stellar twilight views.`,
        location: `Waterfront Promenade`,
        url: "#",
      },
    ],
    tips: [
      `Exchange currency or verify contactless card acceptance ahead of market visits.`,
      `Purchase regional rail / transit pass for effortless commuting.`,
      `Download offline maps of ${dest} for smooth exploration off the beaten path.`,
      `Book popular museum exhibitions and historic sites at least 3 days in advance.`,
    ],
    budget_insights: [
      `Accommodations account for approximately 42% of the estimated budget.`,
      `Dining and transit allow for high flexibility with generous local options.`,
      `Travel insurance and museum combination passes offer ~18% savings.`,
    ],
  };

  const outerOutput = {
    budget_agent_response: `### Budget Agent Breakdown for ${dest}\n\n- **Target Budget:** ${curr} ${plan.budget || 2000}\n- **Estimated Allocation:**\n  - Accommodations: 40%\n  - Transport & Flights: 35%\n  - Dining & Activities: 25%\n\nAll recommendations fall comfortably within your target parameters.`,
    destination_agent_response: `### Destination Highlights: ${dest}\n\n${dest} offers a premier blend of historic heritage, vibrant culinary streets, and relaxing natural retreats. Best season for this itinerary is current season with mild temperatures and great visibility.`,
    flight_agent_response: `### Flight Agent Route: ${plan.startingLocation} ➔ ${dest}\n\nFound multiple carrier routes with optimal layovers and competitive rates matching your dates.`,
    restaurant_agent_response: `### Culinary Agent Picks for ${dest}\n\nHand-selected Michelin-guide and local favorite spots offering authentic culinary traditions across diverse price tiers.`,
    itinerary_agent_response: `### Curated Master Itinerary\n\nBalanced day-by-day flow designed to maximize discovery while leaving space for spontaneous relaxation and local interactions.`,
    itinerary: JSON.stringify(itineraryObject),
  };

  return JSON.stringify(outerOutput);
}

// In-memory store
const tripPlansStore = new Map<string, TripPlanRecord>();
const tripPlanStatusStore = new Map<string, TripPlanStatusRecord>();
const tripPlanOutputStore = new Map<string, TripPlanOutputRecord>();
const userStore = new Map<string, any>();
const sessionStore = new Map<string, any>();
const accountStore = new Map<string, any>();
const verificationStore = new Map<string, any>();

// Seed sample trip plan
function seedInitialData() {
  if (tripPlansStore.size > 0) return;

  const sampleId = "sample_kyoto_tokyo";
  const samplePlan: TripPlanRecord = {
    id: sampleId,
    name: "Golden Week in Kyoto & Tokyo",
    destination: "Kyoto & Tokyo, Japan",
    startingLocation: "San Francisco, CA",
    travelDatesStart: "2026-11-10",
    travelDatesEnd: "2026-11-17",
    dateInputType: "picker",
    duration: 7,
    travelingWith: "Partner",
    adults: 2,
    children: 0,
    ageGroups: ["26-35"],
    budget: 3500,
    budgetCurrency: "USD",
    travelStyle: "comfort",
    budgetFlexible: true,
    vibes: ["cultural", "food-focused", "relaxing"],
    priorities: ["Local Dining", "Scenic Temples", "Bullet Train Travel"],
    interests: "Traditional Ryokans, specialty ramen, tea ceremony, garden walks",
    rooms: 1,
    pace: [3],
    beenThereBefore: "First time visit",
    lovedPlaces: "Historic Gion, Arashiyama Bamboo Grove, Shibuya Crossing",
    additionalInfo: "Prefer direct or single-stop flights.",
    createdAt: new Date(Date.now() - 86400000 * 2),
    updatedAt: new Date(Date.now() - 86400000 * 2),
    userId: null,
  };

  const sampleStatus: TripPlanStatusRecord = {
    id: `stat_${sampleId}`,
    tripPlanId: sampleId,
    status: "completed",
    currentStep: "Plan generation completed successfully",
    error: null,
    startedAt: new Date(Date.now() - 86400000 * 2),
    completedAt: new Date(Date.now() - 86400000 * 2 + 15000),
    createdAt: new Date(Date.now() - 86400000 * 2),
    updatedAt: new Date(Date.now() - 86400000 * 2),
  };

  const sampleOutput: TripPlanOutputRecord = {
    id: `out_${sampleId}`,
    tripPlanId: sampleId,
    itinerary: buildItineraryJson(samplePlan),
    summary: "7-day luxury culture and dining itinerary across Kyoto and Tokyo.",
    createdAt: new Date(Date.now() - 86400000 * 2),
    updatedAt: new Date(Date.now() - 86400000 * 2),
  };

  tripPlansStore.set(sampleId, samplePlan);
  tripPlanStatusStore.set(sampleId, sampleStatus);
  tripPlanOutputStore.set(sampleId, sampleOutput);
}

seedInitialData();

export const prisma = {
  tripPlan: {
    findMany: async (args?: { orderBy?: { createdAt?: "asc" | "desc" } }) => {
      seedInitialData();
      const list = Array.from(tripPlansStore.values()).map((p) => ({
        ...p,
        status: tripPlanStatusStore.get(p.id) || null,
        output: tripPlanOutputStore.get(p.id) || null,
      }));
      list.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      return list;
    },
    findUnique: async (args: { where: { id: string }; include?: { status?: boolean; output?: boolean } }) => {
      seedInitialData();
      const plan = tripPlansStore.get(args.where.id);
      if (!plan) return null;
      const res: any = { ...plan };
      if (args.include?.status) {
        res.status = tripPlanStatusStore.get(plan.id) || {
          id: `stat_${plan.id}`,
          tripPlanId: plan.id,
          status: "completed",
          currentStep: "Completed",
          error: null,
        };
      }
      if (args.include?.output) {
        res.output = tripPlanOutputStore.get(plan.id) || {
          id: `out_${plan.id}`,
          tripPlanId: plan.id,
          itinerary: buildItineraryJson(plan),
        };
      }
      return res;
    },
    create: async (args: { data: any }) => {
      const id = args.data.id || `tp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const now = new Date();
      const record: TripPlanRecord = {
        ...args.data,
        id,
        createdAt: now,
        updatedAt: now,
      };
      tripPlansStore.set(id, record);

      // Auto-create initial status and output for immediate usability
      const statusRecord: TripPlanStatusRecord = {
        id: `stat_${id}`,
        tripPlanId: id,
        status: "completed",
        currentStep: "Trip planned successfully with AI agent team",
        error: null,
        startedAt: now,
        completedAt: now,
        createdAt: now,
        updatedAt: now,
      };
      tripPlanStatusStore.set(id, statusRecord);

      const outputRecord: TripPlanOutputRecord = {
        id: `out_${id}`,
        tripPlanId: id,
        itinerary: buildItineraryJson(record),
        summary: `Tailored itinerary for ${record.destination}`,
        createdAt: now,
        updatedAt: now,
      };
      tripPlanOutputStore.set(id, outputRecord);

      return record;
    },
    delete: async (args: { where: { id: string } }) => {
      const record = tripPlansStore.get(args.where.id);
      tripPlansStore.delete(args.where.id);
      tripPlanStatusStore.delete(args.where.id);
      tripPlanOutputStore.delete(args.where.id);
      return record || { id: args.where.id };
    },
  },
  tripPlanStatus: {
    findUnique: async (args: { where: { tripPlanId: string } }) => {
      return tripPlanStatusStore.get(args.where.tripPlanId) || null;
    },
    create: async (args: { data: any }) => {
      const id = args.data.id || `stat_${Date.now()}`;
      const record: TripPlanStatusRecord = {
        ...args.data,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      tripPlanStatusStore.set(record.tripPlanId, record);
      return record;
    },
    update: async (args: { where: { tripPlanId: string }; data: any }) => {
      const existing = tripPlanStatusStore.get(args.where.tripPlanId) || {
        id: `stat_${args.where.tripPlanId}`,
        tripPlanId: args.where.tripPlanId,
        status: "processing",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updated = { ...existing, ...args.data, updatedAt: new Date() };
      tripPlanStatusStore.set(args.where.tripPlanId, updated);
      return updated;
    },
    upsert: async (args: { where: { tripPlanId: string }; update: any; create: any }) => {
      const existing = tripPlanStatusStore.get(args.where.tripPlanId);
      if (existing) {
        const updated = { ...existing, ...args.update, updatedAt: new Date() };
        tripPlanStatusStore.set(args.where.tripPlanId, updated);
        return updated;
      }
      const record = {
        ...args.create,
        id: `stat_${args.where.tripPlanId}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      tripPlanStatusStore.set(args.where.tripPlanId, record);
      return record;
    },
    deleteMany: async (args: { where: { tripPlanId: string } }) => {
      tripPlanStatusStore.delete(args.where.tripPlanId);
      return { count: 1 };
    },
  },
  tripPlanOutput: {
    findUnique: async (args: { where: { tripPlanId: string } }) => {
      return tripPlanOutputStore.get(args.where.tripPlanId) || null;
    },
    create: async (args: { data: any }) => {
      const id = args.data.id || `out_${Date.now()}`;
      const record: TripPlanOutputRecord = {
        ...args.data,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      tripPlanOutputStore.set(record.tripPlanId, record);
      return record;
    },
    deleteMany: async (args: { where: { tripPlanId: string } }) => {
      tripPlanOutputStore.delete(args.where.tripPlanId);
      return { count: 1 };
    },
  },
  user: {
    findUnique: async (args: any) => userStore.get(args.where?.id || args.where?.email) || null,
    findFirst: async () => null,
    findMany: async () => Array.from(userStore.values()),
    create: async (args: any) => {
      const id = args.data.id || `u_${Date.now()}`;
      const record = { ...args.data, id, createdAt: new Date(), updatedAt: new Date() };
      userStore.set(id, record);
      if (record.email) userStore.set(record.email, record);
      return record;
    },
    update: async (args: any) => ({ ...args.data }),
    delete: async (args: any) => ({ ...args.where }),
  },
  session: {
    findUnique: async (args: any) => sessionStore.get(args.where?.token || args.where?.id) || null,
    findFirst: async () => null,
    create: async (args: any) => {
      const id = args.data.id || `s_${Date.now()}`;
      const record = { ...args.data, id, createdAt: new Date(), updatedAt: new Date() };
      sessionStore.set(id, record);
      if (record.token) sessionStore.set(record.token, record);
      return record;
    },
    delete: async (args: any) => ({ ...args.where }),
    deleteMany: async () => ({ count: 0 }),
  },
  account: {
    findFirst: async () => null,
    findUnique: async () => null,
    create: async (args: any) => ({ ...args.data, id: `acc_${Date.now()}` }),
    delete: async (args: any) => ({ ...args.where }),
  },
  verification: {
    findFirst: async () => null,
    findUnique: async () => null,
    create: async (args: any) => ({ ...args.data, id: `v_${Date.now()}` }),
    delete: async (args: any) => ({ ...args.where }),
  },
};
