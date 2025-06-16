import { SiCodepen, SiFacebook, SiGithub, SiInstagram, SiX } from '@icons-pack/react-simple-icons'
import { Linkedin } from 'lucide-react'

export const languages = ['En', 'Es', 'Fr', 'De', 'Ru']

export const socials = [
  { href: '', icon: <SiGithub /> },
  { href: '', icon: <Linkedin /> },
  { href: '', icon: <SiX /> },
  { href: '', icon: <SiInstagram /> },
  { href: '', icon: <SiFacebook /> },
]

const Footer = () => {
  return (
    <footer className="relative flex min-h-[560px] flex-col justify-between gap-20 overflow-hidden  px-4 py-14 md:p-14">
      <div className="relative z-20 grid grid-cols-1 items-start gap-20 md:grid-cols-2 md:gap-12">
        <div>
          <h5 className="mb-8">
           <a href="/" className="flex items-center gap-3 text-white">
              <img
                src="/src/assets/websoroban_logo.png"
                className="h-6"
                alt="Logo"
              />
              <span className="text-lg font-medium text-white">Web Soroban</span>
            </a>
          </h5>
          <p className="text-[#99a1af]">
            The first free end-to-end code editor for Soroban smart contracts, designed to make development accessible and efficient for everyone.
          </p>
          <a
            href="#"
            className="mt-4 inline-flex items-center gap-2 text-xs text-white hover:underline"
          >
            More about us <span className="inline-block size-[10px] rounded-full bg-white" />
          </a>
        </div>


      </div>

      <div className="relative z-20 flex flex-col-reverse gap-20 md:grid md:grid-cols-2 md:gap-12">
        <div className="grid grid-cols-2 gap-4">
          <ul className="flex flex-col gap-4">
            {socials.map((item, index) => (
              <li key={index} className="cursor-pointer bg-transparent">
                <a
                  href={item.href}
                  className="transition-color h-full w-full text-white duration-300 hover:text-white/50"
                >
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-end gap-[200px] md:flex-row md:gap-8 md:justify-end">
          <div className="space-y-10 md:self-end">
            <div className="flex flex-col">
              <h5 className="mb-1 text-lg font-medium text-white">Contact Us</h5>
              <a
                href="mailto:johndoe@gmail.com"
                className="text-sm font-light text-[#99a1af] transition-colors duration-300 hover:text-white"
              >
                johndoe@gmail.com
              </a>
              <a
                href="tel:+92 3123456789"
                className="text-sm font-light text-[#99a1af] transition-colors duration-300 hover:text-white"
              >
                +91 3123456789
              </a>
            </div>
            <div>
              <div>
                <h5 className="mb-1 text-lg font-medium text-white">Location</h5>
                <address className="flex flex-col text-sm font-light text-[#99a1af]">
                  <span>123456, India</span>
                  <span>Delhi 22/5/8, Office 4</span>
                </address>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute top-1/2 -right-[40%] z-0 h-[120dvw] w-[120dvw] -translate-y-1/2 rounded-full bg-white/4 p-14 md:top-0 md:-right-[255px] md:-bottom-[450px] md:size-[1030px] md:-translate-y-0 md:p-20">
        <div className="size-full rounded-full bg-white/4 p-14 md:p-20">
          <div className="size-full rounded-full bg-white/5" />
        </div>
      </div>
    </footer>
  )
}

export default Footer