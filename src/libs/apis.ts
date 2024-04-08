import { Booking } from "@/models/booking";
import { CreateBookingDto, Room } from "@/models/room";
import * as queries from "./sanityQueries";
import axios from "axios";
import sanityClient from "./sanity";

/**
 * Retrieves a list of rooms by querying the sanityClient.
 *
 * @return {Room[]} The list of rooms retrieved from the query.
 */
export async function getRooms(): Promise<Room[]> {
  const result = await sanityClient.fetch<Room[]>(
    queries.getRoomsQuery,
    {},
    { cache: "no-cache" }
  );
  return result;
}

/**
 * Retrieves a room object based on the provided slug.
 *
 * @param {string} slug - The slug of the room to retrieve.
 * @return {Promise<Room>} The room object retrieved.
 */
export async function getRoom(slug: string): Promise<Room> {
  const result = await sanityClient.fetch<Room>(
    queries.getRoom,
    { slug },
    { cache: "no-cache" }
  );

  return result;
}

/**
 * Creates a booking using the provided booking details.
 *
 * @param {CreateBookingDto} paramName - object containing booking details
 * @return {Promise<any>} data returned from the booking creation
 */
export const createBooking = async ({
  adults,
  checkinDate,
  checkoutDate,
  children,
  discount,
  hotelRoom,
  numberOfDays,
  totalPrice,
  user,
}: CreateBookingDto): Promise<any> => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "booking",
          user: { _type: "reference", _ref: user },
          hotelRoom: { _type: "reference", _ref: hotelRoom },
          checkinDate,
          checkoutDate,
          numberOfDays,
          adults,
          children,
          totalPrice,
          discount,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

/**
 * Updates a hotel room to mark it as booked.
 *
 * @param {string} hotelRoomId - The ID of the hotel room to update
 * @return {Promise<any>} The data returned from the API call
 */
export const updateHotelRoom = async (hotelRoomId: string): Promise<any> => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: hotelRoomId,
          set: {
            isBooked: true,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

/**
 * Get user bookings for the given user ID.
 *
 * @param {string} userId - The ID of the user
 * @return {Promise<Booking[]>} The bookings for the user
 */
export const getUserBookings = async (userId: string): Promise<Booking[]> => {
  const result = await sanityClient.fetch<Booking[]>(
    queries.getUserBookingsQuery,
    {
      userId,
    },
    { cache: "no-cache" }
  );

  return result;
};

/**
 * Retrieves user data based on the provided userId.
 *
 * @param {string} userId - The unique identifier of the user.
 * @return {Promise<any>} The data of the user fetched from the server.
 */
export const getUserData = async (userId: string): Promise<any> => {
  const result = await sanityClient.fetch(
    queries.getUserDataQuery,
    { userId },
    { cache: "no-cache" }
  );

  return result;
};
