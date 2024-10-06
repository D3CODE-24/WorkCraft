import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-black text-white mb-0 mt-0">
    <div className="container mx-auto ">
    <div className="flex items-center justify-between h-16">
    <Link to="/" className="hover:text-blue-200 text-2xl">WorkCraft</Link>
    <ul className="flex space-x-4  ">
    <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
    <li><Link to="/jobs" className="hover:text-blue-200">Jobs</Link></li>
    <li><Link to="/marketplace" className="hover:text-blue-200">Marketplace</Link></li>
    <li><Link to="/learn" className="hover:text-blue-200">Learn</Link></li>
    <li><Link to="/market-analysis" className="hover:text-blue-200 " >MarketAnalysis</Link></li>
    </ul>
    </div>
    </div>
    </nav>
  )
}

export default Navbar
