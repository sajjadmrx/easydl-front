import axios from "axios";
import React from "react"
export function MusicComponent(props) {
    const song = props.song;
    return (
        <div class="shadow-md flex flex-col items-center p-8 transition-colors duration-200 transform cursor-pointer group hover:bg-blue-600 rounded-xl">
            <img class="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300" src={song.photo} alt="" />

            <h1 class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">
                {song.artist}
            </h1>

            <p class="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
                {song.name}
            </p>

            <div class="flex mt-3 -mx-2">
                <a href="#" class="mx-2 text-gray-500 dark:text-gray-300 group-hover:text-gray-300" >
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                </a>
                <a href="#" class="mx-2 text-gray-500 dark:text-gray-300 group-hover:text-gray-300">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                </a>

            </div>
        </div>
    )
}

