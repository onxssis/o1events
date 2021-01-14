<template>
  <div
    class="flex flex-col relative p-3 w-64 h-64 border rounded-lg break-words"
  >
    <div class="head flex items-center justify-between">
      <div
        class="border border-gray-500 flex items-center bg-white text-xs p-1 py-px rounded-md"
      >
        <dot />
        <span class="pr-1 pl-1">online event</span>
      </div>

      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path
            d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
          />
        </svg>
      </button>
    </div>
    <div class="mid pt-6">
      <p class="uppercase text-sm mb-2 text-yellow-700">
        Sat, Jan 22, 11:08 pm
      </p>

      <p class="font-medium font-display">
        TensorFlow Hub: Models for everyone
      </p>

      <p class="text-sm"></p>
    </div>
    <div class="bottom mt-auto flex justify-between">
      <!-- <div class="flex items-center mt-6 w-full">
        <div class="shadow border-2 border-white rounded-full w-8 h-8">
          <img
            class="w-full h-full overflow-hidden object-cover rounded-full"
            src="https://dh-ui.s3.amazonaws.com/assets/photo-1564061170517-d3907caa96ea.jfif"
            alt="avatar"
          />
        </div>
        <div class="-ml-2 shadow border-2 border-white rounded-full w-8 h-8">
          <img
            class="w-full h-full overflow-hidden object-cover rounded-full"
            src="https://dh-ui.s3.amazonaws.com/assets/photo-1548958921-c5c0fe1b307d.jfif"
            alt="avatar"
          />
        </div>
        <div class="-ml-2 shadow border-2 border-white rounded-full w-8 h-8">
          <img
            class="w-full h-full overflow-hidden object-cover rounded-full"
            src="https://dh-ui.s3.amazonaws.com/assets/photo-1566753323558-f4e0952af115.jfif"
            alt="avatar"
          />
        </div>
        <p class="text-gray-600 text-sm font-normal ml-2">+2 more</p>
      </div> -->
      <div class="fav ml-auto">
        <button>
          <svg width="24" height="24">
            <path
              d="M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069 3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
