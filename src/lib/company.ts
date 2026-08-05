// Dane podmiotu prowadzącego serwis dobreprinty.pl (jednoosobowa działalność).
// Jedno źródło prawdy dla stopki, regulaminu i polityki prywatności.

export const COMPANY = {
  name: "Piotr Pręciuk",
  street: "ul. Jagiellońska 97/2",
  postalCode: "20-806",
  city: "Lublin",
  email: "piotr.preciukbusiness@gmail.com",
} as const;

// "ul. Jagiellońska 97/2, 20-806 Lublin"
export const COMPANY_ADDRESS = `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}`;

// "Piotr Pręciuk, ul. Jagiellońska 97/2, 20-806 Lublin"
export const COMPANY_FULL = `${COMPANY.name}, ${COMPANY_ADDRESS}`;
