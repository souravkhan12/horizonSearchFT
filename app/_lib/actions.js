// server actions
"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const [nationality, country] = formData.get("nationality").split("%");
  const nationalID = formData.get("nationalID");

  const nationalIdRegex = /^[A-Za-z0-9]{6,12}$/;
  if (!nationalIdRegex.test(nationalID))
    throw new Error("Please provide a valid nationalID");

  const updateData = { nationality, country, nationalID };
  const data = await updateGuest(session.user.guestId, updateData);
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId)) {
    throw new Error("You are not allowed to delete this Booking");
  }

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function editReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const guestBookings = await getBookings(session.user.guestId);

  const numGuests = formData.get("numGuests");
  const reservationId = formData.get("id");
  const observations = formData.get("observations");

  const updateValues = { numGuests, observations };

  const booking = guestBookings.filter(
    (booking) => booking.id == reservationId
  );
  updateBooking(reservationId, updateValues);
  revalidatePath(`/account/reservations/edit/${reservationId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
