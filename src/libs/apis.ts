import { Booking } from "@/models/booking";
import { CreateBookingDto, Room } from "@/models/room";
import { CreateReviewDto, Review } from "./../models/review";
import { UpdateReviewDto } from "@/models/review";
import * as queries from "./sanityQueries";
import axios from "axios";
import sanityClient from "./sanity";

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
