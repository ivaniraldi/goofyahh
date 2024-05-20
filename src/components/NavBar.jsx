
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="flex justify-around py-1 border border-l-0 border-r-0 bg-black text-violet-100 border-b-purple-600 border-t-0 w-screen ">
    <Link
      className="hover:text-purple-400 hover:scale-125"
      to={"/"}
    >
      Home
    </Link>
    <Link
      className="hover:text-purple-400 hover:scale-125"
      to={"https://github.com/ivaniraldi/goofyahh"}
      target="_blank"
    >
      Github Code
    </Link>
    <Link
      className="hover:text-purple-400 hover:scale-125"
      to={"https://iraldidev.netlify.app"}
      target="_blank"
    >
      About
    </Link>
  </nav>
  )
}
