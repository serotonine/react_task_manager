import logo from "../assets/logo.svg";
import profile from "../assets/profile_ondine.svg";

export default function Header(){
  return (
    <header className="main-header tm_header-bottom">
      <nav className="main-header__wrapper flex justify-between items-center px-[5%] pt-6">
        <div className="logo tm_flex-jb-ic gap-2">
          <figure className="h-8 w-8 bg-transparent">
            <img className="object-cover object-center" src={logo} alt="profile" />
          </figure>
          <h3>Task Manager</h3>
          </div>
         <div className="profile tm_flex-jb-ic gap-2">
          <p className="display-large"><small>Serotonine</small></p>
           <figure className=" h-8 w-8 bg-yellow-500 border border-white rounded-full overflow-hidden">
            <img className="object-cover object-center" src={profile} alt="profile" />
          </figure>
          </div>
       </nav>
    </header>
  )
}