import React from "react";

function PrivateUserRegistration({
  names,
  setNames,
  lastName,
  setLastName,
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
  university,
  setUniversity,
  subject,
  setSubject,
  indexNr,
  setIndexNr,
  semester,
  setSemester,
  endYear,
  setEndYear,
}) {

  return (
    <>
      <div className="border-b border-gray-900/10 dark:border-gray-300 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">
          Dane osobowe
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
          Potrzebujemy twoich danych do rezerwacji praktyk i stazy w placówkach
          medycznych lub firmach. Rejestrując się w aplikacji zgadzasz się na
          przetwarzanie danych osobowych przez Femur zgodnie z RODO.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Imię/Imiona*
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                value={names}
                onChange={(e) => setNames(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                required
                maxLength="30"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Nazwisko*
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                required
                maxLength="30"
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
                maxLength="6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="univeristy"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Uczelnia
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="university"
                id="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                maxLength="100"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="faculty"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Kierunek
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="faculty"
                id="faculty"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                maxLength="100"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="index-nr"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Nr albumu/indeksu
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="index-nr"
                id="index-nr"
                value={indexNr}
                onChange={(e) => setIndexNr(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                maxLength="20"
              />
            </div>
          </div>

          <div className="sm:col-span-1">
            <label
              htmlFor="semester"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Semestr
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="semester"
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="end-year"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Rok planowanego ukończenia
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="end-year"
                id="end-year"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
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

export default PrivateUserRegistration;
