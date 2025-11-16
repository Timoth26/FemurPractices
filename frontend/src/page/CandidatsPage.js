import React from "react";
import Nav from "../components/Nav";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../context/ApiCandidats";

function CandidatsPage () {
  const [candidats, setCandidats] = useState([]);
  const { offerId } = useParams();
  console.log("tutaj", offerId);

  useEffect(() => {
    handleCandidats();
  }, []);

  const handleCandidats = async () => {
    const response = await api.getCandidats(offerId);

    setCandidats(response?.data || []);
  };

  // https://stackoverflow.com/questions/50694881/how-to-download-file-in-react-js
  const handleDownloadResume = async (id) => {
    try {
      const response = await api.getResumeFile(id);

      // Utwórz obiekt Blob z danych odpowiedzi
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Utwórz link do pobrania pliku
      const downloadLink = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      downloadLink.href = url;

      // Ustaw nazwę pliku
      downloadLink.setAttribute("download", "resume.pdf");

      // Dodaj link do DOM
      document.body.appendChild(downloadLink);

      // Kliknij link, aby uruchomić pobieranie
      downloadLink.click();

      // Usuń link z DOM
      document.body.removeChild(downloadLink);

      // Zwolnij zasoby URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Błąd podczas pobierania resume:", error);
    }
  };

  return (
    <>
      <Nav position={false} />
      <div class="mx-auto max-w-4xl py-3 space-y-12 mt-10">
        <table class="rounded-lg overflow-hidden w-full text-sm text-left bg-gray-50 shadow-md dark:bg-gray-900">
          <thead
            class="text-xs uppercase bg-gray-200 shadow-md border-gray-300 dark:bg-gray-900 dark:border-gray-600
             dark:text-gray-50 text-gray-900 dark:border-2 border-2"
          >
            <tr>
              <th scope="col" class="px-6 py-3">
                Imię i nazwisko
              </th>

              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Nr telefonu
              </th>
              <th scope="col" class="px-6 py-3">
                Uczelnia
              </th>
              <th scope="col" class="px-6 py-3">
                Kierunek
              </th>
              <th scope="col" class="px-6 py-3">
                Semestr
              </th>
              <th scope="col" class="px-6 py-3">
                Planowy koniec studiów
              </th>
              <th scope="col" class="px-6 py-3">
                CV
              </th>
            </tr>
          </thead>
          <tbody>
            {candidats.map((candidat) => (
              <tr class="bg-gray-50 border-2 border-b border-l border-r border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-50">
                {/* className="bg-gray-50 border border-gray-300 text-gray-900
                  sm:text-sm rounded-lg focus:ring-grass focus:border-grass
                  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400 dark:text-gray-50
                  dark:focus:ring-mint dark:focus:border-mint" */}
                <td class="px-6 py-4">
                  {candidat.first_name} {candidat.last_name}
                </td>
                <td class="px-6 py-4">{candidat.email}</td>
                <td class="px-6 py-4">{candidat.phone_nr}</td>
                <td class="px-6 py-4">{candidat.university}</td>
                <td class="px-6 py-4">{candidat.subject}</td>
                <td class="px-6 py-4">{candidat.semester}</td>
                <td class="px-6 py-4">{candidat.end_year}</td>
                <td class="px-6 py-4">
                  {candidat.resume ? (
                    <button
                      type="button"
                      className="hover:text-mint"
                      onClick={() => handleDownloadResume(candidat.id)}
                    >
                      Pobierz
                    </button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CandidatsPage;
