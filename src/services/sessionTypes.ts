import { api } from "./api";
import type { SessionType } from "@/types/form";

export interface CreateSessionTypeRequest {
  name: string;
  price: number;
  shooterPrice: number;
  description?: string;
}

export interface UpdateSessionTypeRequest {
  name?: string;
  price?: number;
  shooterPrice?: number;
  description?: string;
  isActive?: boolean;
}

export interface SessionTypeListResponse {
  sessionTypes: SessionType[];
  total: number;
  page: number;
  limit: number;
}

export const sessionTypeService = {
  // Get all session types
  async getSessionTypes(
    page = 1,
    limit = 50
  ): Promise<SessionTypeListResponse> {
    // For now, return mock data until backend is implemented
    const mockSessionTypes: SessionType[] = [
      {
        id: "1",
        name: "Nikah",
        price: 1500,
        shooterPrice: 500,
        description: "Traditional Islamic wedding ceremony photography",
        isActive: true,
        createdAt: new Date("2024-01-01"),
      },
      {
        id: "2",
        name: "Sanding",
        price: 2000,
        shooterPrice: 700,
        description: "Malay traditional wedding ceremony photography",
        isActive: true,
        createdAt: new Date("2024-01-02"),
      },
      {
        id: "3",
        name: "Outdoor",
        price: 1200,
        shooterPrice: 400,
        description: "Outdoor photography session",
        isActive: true,
        createdAt: new Date("2024-01-03"),
      },
      {
        id: "4",
        name: "Engagement",
        price: 800,
        shooterPrice: 300,
        description: "Pre-wedding engagement photography",
        isActive: true,
        createdAt: new Date("2024-01-04"),
      },
    ];

    return {
      sessionTypes: mockSessionTypes,
      total: mockSessionTypes.length,
      page,
      limit,
    };

    // Uncomment when backend is ready:
    // const response = await api<SessionTypeListResponse>({
    //   endpoint: '/session-types',
    //   method: 'GET',
    //   params: { page, limit }
    // })
    // return response.data
  },

  // Get a single session type by ID
  async getSessionType(id: string): Promise<SessionType> {
    const response = await api<SessionType>({
      endpoint: `/session-types/${id}`,
      method: "GET",
    });
    return response.data;
  },

  // Create a new session type
  async createSessionType(
    data: CreateSessionTypeRequest
  ): Promise<SessionType> {
    const response = await api<SessionType>({
      endpoint: "/session-types",
      method: "POST",
      body: data,
    });
    return response.data;
  },

  // Update an existing session type
  async updateSessionType(
    id: string,
    data: UpdateSessionTypeRequest
  ): Promise<SessionType> {
    // For now, simulate API response with mock data
    const mockSessionTypes: SessionType[] = [
      {
        id: "1",
        name: "Nikah",
        price: 1500,
        shooterPrice: 500,
        description: "Traditional Islamic wedding ceremony photography",
        isActive: true,
        createdAt: new Date("2024-01-01"),
      },
      {
        id: "2",
        name: "Sanding",
        price: 2000,
        shooterPrice: 700,
        description: "Malay traditional wedding ceremony photography",
        isActive: true,
        createdAt: new Date("2024-01-02"),
      },
      {
        id: "3",
        name: "Outdoor",
        price: 1200,
        shooterPrice: 400,
        description: "Outdoor photography session",
        isActive: true,
        createdAt: new Date("2024-01-03"),
      },
      {
        id: "4",
        name: "Engagement",
        price: 800,
        shooterPrice: 300,
        description: "Pre-wedding engagement photography",
        isActive: true,
        createdAt: new Date("2024-01-04"),
      },
    ];

    const sessionType = mockSessionTypes.find(s => s.id === id);
    if (!sessionType) {
      throw new Error('Session type not found');
    }

    // Update the session type with the new data
    const updatedSessionType = {
      ...sessionType,
      ...data,
      updatedAt: new Date()
    };

    return updatedSessionType;

    // Uncomment when backend is ready:
    // const response = await api<SessionType>({
    //   endpoint: `/session-types/${id}`,
    //   method: "PUT",
    //   body: data,
    // });
    // return response.data;
  },

  // Delete a session type
  async deleteSessionType(id: string): Promise<void> {
    await api<void>({
      endpoint: `/session-types/${id}`,
      method: "DELETE",
    });
  },
};
