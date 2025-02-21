import EditReservation from "@/app/_components/EditReservation";
import { getBooking } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { editId: reservationId } = await params;
  const booking = await getBooking(reservationId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation ${reservationId}
      </h2>

      <EditReservation booking={booking} />
    </div>
  );
}
