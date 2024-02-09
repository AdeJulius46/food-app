import Link from "next/link";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeader from "../components/layout/SectionHeader";


export default function Home() {
  return (
   <>
<Hero />
<HomeMenu/>
<section className="text-center  my-16">
  <SectionHeader
  subHeader={"Our Story"}
  mainHeader={"About us"}
  
  />
  <div className="max-w-md  mx-auto mt-4 text-gray-500 mt-4 flex-col gap-4 ">

   <p className="">
    Lorem  jhjdyuhjhed i  whs8hduwoywhud udyetdt twedtqid 7tdqtdg oudbvet ygekjude gdqdqduqd 8dyqod eg;ijfeygf6 hshedfdelsludgedg dgdhgdetdq ehduehdoqidhf hgedisugd uhsh8gJHUDH AHSUIDUGusahdgf hfuhid
   </p>
   <p className="">
    Lorem  jhjdyuhjhed i  whs8hduwoywhud udyetdt twedtqid 7tdqtdg oudbvet ygekjude gdqdqduqd 8dyqod eg;ijfeygf6 hshedfdelsludgedg dgdhgdetdq ehduehdoqidhf hgedisugd uhsh8gJHUDH AHSUIDUGusahdgf hfuhid
   </p>
  </ div>
</section>
<section className="text-center my-8">
  <SectionHeader
  subHeader={"Dont hesitate"}
  mainHeader={"Contact us"}
  />
  <div className="mt-8">

  <a  href="tel:+2348104303528"  
  className="text-4xl underline text-gray-500"  >08104303528</a>
  </div>
</section>

   </>
  );
}
