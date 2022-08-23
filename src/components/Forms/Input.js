import React from "react";

const Input = (props) => {
  return (
    <>
      <label className="fr-label -mb-1" for="convict_password">
        Mot de passe
      </label>
      <div className="leading-none">
        <span className="text-xs text-gray-500">
          10 caractères, avec une majuscule, une chiffre et un caractère spécial
        </span>
      </div>
      <input
        autocomplete="current-password"
        className={`fr-input`}
        type="password"
        name="convict[password]"
        id="convict_password"
      />
    </>
  );
};

export default Input;
