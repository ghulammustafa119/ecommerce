import Link from "next/link";

export default function DashboardNav() {
  return (

     <div className="bg-gray-900   max-w-screen-2xl mx-auto p-4 rounded-lg shadow-lg flex flex-col lg:flex-row items-start lg:justify-between lg:items-center">
      <ul className="flex flex-col gap-3">
        <li>
          <Link
            href="/views"
            className="flex items-center gap-2 text-white font-semibold text-lg hover:text-blue-400 transition"
          >
            Live Analytics
          </Link>
        </li>
        <li>
          <Link
            href="/order"
            className="flex items-center gap-2 text-white font-semibold text-lg hover:text-green-400 transition"
          >
            All Orders
          </Link>
        </li>
        <li>
          <Link
            href="/latest-orders"
            className="flex items-center gap-2 text-white font-semibold text-lg hover:text-yellow-400 transition"
          >
            Recent Orders
          </Link>
        </li>
        <li>
          <Link
            href="/Sales"
            className="flex items-center gap-2 text-white font-semibold text-lg hover:text-yellow-400 transition"
          >
            Sales Overview
          </Link>
        </li>
      </ul>
         <div className="lg:mr-36 mt-5 ">
           
                 <h1 className="text-md  lg:text-4xl text-white font-bold">Welcome to Admin dashboard Shop.co</h1>
                 <p className=" text-sm lg:text-lg text-white mt-2">Created by Ghulam Mustafa Bhutto</p>
              
               </div>
    </div>
  
  );
}