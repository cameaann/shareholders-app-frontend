export const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        error = value.trim() ? "" : "Nimi on pakollinen";
        break;
      case "email":
        error =
          !value || !/^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value)
            ? "Anna kelvollinen sähköpostiosoite"
            : "";
        break;
      case "phoneNumber":
        error =
          !value ||
          !/^\(\+358\)\s?(?:\d{2,3}[\s-]?)?\d{1,2}[\s-]?\d{3,4}[\s-]?\d{2,4}$/.test(value)
            ? "Anna kelvollinen puhelinnumero"
            : "";
        break;
      case "personalId":
        error =
          !value || !/^(\d{6}[+-A]\d{3}[0-9A-Y]|\d{7}-\d)$/.test(value)
            ? "Anna kelvollinen hetu tunnus"
            : "";
        break;
      case "bankAccountNumber":
        error =
          !value || !/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/.test(value)
            ? "Anna kelvollinen pankkin numero"
            : "";
        break;
      case "city":
        error =
          !value || !/^[a-zA-ZäöåÄÖÅ0-9\s,.'-]+$/.test(value)
            ? "Anna kelvollinen kotipaikka"
            : "";
        break;
      case "address":
        error =
          !value || !/^[a-zA-ZäöåÄÖÅ0-9\s,.'-]+$/.test(value)
            ? "Anna kelvollinen postiosoite"
            : "";
        break;
      case "shareQuantity":
        error = !value || isNaN(value) ? "Anna kelvollinen osakemäärä" : "";
        break;
      default:
        break;
    }
    return ((prev) => ({ ...prev, [name]: error }));
  };