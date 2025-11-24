import { Users, PlusCircle } from "lucide-react"
import { fetchUsers } from "@/services/UserService"

interface UsersStatsBannerProps {
  data?: Awaited<ReturnType<typeof fetchUsers>>
}

export function UsersStatsBanner({ data }: UsersStatsBannerProps) {
    console.log("UsersStatsBanner data:", data);
  return (
    <div className="w-full h-48 rounded-2xl bg-gradient-to-r from-[#111827] to-[#1F2937] relative overflow-hidden shadow-lg flex items-center px-8 md:px-12 mb-8 mt-6">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-gray-800/20 to-transparent pointer-events-none" />

      {/* Left Content */}
      <div className="relative z-1 flex items-start gap-4">
        <div className="relative">
          <div className="w-14 h-14 bg-[#3B3F5C] rounded-2xl flex items-center justify-center text-[#818CF8]">
            <Users className="w-8 h-8" />
          </div>
          <div className="absolute -top-2 -right-2 bg-[#84CC16] text-white text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-[#111827]">
            {data?.data.length ?? 0}
          </div>
        </div>
        <div className="flex flex-col text-white">
          <h2 className="text-2xl font-bold">Users</h2>
          <p className="text-gray-400 text-sm mt-1">5 Users added 10Min ago</p>
        </div>
      </div>

      {/* Right Content - 3D Illustration Mockup */}
      <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2">
        <div className="relative w-32 h-32 hidden md:block">
          {/* Creating a CSS-only representation of the 3D avatar in the image */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full shadow-2xl border-4 border-gray-600/50 flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full relative overflow-hidden">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-8 bg-gray-400 rounded-t-full"></div>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-400 rounded-full"></div>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-gradient-to-br from-[#84CC16] to-[#4D7C0F] rounded-2xl rotate-12 shadow-lg flex items-center justify-center border-2 border-white/20">
            <PlusCircle className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}
