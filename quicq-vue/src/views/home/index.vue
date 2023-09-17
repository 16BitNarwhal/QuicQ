<template>
  <div>
    <div class="relative pt-48 pb-12 bg-black xl:pt-60 sm:pb-16 lg:pb-32 xl:pb-48 2xl:pb-56">
      <header class="absolute inset-x-0 top-0 z-10 py-8 xl:py-12">
        <div class="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
          <div class="flex items-center justify-between">
            <div class="flex flex-shrink-0">
              <a href="#" title="QuikQ"
                class="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-secondary focus:ring-primary">
                <span class="font-serif italic font-normal text-xl text-white">QuikQ</span>
              </a>
            </div>

            <div class="md:hidden">
              <button type="button"
                class="p-2 -m-2 transition-all duration-200 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary focus:ring-offset-secondary">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            <div class="hidden md:flex md:items-center md:space-x-10 lg:ml-28">
              <a href="/documentation" title=""
                class="font-sans text-base font-normal transition-all duration-200 rounded text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary focus:ring-offset-secondary">
                Documentation </a>

              <a href="/dashboard" title="" class="
                              inline-flex
                              items-center
                              justify-center
                              px-5
                              py-2
                              font-sans
                              text-base
                              font-normal
                              leading-7
                              transition-all
                              duration-200
                              border-2
                              rounded-full
                              text-white
                              border-primary
                              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary
                              hover:bg-white hover:text-black
                              focus:ring-offset-secondary
                          ">
                Go to Dashboard
              </a>
            </div>
          </div>
        </div>
      </header>

      <div class="absolute inset-0">
        <el-carousel height="100vh">
          <el-carousel-item>
            <img class="object-cover w-full h-full"
              src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/11/08/13/GettyImages-483115336.jpg"
              alt="" />
          </el-carousel-item>
          <el-carousel-item>
            <img class="object-cover w-full h-full"
              src="@\assets\images\sherlock-5119102_1920.jpg" alt="" />
          </el-carousel-item>
        </el-carousel>

      </div>

      <div class="relative">
        <div class="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
          <div class="w-full lg:w-2/3 xl:w-1/2">
            <h1 class="font-sans italic text-lg tracking-tight text-white text-opacity-100">We re-define queues.
            </h1>
            <p class="mt-6 tracking-tighter text-white">
              <span class="font-sans font-normal text-7xl">Q up today with</span><br />
              <span class="font-serif italic font-normal text-9xl">QuikQ</span>
            </p>
            <p class="mt-12 font-sans italic text-lg leading-7 text-white text-opacity-100">QuikQ provides you with
              real-time queue statistics
              including guests number, estimated waiting time, most busy hours and more for your to explore!
            </p>
            <p class="mt-8 font-sans text-xl font-normal text-white">Check it out at our user-friendly dashboard!</p>

            <div class="flex items-center mt-5 space-x-3 sm:space-x-4">
              <a href="/dashboard" title="" class="
                              inline-flex
                              items-center
                              justify-center
                              px-5
                              py-2
                              font-sans
                              text-base
                              font-semibold
                              transition-all
                              duration-200
                              border-2 border-transparent
                              rounded-full
                              sm:leading-8
                              bg-white
                              sm:text-lg
                              text-black
                              hover:bg-opacity-90
                              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-secondary
                          " role="button">
                Go to Dashboard
              </a>

              <a href="/video" title="" class="
                              inline-flex
                              items-center
                              justify-center
                              px-5
                              py-2
                              font-sans
                              text-base
                              font-semibold
                              transition-all
                              duration-200
                              bg-transparent
                              border-2
                              rounded-full
                              sm:leading-8
                              text-white
                              border-primary
                              hover:bg-white
                              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                              hover:text-black
                              sm:text-lg
                              focus:ring-offset-secondary
                          " role="button">
                <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8.0416 4.9192C7.37507 4.51928 6.5271 4.99939 6.5271 5.77669L6.5271 18.2232C6.5271 19.0005 7.37507 19.4806 8.0416 19.0807L18.4137 12.8574C19.061 12.469 19.061 11.5308 18.4137 11.1424L8.0416 4.9192Z" />
                </svg>
                Watch Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
  
<script setup lang="ts">

</script>
  
<style></style>