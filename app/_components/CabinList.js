import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

export default async function CabinLast({ filter }) {
  const cabins = await getCabins();

  let cabinData;
  if (filter === "all") cabinData = cabins;
  if (filter === "small")
    cabinData = cabins.filter((cabin) => cabin.maxCapacity <= 3);

  if (filter === "medium")
    cabinData = cabins.filter((cabin) => cabin.maxCapacity <= 7);
  if (filter === "large")
    cabinData = cabins.filter((cabin) => cabin.maxCapacity > 7);

  if (!cabins.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabinData?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
