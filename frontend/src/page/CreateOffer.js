import React from "react";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import apiCreate from "../context/ApiCreateOffer";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../context/ApiOfferPage";

function CreateOffer() {
    const navigate = useNavigate();
    const location = useLocation();
    const isCreate = location.pathname.includes("/edit/");
    const { offerId } = useParams();

      const [data, setData] = useState({
        name: "",
        city: "",
        region: "",
        address: "",
        sector: "",
        duration: "",
        start_date: "",
        nfz: false,
        status: "Aktywna",
        paid: false,
        about: "",
      });

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Wysyłam dane:", data);
      {isCreate ? apiCreate.editOffer(data, offerId) : 
      apiCreate.apiCreateOffer(data);
      }
      navigate('/search')
    };

      useEffect(() => {
        handleOffer();
      }, []);

      const handleOffer = async () => {
        if (isCreate){
        const response = await api.getOffer(offerId);
    setData((prevData) => ({
      ...prevData,
      ...response?.data, // Aktualizujemy tylko istniejące klucze
    }));        }
      };

  return (
    <>
      <Nav position={false} showButtons={false} />
      <form className="mx-auto max-w-3xl py-5" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="border-b border-gray-900/10 dark:border-gray-300 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50 border-b border-gray-900/10 dark:border-gray-300">
              Stwórz nową rekrutację!
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {isCreate ? (
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                  >
                    Nr oferty
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={offerId}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="sm:col-span-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Nazwa*
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={data.name}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Miasto*
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={data.city}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Województwo*
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      value={data.region}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Adres*
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={data.address}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="sector"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Oddział*
                </label>
                <div className="mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="sector"
                      id="sector"
                      value={data.sector}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Czas trwania*
                </label>
                <div className="mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <select
                      name="duration"
                      id="duration"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50"
                      required
                      value={data.duration}
                      onChange={handleInputChange}
                    >
                      <option value="1">Mniej niz miesiąc</option>
                      <option value="2">1 miesiąc</option>
                      <option value="3">2-3 miesiące</option>
                      <option value="4">2-3 miesiące</option>
                      <option value="5">4-6 miesięcy</option>
                      <option value="6">6-12 miesięcy</option>
                      <option value="7">Więcej niz 1 rok</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="start_date"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Data rozpoczęcia
                </label>
                <div className="mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="start_date"
                      id="start_date"
                      value={data.start_date}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                      placeholder="RRRR-MM-DD"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="nfz"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Umowa z NFZ*
                </label>
                <div className="mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <select
                      name="nfz"
                      id="nfz"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50"
                      required
                      value={data.nfz}
                      onChange={handleInputChange}
                    >
                      <option value={false}>NIE</option>
                      <option value={true}>TAK</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Status*
                </label>
                <div className="mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <select
                      name="status"
                      id="status"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50"
                      required
                      value={data.status}
                      onChange={handleInputChange}
                    >
                      <option value="Aktywna">Aktywna</option>
                      <option value="Zamknięta">Zamknięta</option>
                      <option value="Zakończona">Zakończona</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="paid"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Czy płatne?*
                </label>
                <div className="mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <select
                      name="paid"
                      id="paid"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50"
                      required
                      value={data.paid}
                      onChange={handleInputChange}
                    >
                      <option value={false}>NIE</option>
                      <option value={true}>TAK</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <label
              htmlFor="about"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Opis
            </label>
            <div className="mt-1">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <textarea
                  type="text"
                  name="about"
                  id="about"
                  value={data.about}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50"
            onClick={() => navigate("/")}
          >
            Anuluj
          </button>
          <button
            type="submit"
            className="rounded-md bg-grass dark:bg-mint px-3 py-2 text-sm font-semibold 
            text-gray-50 shadow-sm hover:bg-white hover:text-grass focus-visible:outline focus-visible:outline-2 
            focus-visible:outline-offset-2 focus-visible:outline-grass"
          >
            {isCreate ? "Edytuj ofertę" : "Stwórz ofertę"}
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateOffer;
