import Nav from "../components/Nav";
import PrivateUserRegistration from "../components/registration/PrivateUserRegistration";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CompanyUserRegistration from "../components/registration/CompanyUserRegistration";
import api from "../context/ApiEditAccount";

export default function EditAccount() {
  const userType = localStorage.getItem("type");
  const [email, setEmail] = useState("");

  const [names, setNames] = useState("");
  const [lastName, setLastName] = useState("");
  const [university, setUniversity] = useState("");
  const [subject, setSubject] = useState("");
  const [indexNr, setIndexNr] = useState("");
  const [semester, setSemester] = useState("");
  const [endYear, setEndYear] = useState("");

  const [compNr, setCompNr] = useState("");
  const [compName, setCompName] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNr, setPhoneNr] = useState("");
  const [trade, setTrade] = useState(false);

  const [resume, setResume] = useState(null);
  const [downloadResume, setDownloadResume] = useState(null);

  let content = false;
  let userData = {};

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const isFormValid = () => {
    if ((names !== "" && lastName !== "") || compName !== "") {
      content = true;
    }

    return (
      email !== "" &&
      address &&
      city &&
      region &&
      postalCode &&
      phoneNr &&
      content
    );
  };

  useEffect(() => {
    handleAccountDetails();
  }, []);

  const handleAccountDetails = async () => {
    const response = await api.getAccountDetails();
    const data = response?.data || [];
    console.log(data);
    if (userType === "private") {
      setEmail(data.email);
      setAddress(data.address);
      setCity(data.city);
      setRegion(data.region);
      setPostalCode(data.postal_code);
      setPhoneNr(data.phone_nr);
      setNames(data.first_name);
      setLastName(data.last_name);
      setTrade(data.trade);
      setUniversity(data.university);
      setSubject(data.subject);
      setIndexNr(data.index_nr);
      setSemester(data.semester);
      setEndYear(data.end_year);
      setDownloadResume(data.resume);
    } else if (userType === "company") {
      setEmail(data.email);
      setAddress(data.address);
      setCity(data.city);
      setRegion(data.region);
      setPostalCode(data.postal_code);
      setPhoneNr(data.phone_nr);
      setTrade(data.trade);
      setCompNr(data.company_nr);
      setCompName(data.company_name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      if (userType === "private") {
        userData = {
          email: email,
          address: address,
          city: city,
          region: region,
          postal_code: postalCode,
          phone_nr: phoneNr,
          first_name: names,
          last_name: lastName,
          trade: trade,
          university: university,
          subject: subject,
          index_nr: indexNr,
          semester: semester,
          end_year: endYear,
          resume: resume
        };
      } else if (userType === "company") {
        userData = {
          email: email,
          address: address,
          city: city,
          region: region,
          postal_code: postalCode,
          phone_nr: phoneNr,
          trade: trade,
          company_nr: compNr,
          company_name: compName,
        };
      }
      api.postAccountDetails(userData, navigate);
    }
  };

  // https://stackoverflow.com/questions/50694881/how-to-download-file-in-react-js
  const handleDownloadResume = async () => {
    try {
      const response = await api.getResumeFile();

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
      console.error("Błąd podczas pobierania résumé:", error);
    }
  };

  const handleDeleteResume = async () => {
  try {
    // Wyślij żądanie usunięcia résumé
    await api.deleteResume();
    
    // Zaktualizuj stan w komponencie po usunięciu résumé
    setDownloadResume(null);
    setResume(null);
  } catch (error) {
    console.error("Błąd podczas usuwania resume:", error);
  }
};

  return (
    <>
      <Nav position={false} />
      <form className="mx-auto max-w-3xl py-5" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 dark:border-gray-300 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">
              Moje konto
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Email
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                      placeholder="email@xyz.com"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {userType === "private" ? (
            <PrivateUserRegistration
              names={names}
              setNames={setNames}
              lastName={lastName}
              setLastName={setLastName}
              address={address}
              setAddress={setAddress}
              city={city}
              setCity={setCity}
              region={region}
              setRegion={setRegion}
              postalCode={postalCode}
              setPostalCode={setPostalCode}
              phoneNr={phoneNr}
              setPhoneNr={setPhoneNr}
              university={university}
              setUniversity={setUniversity}
              subject={subject}
              setSubject={setSubject}
              indexNr={indexNr}
              setIndexNr={setIndexNr}
              semester={semester}
              setSemester={setSemester}
              endYear={endYear}
              setEndYear={setEndYear}
            />
          ) : (
            ""
          )}
          {userType === "company" ? (
            <CompanyUserRegistration
              address={address}
              setAddress={setAddress}
              city={city}
              setCity={setCity}
              region={region}
              setRegion={setRegion}
              postalCode={postalCode}
              setPostalCode={setPostalCode}
              phoneNr={phoneNr}
              setPhoneNr={setPhoneNr}
              compName={compName}
              setCompName={setCompName}
              compNr={compNr}
              setCompNr={setCompNr}
            />
          ) : (
            ""
          )}

          {downloadResume === null ? (
            <div className="mt-6 space-y-6">
              <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
                Załącz CV
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  name="resume"
                  onChange={handleFileChange}
                  accept=".pdf, .doc, .docx"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                />
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              <div className="mt-2 flex items-center">
                <button
                  className="bg-grass dark:bg-mint px-3 py-2 text-sm font-semibold 
        text-gray-50 rounded-md hover:bg-white hover:text-grass 
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
        focus-visible:outline-grass mr-4"
                  onClick={handleDownloadResume}
                  type="button"
                >
                  Pobierz moje cv
                </button>

                <button
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50"
                  onClick={handleDeleteResume}
                  type="button"
                >
                  Usuń moje cv
                </button>
              </div>
            </div>
          )}

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">
              Zgody
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Zakładając konto w portalu Femur zawsze będziesz otrzymywać
              niezbędne powiadomienia związane z utrzymaniem i funkcjonowaniem
              Twojego profilu.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50">
                  Potwierdzam:
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="trade-info-acceptation"
                        name="trade-info-acceptation"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-grass focus:ring-gras dark:text-mint dark:focus:ring-mint"
                        checked={trade}
                        onChange={(e) => setTrade(e.target.checked)}
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="trade-info-acceptation"
                        className="font-medium text-gray-900 dark:text-gray-50"
                      >
                        Otrzymywanie treści handlowych i promocyjnych na podany
                        adres email
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
              <br />
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
            disabled={() => !isFormValid()}
            className="rounded-md bg-grass dark:bg-mint px-3 py-2 text-sm font-semibold 
            text-gray-50 shadow-sm hover:bg-white hover:text-grass focus-visible:outline focus-visible:outline-2 
            focus-visible:outline-offset-2 focus-visible:outline-grass"
          >
            Edytuj konto
          </button>
        </div>
      </form>
    </>
  );
}
