import React from "react";
import {
  AcademicCapIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

function RadioChoice({ selectedOption, setSelectedOption }) {

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <ul class="grid w-full gap-6 md:grid-cols-2">
        <li>
          <input
            type="radio"
            id="private"
            name="private"
            value="private"
            class="hidden peer"
            checked={selectedOption === "private"}
            onChange={handleRadioChange}
          />
          <label
            htmlFor="private"
            className="inline-flex items-center justify-between w-full pl-7 pr-7 py-5 text-gray-500 bg-gray-50 border-2 
            border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-300 
            dark:peer-checked:text-mint peer-checked:border-grass peer-checked:text-grass dark:peer-checked:border-mint
            hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-700"
          >
            <div class="block">
              <div class="w-full text-lg font-semibold">
                Użytkownika prywatnego
              </div>
              <div class="w-full">Studenta</div>
            </div>
            <AcademicCapIcon
              className={`${
                selectedOption === "private"
                  ? "fill-grass dark:fill-mint"
                  : ""
              } h-10 w-10 ml-2 text-gray-300 hidden sm:inline-block`}
              // className="h-10 w-10 ml-2 text-gray-300 hidden sm:inline-block peer-checked:fill-mint"
              aria-hidden="true"
            />
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="company"
            name="company"
            value="company"
            class="hidden peer"
            checked={selectedOption === "company"}
            onChange={handleRadioChange}
          />
          <label
            for="company"
            className="inline-flex items-center justify-between w-full pl-7 pr-7 py-5 text-gray-500 bg-gray-50 border-2 
            border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-300 
            dark:peer-checked:text-mint peer-checked:border-grass peer-checked:text-grass dark:peer-checked:border-mint
            hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-700"
          >
            <div class="block">
              <div class="w-full text-lg font-semibold">Placówki medycznej</div>
              <div class="w-full">Firmy</div>
            </div>
            <BuildingOffice2Icon
              className={`${
                selectedOption === "company"
                  ? "fill-grass dark:fill-mint"
                  : ""
              } h-10 w-10 ml-2 text-gray-300 hidden sm:inline-block`}
              aria-hidden="true"
            />
          </label>
        </li>
      </ul>
    </>
  );
}

export default RadioChoice;
