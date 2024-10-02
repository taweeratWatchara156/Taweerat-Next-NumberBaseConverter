import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';

export default function Navbar() {
    return (
        <div className="nav flex mx-auto mt-3 lg:w-3/4 w-11/12 md:py-5 py-4 rounded-full md:justify-center justify-between items-center border relative duration-500">
            <h1 className="text-white font-bold md:text-base text-xs md:ml-0 ml-5">Number Base Converter</h1>
            <div className="flex gap-3 justify-center items-center w-fit md:mr-10 mr-5 h-full top-0 md:absolute relative md:text-3xl text-xl right-0">
                <a href="https://www.instagram.com/taweeratzzz/" target='_blank'><FontAwesomeIcon icon={faInstagramSquare} className=' text-gray-50'/></a>
                <a href="https://www.facebook.com/taweerat.poom/" target='_blank'><FontAwesomeIcon icon={faFacebookSquare} className=' text-gray-50'/></a>
            </div>
        </div>
    );
}