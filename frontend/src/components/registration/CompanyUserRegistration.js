import React from 'react'
import { useState } from "react";

function CompanyUserRegistration({
  address,
  setAddress,
  city,
  setCity,
  region,
  setRegion,
  postalCode,
  setPostalCode,
  phoneNr,
  setPhoneNr,
  compNr,
  compName,
  setCompNr,
  setCompName
}) {
  const [selectedOption, setSelectedOption] = useState(false);

  const checkboxChange = (event) => {
    setSelectedOption(!selectedOption);
  };

  return (
    <>
      <div className="border-b border-gray-900/10 dark:border-gray-300 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">
          Dane firmy
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
          Rejestrując się w aplikacji zgadzasz się na przetwarzanie danych przez
          Femur zgodnie z RODO. W celu uwierzytelnienia konta (potwierdzenia
          danych) po udanej rejestracji skontaktuj się z supportem aplikacji.
          Oświadczas, ze jestes prawnym przedstawicielem firmy.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3 flex items-center">
            <div className="flex h-6 items-center mr-2">
              <input
                id="comp-nr-check"
                name="comp-nr-check"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-grass focus:ring-gras dark:text-mint dark:focus:ring-mint"
                checked={selectedOption === true}
                onChange={checkboxChange}
              />
            </div>
            <div className="text-sm leading-6">
              <label
                htmlFor="comp-nr-check"
                className="font-medium text-gray-900 dark:text-gray-50"
              >
                Firma nie posiada numeru NIP/REGON.
              </label>
            </div>
          </div>

          {selectedOption === false ? (
            <div className="sm:col-span-3">
              <label
                htmlFor="comp-nr"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
              >
                NIP/REGON*
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="comp-nr"
                  id="comp-nr"
                  value={compNr}
                  onChange={(e) => setCompNr(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                  required
                  maxLength="20"
                />
              </div>
            </div>
          ) : (
            ""
          )}

          {selectedOption === true ? setCompNr(null) : ""}

          <div className="sm:col-span-6">
            <label
              htmlFor="comp-name"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Nazwa firmy*
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="comp-name"
                id="comp-name"
                value={compName}
                onChange={(e) => setCompName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                required
                maxLength="100"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="address"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Adres*
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="address"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                required
                maxLength="60"
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Miasto*
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                required
                maxLength="60"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="region"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Województwo*
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="region"
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                required
                maxLength="60"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Kod pocztowy*
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                placeholder="XX-XXX"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="phone-nr"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Nr telefonu kontaktowego*
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="phone-nr"
                id="phone-nr"
                value={phoneNr}
                onChange={(e) => setPhoneNr(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                placeholder="+48 XXX XXX XXX"
                required
                maxLength="15"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyUserRegistration