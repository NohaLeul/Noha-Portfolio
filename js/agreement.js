(() => {
  const form = document.querySelector('form[name="client-agreement"]');
  const printButton = document.querySelector("#printAgreement");
  const value = name => {
    const field = form.elements.namedItem(name);
    if (!field) return "";
    if (field.type === "checkbox") return field.checked ? "Yes" : "No";
    return field.value.trim();
  };
  printButton?.addEventListener("click", () => {
    if (!form.reportValidity()) return;
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
    window.print();
  });
  const dateField = form?.elements.namedItem("agreement-date");
  if (dateField && !dateField.value) {
    const now = new Date();
    dateField.value = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
  }
})();