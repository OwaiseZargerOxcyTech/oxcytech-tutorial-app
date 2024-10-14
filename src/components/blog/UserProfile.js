import Image from "next/image";
import BlogUserProfile from "../../../public/blogUserProfile.jpg"
import BlogUser from "../../../public/blogUser.jpg"

export default function UserProfile() {
    return (
        <div>
            <div className="relative mb-20">
                <Image src={BlogUserProfile} alt="BlogUserProfile" className="w-full object-cover rounded-xl shadow-2xl" />
                <Image src={BlogUser} alt="BlogUser" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2  z-10  rounded-full border-4 bg-white" />
            </div>
            <div className="text-center p-2 space-y-4">
                <h1 className="text-gray-900 font-bold text-xl">Alice Qelvin</h1>
                <p className="text-gray-600 font-normal text-lg leading-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laborea aliqua.</p>
            </div>
        </div>
    )
}
