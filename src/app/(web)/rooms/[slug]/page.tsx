"use client";

import { AiOutlineMedicineBox } from "react-icons/ai";
import { getRoom } from "@/libs/apis";
import { getStripe } from "@/libs/stripe";
import { GiSmokeBomb } from "react-icons/gi";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import { MdOutlineCleaningServices } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import BookRoomCta from "@/components/BookRoomCta/BookRoomCta";
import HotelPhotoGallery from "@/components/HotelPhotoGallery/HotelPhotoGallery";
import LoadingSpinner from "../../loading";
import toast from "react-hot-toast";
import useSWR from "swr";

const RoomDetails = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [noOfChildren, setNoOfChildren] = useState(0);

  const fetchRoom = async () => getRoom(slug);

  const { data: room, error, isLoading } = useSWR("/api/room", fetchRoom);

  // Getting API response
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Validate API response
  if (error || (!isLoading && room === undefined)) {
    throw new Error("Cannot fetch data");
  }

  /**
   * Function to calculate the minimum checkout date based on the check-in date.
   *
   * @return {Date | null} The next checkout date if check-in date is provided, otherwise null.
   */
  const calcMinCheckoutDate = (): Date | null => {
    if (checkinDate) {
      const nextDay = new Date(checkinDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    }

    return null;
  };

  /**
   * Handle the click event for booking now.
   *
   * @returns {Promise<void>}
   */
  const handleBookNowClick = async (): Promise<void> => {
    // Validate dates
    if (!checkinDate || !checkoutDate) {
      toast.error("Please provide checkin / checkout date");
      return;
    }

    if (checkinDate > checkoutDate) {
      toast.error("Please choose a valid checkin period");
      return;
    }

    // Validate room data
    if (room === undefined) {
      toast.error("Cannot fetch data");
      return;
    }

    const numberOfDays = calcNumDays();

    const hotelRoomSlug = room.slug.current;

    const stripe = await getStripe();

    try {
      const { data: stripeSession } = await axios.post("/api/stripe", {
        checkinDate,
        checkoutDate,
        adults,
        children: noOfChildren,
        numberOfDays,
        hotelRoomSlug,
      });

      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          toast.error("Payment Failed");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("An error occured");
    }
  };

  const calcNumDays = () => {
    if (!checkinDate || !checkoutDate) {
      return;
    }

    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));

    return noOfDays;
  };

  // N/A
  if (!room) {
    return (
      <div className="container mx-auto mt-20">
        <div className="md:grid md:grid-cols-12 gap-10 px-3">
          <div className="md:col-span-8 md:w-full">
            <div className="shadow dark:shadow-white rounded-lg p-6">
              <h2 className="font-bold text-left text-lg md:text-2xl">
                No data available for this room
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HotelPhotoGallery photos={room.images} />

      <div className="container mx-auto mt-20">
        <div className="md:grid md:grid-cols-12 gap-10 px-3">
          <div className="sm:col-span-12 lg:col-span-8 md:w-full">
            <div>
              {/* Room name */}
              <h2 className="font-bold text-2xl text-left mb-11">
                {room.name}
              </h2>

              {/* Room description */}
              <div className="mb-11">
                <h2 className="font-bold text-xl mb-2">Description</h2>
                <p>{room.description}</p>
              </div>

              {/* Offered Amenities */}

              <div className="mb-11">
                <h2 className="font-bold text-xl mb-2">Offered Amenities</h2>
                <div className="grid grid-cols-2">
                  {
                    // Validate if room has offeredAmenities
                    room.offeredAmenities &&
                      room.offeredAmenities.length > 0 &&
                      room.offeredAmenities.map((amenity) => (
                        <div
                          key={amenity._key}
                          className="flex items-center my-1"
                        >
                          <i className={`fa-solid ${amenity.icon}`}></i>
                          <p className="text-xs md:text-base ml-2">
                            {amenity.amenity}
                          </p>
                        </div>
                      ))
                  }
                </div>
              </div>

              {/* Safety and Hygiene */}

              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">Safety And Hygiene</h2>
                <div className="grid grid-cols-2">
                  <div className="flex items-center my-1 md:my-0">
                    <MdOutlineCleaningServices />
                    <p className="ml-2 md:text-base text-xs">Daily Cleaning</p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <LiaFireExtinguisherSolid />
                    <p className="ml-2 md:text-base text-xs">
                      Fire Extinguishers
                    </p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <AiOutlineMedicineBox />
                    <p className="ml-2 md:text-base text-xs">
                      Disinfections and Sterilizations
                    </p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <GiSmokeBomb />
                    <p className="ml-2 md:text-base text-xs">Smoke Detectors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-12 lg:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow-auto">
            <BookRoomCta
              discount={room.discount}
              price={room.price}
              specialNote={room.specialNote}
              checkinDate={checkinDate}
              setCheckinDate={setCheckinDate}
              checkoutDate={checkoutDate}
              setCheckoutDate={setCheckoutDate}
              calcMinCheckoutDate={calcMinCheckoutDate}
              adults={adults}
              noOfChildren={noOfChildren}
              setAdults={setAdults}
              setNoOfChildren={setNoOfChildren}
              isBooked={room.isBooked}
              handleBookNowClick={handleBookNowClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
