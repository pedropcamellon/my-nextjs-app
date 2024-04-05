import { Booking } from "@/models/booking";
import { CreateBookingDto, Room } from "@/models/room";
import { CreateReviewDto, Review } from "./../models/review";
import { UpdateReviewDto } from "@/models/review";
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
 * Retrieves user data based on the provided userId.
 *
 * @param {string} userId - The unique identifier of the user.
 * @return {Promise<any>} The data of the user fetched from the server.
 */
export async function getUserData(userId: string) {
  const result = await sanityClient.fetch(
    queries.getUserDataQuery,
    { userId },
    { cache: "no-cache" }
  );

  return result;
}
