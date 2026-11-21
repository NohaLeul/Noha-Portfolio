(() => {
  const form = document.querySelector('form[name="client-agreement"]');
  if (!form) return;
  const printButton = document.querySelector("#printAgreement");
  const value = name => {
    const field = form.elements.namedItem(name);
    if (!field) return "";
    if (field.type === "checkbox") return field.checked ? "Yes" : "No";
    return field.value.trim();
  };
  const updatePrintRecord = () => {
    const fields = {
      "client-name": value("client-full-name"),
      "business-name": value("business-name"),
      "client-email": value("email"),
      "agreement-type": value("agreement-type"),
      "project-description": value("project-description"),
      "agreed-price": value("agreed-price"),
      "additional-conditions": value("additional-conditions") || "None stated",
      "client-signature": value("typed-client-name"),
      "agreement-date": value("agreement-date"),
      "terms-acknowledged": value("terms-acknowledged")
    };
    document.querySelectorAll("[data-print]").forEach(node => {
      node.textContent = fields[node.dataset.print] || "—";
    });
  };
  printButton?.addEventListener("click", () => {
    if (!form.reportValidity()) return;
    updatePrintRecord();
    window.print();
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    updatePrintRecord();
    const body = [
      "CLIENT WEBSITE PROJECT AGREEMENT",
      "",
      `Client's full name: ${value("client-full-name")}`,
      `Business name: ${value("business-name")}`,
      `Email address: ${value("email")}`,
      `Agreement type: ${value("agreement-type")}`,
      `Project description: ${value("project-description")}`,
      `Agreed price: ${value("agreed-price")}`,
      `Additional conditions: ${value("additional-conditions") || "None stated"}`,
      `Typed name (not a verified electronic signature): ${value("typed-client-name")}`,
      `Date: ${value("agreement-date")}`,
      `Terms acknowledged: ${value("terms-acknowledged")}`,
      "",
      "This message was prepared by the portfolio website. The sender must review and press Send in Gmail."
    ].join("\n");
    const url = "https://mail.google.com/mail/?view=cm&fs=1&to=" +
      encodeURIComponent("nohaleul27@gmail.com") +
      "&su=" + encodeURIComponent("Client Website Project Agreement") +
      "&body=" + encodeURIComponent(body);
    const opened = window.open(url, "_blank");
    const status = document.querySelector("#agreementStatus");
    const error = document.querySelector("#agreementError");
    if (opened) {
      opened.opener = null;
      if (status) status.hidden = false;
      if (error) error.hidden = true;
    } else {
      if (error) error.hidden = false;
      if (status) status.hidden = true;
    }
  });
  const dateField = form.elements.namedItem("agreement-date");
  if (dateField && !dateField.value) {
    const now = new Date();
    dateField.value = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
  }
})();