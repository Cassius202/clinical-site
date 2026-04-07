import Doctors from "@/components/doctors/Doctors"
import Specialties from "@/components/doctors/Specialties"
import NewsLetter from "@/components/footer/NewsLetter"
import Hero from "@/components/hero/Hero"
import OfferModal from "@/components/lead modal/ModalForm"
import Services from "@/components/service/Services"
import Testimonials from "@/components/service/Testimonials"

const Home = () => {
  return (
    <div className='min-h-screen w-screen flex flex-col font-sans overflow-x-hidden'>
      <Hero />
      <OfferModal />
      <Services />
      <Specialties />
      <Doctors />
      <Testimonials />
      <NewsLetter />
    </div>
  )
}

export default Home