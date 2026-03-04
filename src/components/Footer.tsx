import bulsuLogo from "../assets/bulsu.svg";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-white border-t mt-20">
            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 items-start">

                {/* LEFT - LOGO */}
                <div className="flex items-center gap-3">
                    <img
                        src={bulsuLogo}
                        alt="BULSU"
                        className="w-10 h-10"
                    />
                    <div className="font-semibold text-gray-700">
                        BULSU COE
                    </div>
                </div>

                {/* HOME */}
                <div>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li>
                            <Link to="/departments" className="hover:text-gray-800">
                                Department
                            </Link>
                        </li>

                        <li>
                            <Link to="/#facilities" className="hover:text-gray-800">
                                Facilities
                            </Link>
                        </li>

                        <li>
                            <Link to="/#news" className="hover:text-gray-800">
                                News
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* DEPARTMENT COLUMN 1 */}
                <div>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><Link to="/dept/CE">Civil</Link></li>
                        <li><Link to="/dept/CPE">Computer</Link></li>
                        <li><Link to="/dept/ME">Mechanical</Link></li>
                    </ul>
                </div>

                {/* DEPARTMENT COLUMN 2 */}
                <div className="pt-6 md:pt-0">
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><Link to="/dept/IE">Industrial</Link></li>
                        <li><Link to="/dept/EE">Electrical</Link></li>
                        <li><Link to="/dept/ECE">Electronics</Link></li>
                        <li><Link to="/dept/MEE">Mechatronics</Link></li>
                        <li><Link to="/dept/MFE">Manufacturing</Link></li>
                    </ul>
                </div>
            </div>

            {/* COPYRIGHT */}
            <div className="text-center text-xs text-gray-500 pb-6">
                Copyright © COE. All rights reserved
            </div>
        </footer>
    );
}
