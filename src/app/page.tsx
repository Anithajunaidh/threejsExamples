import NavBar from "@/components/LandingPage/NavBar";
// import DarkModeButton from "@/components/theme/DarkMode";
import ThemeToggle from "@/components/theme/ThemeToggleButton";
import '@/styles/global.css';

export default function Home() {
  return (
    <>
      <h1 className="text-4xl w-full bg-primary p-3 flex justify-center ">
        Template
      </h1>
      <div className="bg-primary">Hello</div>
      <NavBar/>
      {/* <DarkModeButton /> */}
      <ThemeToggle/>
      
    </>
  )
}