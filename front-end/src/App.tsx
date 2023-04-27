import { Link, Outlet } from "react-router-dom";
import {FaHome} from "react-icons/fa"

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="flex sticky top-0 shadow-md justify-between w-full bg-slate-300 p-3 px-10">
      <img src="logo.png" width={50} alt="industry_innovation_infrastructure" className="rounded-md shadow-md"/>
      <div className="flex justify-between items-center w-1/3">
        <Link to={`/home`} className="flex items-center hover:text-slate-700 transition-colors"><FaHome className="scale-125"></FaHome></Link>
        <Link to={`/materials`} className="hover:text-slate-700 transition-colors border-x-2 px-8">Materials</Link>
        <Link to={`/materials/add`} className="hover:text-slate-700 transition-colors border-r-2 pr-8">Add Material</Link>
        <Link to={`/materials/check`} className="hover:text-slate-700 transition-colors">Check Material</Link>
      </div>
    </nav>
  );
};
export default App;
