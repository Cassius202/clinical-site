import logo from '../../public/health-insurance.png'
import dnaIcon from '../../public/dna.png'
import menuIcon from '../../public/menu.png'
import heartIcon from '../../public/heart-attack.png'

const backgroundImage = 'https://qgpnibdjfvcelecddhas.supabase.co/storage/v1/object/public/assets/hero-doctor.jpg'

const heroVideo = 'https://qgpnibdjfvcelecddhas.supabase.co/storage/v1/object/public/assets/doctor-video.mp4'

export const assets = {
  logo, backgroundImage, dnaIcon, menuIcon, heartIcon, heroVideo
}

export const FEATURE_CARDS = [
  {
    icon: dnaIcon,
    title: 'Specialist-Led Care',
    body:  'Board-certified ENT physician with 12+ years of experience.',
  },
  {
    icon: heartIcon,
    title: 'Same-Week Appointments',
    body:  'Skip the long wait — book online and be seen within days.',
  },
]