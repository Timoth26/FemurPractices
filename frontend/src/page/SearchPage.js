import React from "react";
import Nav from "../components/Nav";
import { getOffers } from "../context/ApiSearchPage";
import { useState, useEffect } from "react";
import "../styles/global.css";
import "../styles/SearchPage.css"
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [activeRecruitations, setActiveRecruitations] = useState(true);
  const userType = localStorage.getItem("type");
  const [searchParams, setSearchParams] = useState({
    name: "",
    region: "",
    city: "",
    sector: "",
    duration: "",
    status: activeRecruitations ? "Aktywna" : "",
    nfz: null,
    my_recruitations: null,
    owner: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: type === "checkbox" ? checked : value,
      status:
        name === "activeRecruitations"
          ? checked
            ? "Aktywna"
            : ""
          : prevParams.status,
      nfz: name === "nfz" ? (checked ? true : null) : prevParams.nfz,
      my_recruitations:
        name === "my_recruitations"
          ? checked
            ? true
            : null
          : prevParams.my_recruitations,
        owner:
          name === "owner"
            ? checked
              ? true
              : null
            : prevParams.owner,
    }));
  };

  useEffect(() => {
    handleSearch();
  }, [searchParams]);


  const handleSearch = async () => {
    // Wywołujemy funkcję getOffers z API, aby pobrać oferty
    const response = await getOffers(searchParams);

    // Aktualizujemy stan ofert w komponencie
  setOffers(response?.data || []);
  };

  return (
    <>
      <Nav position={false} />
      <div className="container mx-auto mt-10">
        <div className="shared-container-style">
          <div className="sm:col-span-1 transition-all duration-500 ease-in-out transform hover:scale-105">
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
              placeholder="Nazwa"
              value={searchParams.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="sm:col-span-1 transition-all duration-500 ease-in-out transform hover:scale-105">
            <input
              type="text"
              name="region"
              id="region"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
              placeholder="Województwo"
              value={searchParams.region}
              onChange={handleInputChange}
            />
          </div>
          <div className="sm:col-span-1 transition-all duration-500 ease-in-out transform hover:scale-105">
            <input
              type="text"
              name="city"
              id="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
              placeholder="Miasto"
              value={searchParams.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="sm:col-span-1 transition-all duration-500 ease-in-out transform hover:scale-105">
            <input
              type="text"
              name="sector"
              id="sector"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
              placeholder="Oddział"
              value={searchParams.sector}
              onChange={handleInputChange}
            />
          </div>
          <div className="sm:col-span-1 transition-all duration-500 ease-in-out transform hover:scale-105">
            <select
              name="duration"
              id="duration"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50"
              onChange={handleInputChange}
              value={searchParams.duration}
            >
              <option value="">Czas trwania</option>
              <option value="Mniej niz miesiąc">Mniej niz miesiąc</option>
              <option value="1 miesiąc">1 miesiąc</option>
              <option value="2-3 miesiące">2-3 miesiące</option>
              <option value="2-3 miesiące">2-3 miesiące</option>
              <option value="4-6 miesięcy">4-6 miesięcy</option>
              <option value="6-12 miesięcy">6-12 miesięcy</option>
              <option value="Więcej niz 1 rok">Więcej niz 1 rok</option>
            </select>
          </div>

          <div className="sm:col-span-1 flex items-center">
            <input
              id="activeRecruitations"
              name="activeRecruitations"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-grass focus:ring-gras dark:text-mint dark:focus:ring-mint"
              checked={activeRecruitations}
              onChange={(e) => {
                setActiveRecruitations(e.target.checked);
                handleInputChange(e);
              }}
              defaultChecked
            />

            <label
              htmlFor="activeRecruitations"
              className="font-medium text-gray-900 dark:text-gray-50 ml-2"
            >
              Rekrutacje aktywne
            </label>
          </div>

          <div className="sm:col-span-1 flex items-center">
            <input
              id="nfz"
              name="nfz"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-grass focus:ring-gras dark:text-mint dark:focus:ring-mint"
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            <label
              htmlFor="nfz"
              className="font-medium text-gray-900 dark:text-gray-50 ml-2"
            >
              Umowa z NFZ
            </label>
          </div>
          {userType === "private" ? (
            <div className="sm:col-span-1 flex items-center">
              <input
                id="my_recruitations"
                name="my_recruitations"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-grass focus:ring-gras dark:text-mint dark:focus:ring-mint"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <label
                htmlFor="my_recruitations"
                className="font-medium text-gray-900 dark:text-gray-50 ml-2"
              >
                Pokaz tylko rekrutacje w których biorę udział
              </label>
            </div>
          ) : (
            <div className="sm:col-span-1 flex items-center">
              <input
                id="owner"
                name="owner"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-grass focus:ring-gras dark:text-mint dark:focus:ring-mint"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <label
                htmlFor="owner"
                className="font-medium text-gray-900 dark:text-gray-50 ml-2"
              >
                Pokaz tylko moje rekrutacje
              </label>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-gray-50 p-6 border-1 border-spacing-3 rounded-md shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 dark:bg-gray-900 dark:border-gray-600 dark:border-1 text-gray-900 dark:text-gray-50"
              onClick={() => navigate(`/offer/${offer.id}`)}
            >
              <h2 className="text-xl font-semibold mb-2">{offer.name}</h2>
              <p>
                {offer.city}, {offer.region}
              </p>
              <p>od {offer.start_date}</p>
              <p>Czas trwania: {offer.duration}</p>
              <p>Oddział: {offer.sector}</p>
              <p>NFZ: {offer.nfz ? "TAK" : "NIE"}</p>
              {offer.status === "Aktywna" ? (
                <p className="text-grass dark:text-mint animate-blink">
                  {offer.status}
                </p>
              ) : offer.status === "Zamknięta" ? (
                <p className="text-yellow-500">{offer.status}</p>
              ) : offer.status === "Zakończona" ? (
                <p className="text-red-600">{offer.status}</p>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchPage;
