import Nav from "../Nav";
import RadioChoice from "../RadioChoice";
import PrivateUserRegistration from "./PrivateUserRegistration";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyUserRegistration from "./CompanyUserRegistration";
import registerUser from "./ApiRegistration";

export default function Registration() {

  const [selectedOption, setSelectedOption] = useState("private");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [personalDataAccepted, setPersonalDataAccepted] = useState(false);

  const [names, setNames] = useState("");
  const [lastName, setLastName] = useState("");
  const [university, setUniversity] = useState("");
  const [subject, setSubject] = useState("");
  const [indexNr, setIndexNr] = useState("");
  const [semester, setSemester] = useState("");
  const [endYear, setEndYear] = useState("");

  const [compNr, setCompNr] = useState("");
  const [compName, setCompName] = useState("");

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNr, setPhoneNr] = useState("");
  const [trade, setTrade] = useState(false);

  let content = false;
  let userData = {};

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword, passwordRepeat);
  };

  const handlePasswordRepeatChange = (e) => {
    const newPasswordRepeat = e.target.value;
    setPasswordRepeat(newPasswordRepeat);
    validatePassword(password, newPasswordRepeat);
  };

  const validatePassword = (newPassword, newPasswordRepeat) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasDigit = /\d/.test(newPassword);

    if (
      newPassword.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasDigit
    ) {
      setPasswordError("");
    } else {
      setPasswordError(
        "Hasło musi zawierać co najmniej 8 znaków, jedną wielką literę, jedną małą literę i jedną cyfrę."
      );
    }

    if (newPassword !== newPasswordRepeat){
      setPasswordRepeatError("Hasła muszą być takie same.")
    } else {
      setPasswordRepeatError("");
    }

  };

  const isFormValid = () => {
    if ((names !== "" && lastName !== "") || compName !== "") {
      content = true;
    }

    return (
      email !== "" &&
      password !== "" &&
      passwordRepeat !== "" &&
      rulesAccepted &&
      personalDataAccepted &&
      street &&
      city &&
      region &&
      postalCode &&
      phoneNr &&
      content
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      if (selectedOption === "private") {
        userData = {
          email: email,
          password: password,
          street: street,
          city: city,
          region: region,
          postal_code: postalCode,
          phone_nr: phoneNr,
          rules: rulesAccepted,
          privacy: personalDataAccepted,
          type: selectedOption,
          first_name: names,
          last_name: lastName,
          trade: trade,
          university: university,
          subject: subject,
          index_nr: indexNr,
          semester: semester,
          end_year: endYear
        };
      } else if (selectedOption === "company") {
        userData = {
          email: email,
          password: password,
          street: street,
          city: city,
          region: region,
          postal_code: postalCode,
          phone_nr: phoneNr,
          rules: rulesAccepted,
          privacy: personalDataAccepted,
          trade: trade,
          type: selectedOption,
          company_nr: compNr,
          company_name: compName,
        };
      }
      registerUser(userData, navigate);
      //navigate("/registration/succeed");
    }
  };

  return (
    <>
      <form className="mx-auto max-w-3xl py-5" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 dark:border-gray-300 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">
              Stwórz konto dla:
            </h2>
            <RadioChoice
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Na podstawie wybranej opcji zostaną wyświetlone odpowiednie pola
              do uzupełnienia.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Email*
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
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <div>
                  {passwordError && (
                    <p className="text-red-500 dark:text-red-400">
                      {passwordError}
                    </p>
                  )}
                </div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Hasło*
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <div>
                  {passwordRepeatError && (
                    <p className="text-red-500 dark:text-red-400">
                      {passwordRepeatError}
                    </p>
                  )}
                </div>
                <label
                  htmlFor="password-repeat"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Powtórz hasło*
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="password"
                      name="password-repeat"
                      id="password-repeat"
                      value={passwordRepeat}
                      onChange={handlePasswordRepeatChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-grass focus:border-grass block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-mint dark:focus:border-mint"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {selectedOption === "private" ? (
            <PrivateUserRegistration
              names={names}
              setNames={setNames}
              lastName={lastName}
              setLastName={setLastName}
              street={street}
              setStreet={setStreet}
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
          {selectedOption === "company" ? (
            <CompanyUserRegistration
              street={street}
              setStreet={setStreet}
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
                        id="rules-acceptation"
                        name="rules-acceptation"
                        type="checkbox"
                        checked={rulesAccepted}
                        onChange={(e) => setRulesAccepted(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-grass focus:ring-gras dark:text-mint dark:focus:ring-mint"
                        required
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="rules-acceptation"
                        className="font-medium text-gray-900 dark:text-gray-50"
                      >
                        Zapoznanie się z regulaminem strony Femur*
                      </label>
                      <p className="text-gray-500 dark:text-gray-300">
                        Regulamin
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="pers-data-acceptation"
                        name="pers-data-acceptation"
                        type="checkbox"
                        checked={personalDataAccepted}
                        onChange={(e) =>
                          setPersonalDataAccepted(e.target.checked)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-grass focus:ring-gras dark:text-mint dark:focus:ring-mint"
                        required
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="pers-data-acceptation"
                        className="font-medium text-gray-900 dark:text-gray-50"
                      >
                        Zgodę na przetwarzanie moich danych przez Femur zgodnie
                        z RODO*
                      </label>
                      <p className="text-gray-500 dark:text-gray-300">
                        Przetwarzanie danych
                      </p>
                    </div>
                  </div>
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
            Załóż konto
          </button>
        </div>
      </form>
    </>
  );
}
