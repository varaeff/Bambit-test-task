<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
      <div class="text-gray-700 text-lg">Идет загрузка...</div>
      <div class="animate-spin text-blue-500">
        <svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
          <path
            fill="currentColor"
            d="M14,27C6.83,27,1,21.17,1,14c0-1.56,0.27-3.08,0.81-4.52C2.1,8.7,2.96,8.31,3.74,8.59c0.78,0.29,1.17,1.15,0.88,1.93 
               C4.21,11.63,4,12.8,4,14c0,5.51,4.49,10,10,10c5.51,0,10-4.49,10-10c0-5.51-4.49-10-10-10c-0.83,0-1.5-0.67-1.5-1.5S13.17,1,14,1 
               c7.17,0,13,5.83,13,13C27,21.17,21.17,27,14,27z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>
