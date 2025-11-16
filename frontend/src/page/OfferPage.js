import React from "react";
import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../context/ApiOfferPage";
import "../styles/global.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function OfferPage() {
    const { offerId } = useParams();
    const [offer, setOffer] = useState([]);
    const userType = localStorage.getItem('type');
    const navigate = useNavigate();

    useEffect(() => {
      handleOffer();
    }, []);

    const handleOffer = async () => {
      // Wywołujemy funkcję getOffers z API, aby pobrać oferty
      const response = await api.getOffer(offerId);

      // Aktualizujemy stan ofert w komponencie
      setOffer(response?.data || []);
    };
    
    const handleCloseOffer = async () => {
      const resposne = await api.changeOfferStatus(offerId, "Zamknięta");
    }

    const handleEndOffer = async () => {
          const resposne = await api.changeOfferStatus(offerId, "Zakończona");
        };


  return (
    <>
      <Nav position={false} />
      <div className="mx-auto max-w-xl py-3 space-y-12">
        <div className="mt-10 bg-gray-50 p-6 border-1 border-spacing-3 rounded-md shadow-md dark:bg-gray-900 dark:border-gray-600 dark:border-1">
          <div className=" text-gray-900 dark:text-gray-50">
            <p className="text-2xl font-bold">{offer.name}</p>
            <div className="mb-3">
              Nr
              <div className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint">
                {offerId}
              </div>
            </div>
            <div className="mb-3">
              Status
              <div className=" bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint">
                {offer.status === "Aktywna" ? (
                  <p className="text-grass dark:text-mint animate-blink mb-0">
                    {offer.status}
                  </p>
                ) : offer.status === "Zamknięta" ? (
                  <p className="text-yellow-500 mb-0">{offer.status}</p>
                ) : offer.status === "Zakończona" ? (
                  <p className="text-red-600 mb-0">{offer.status}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="mb-3">
              <div className=" bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint">
                {userType === "private" ? (
                  offer.is_user_registered ? (
                    "Juz bierzesz udział w rekrutacji"
                  ) : (
                    <p className="text-grass dark:text-mint animate-blink mb-0">
                      Mozesz rekrutować!
                    </p>
                  )
                ) : offer.owner ? (
                  <>
                    <p className="mb-0">
                      To jest rekrutacja stworzona przez Ciebie
                    </p>
                    <Link
                      to={`/offer/${offerId}/candidats/`}
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Przeglądaj kandydatów
                    </Link>
                  </>
                ) : (
                  "Rekrutacja nalezy do innej firmy"
                )}
              </div>
            </div>
            <div className="mb-3">
              Adres
              <div className=" bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint">
                {offer.address} <br />
                {offer.city}, {offer.region}
              </div>
            </div>
            <div className="mb-3">
              Oddział
              <div className=" bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint">
                {offer.sector}
              </div>
            </div>
            <div className="mb-3">
              Data rozpoczęcia
              <div className=" bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint">
                {offer.start_date}
              </div>
            </div>
            <div className="mb-3">
              Czas trwania
              <div className=" bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint">
                {offer.duration}
              </div>
            </div>
            <div className="mb-3">
              Umowa z NFZ
              <div className=" bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint">
                {offer.nfz ? "Podpisana" : "Brak"}
              </div>
            </div>
            <div className="mb-3">
              Płatne
              <div className=" bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint">
                {offer.paid ? "TAK" : "NIE"}
              </div>
            </div>
            <div className="mb-4">
              Opis
              <div className=" bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint">
                {offer.about}
              </div>
            </div>
            <div className="sm:flex justify-center">
              {offer.is_user_registered ? (
                <p>Juz bierzesz udział w rekrutacji</p>
              ) : offer.owner ? (
                <div className="sm:flex space-x-4">
                  <button
                    className="black_btn"
                    type="button"
                    onClick={() => navigate(`/offer/edit/${offer.id}`)}
                  >
                    Edytuj
                  </button>
                  {offer.status === "Aktywna" ? (
                    <button
                      className="black_btn"
                      type="button"
                      onClick={handleCloseOffer}
                    >
                      Zamknij
                    </button>
                  ) : (
                    ""
                  )}
                  {offer.status !== "Zakończona" ? (
                    <button
                      className="black_btn"
                      type="button"
                      onClick={handleEndOffer}
                    >
                      Zakończ
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              ) : (userType==="private" ?
                <button className="black_btn" type="button">
                  Rekrutuj
                </button>
                : ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OfferPage;
