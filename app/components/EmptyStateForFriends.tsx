const EmptyStateForFriends = () => {
  return (
    // <div
    //   className="
    //     px-4
    //     py-10
    //     sm:px-6
    //     lg:px-8
    //     lg:py-6
    //     h-full
    //     flex
    //     justify-center
    //     items-center
    //     bg-gray-100
    //   "
    // >
    //   <div className="text-center items-center flex flex-col">
    //     <h3 className="mt-2 text-2xl font-semibold text-gray-900">
    //       Select a chat or start a new conversation
    //     </h3>
    //   </div>
    // </div>
    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-green-900 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        LET&apos;S START CHATING
      </p>
    </div>
  )
}

export default EmptyStateForFriends
