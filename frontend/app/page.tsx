'use client'
import Mission from "../components/mission";
import Stats from "../components/stats";
import Button from "../components/button";
import Image from "next/image";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center bg-white pb-20">
      <Image className="absolute top-20 left-0" src="/blood_BG.png" height={550} width={550} alt="Blood Donation" />
      <div className="w-full text-end text-[#353535] text-5xl font-bold me-20 mt-40">Save Life Donate<br />Blood</div>
      <p className="w-full text-end text-black me-20">Save a life, donate blood today. Your contribution can make<br />a difference in someone&apos;s life, providing the gift of health and hope.<br />Every drop counts in the fight against life-threatening conditions.<br />Join us in our mission to save lives—because together,<br />we can make the world a better place.</p>
      <Button />
      <Mission />
      <Stats />
    </main>
  );
}
