import { getDictionary } from "@/lib/dictionary";
import Image from "next/image";

export default async function Home() {

  const { page } = await getDictionary("fr");

  return (
    <div>
      <h1>{page.home.whyChoose}</h1>
    </div>
  );
}
