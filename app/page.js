import Link from "next/link";
import Footer from "@/components/footer";
import Alerts from "@/components/Alerts";

export default function Home() {
  return (<>
    <div className="bg-gradient-to-b from-[#dae9be] to-[#c4dfaa] p-2">
      <div className="flex items-center border border-[#3b5731] py-2 px-8 rounded-xl bg-[#c7f8b5] justify-between">
        <div className="font-bold text-xl text-[#2f4627]"> CLIMATE REFUGEE CONNECT</div>
        <ul className="flex gap-8">
          <a href="/about"><li className="hover:cursor-pointer hover:font-semibold" >About</li></a>
          <li className="hover:cursor-pointer hover:font-semibold">Features</li>
          <li className="hover:cursor-pointer hover:font-semibold">Communtities</li>
         <a href="mailto:rrandomm122@gmail.com"><li className="hover:cursor-pointer hover:font-semibold">Contact Us</li></a>
        </ul>
        <Link href={'/login'}><button className="hover:cursor-pointer hover:bg-[#3b5731] hover:text-white rounded-lg border-[1px] px-6 py-2 border-[#3b5731] font-semibold text-[#2f4627]">Login</button></Link>
      </div>
      <div className="flex items-center h-[87vh] mb-4 justify-between">
        <div className="bg-[url('/BG.jpg')] bg-contain h-full w-[70%] bg-center bg-no-repeat"></div>
        <div className="h-full w-[30%] mt-3 rounded-xl border border-black">
          <Alerts/>
        </div>
      </div>
    </div>
    <Footer/>

  </>
  );
}
