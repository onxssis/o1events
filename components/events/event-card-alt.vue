<template>
  <div
    class="flex flex-col relative p-3 w-64 h-64 border rounded-lg break-words"
  >
    <div class="head flex items-center justify-between">
      <div class="border border-gray-800 flex text-xs p-1 py-px rounded">
        <svg
          data-swarm-icon="true"
          width="18"
          height="18"
          xmlns="http://www.w3.org/2000/svg"
          class="mr-1"
        >
          <path
            d="M11.5 4.5A1.5 1.5 0 0113 6v1.4L16 5v8l-3-2.4V12a1.5 1.5 0 01-1.5 1.5h-8A1.5 1.5 0 012 12V6a1.5 1.5 0 011.5-1.5h8z"
          ></path>
        </svg>

        <span class="pr-1">online event</span>
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
    <div class="bottom mt-auto">
      <div class="flex items-center mt-6 w-full">
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
      </div>
    </div>
  </div>
</template>
