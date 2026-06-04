export function generateRandomString(prefix = "test") {
  return `${prefix}_${Date.now()}`;
}

export function generateRandomNumber(length = 6) {
  let number = "";

  for (let i = 0; i < length; i++) {
    number += Math.floor(Math.random() * 10);
  }

  return number;
}

export function generateCheckoutData() {
  return {
    firstName: generateRandomString("FirstName"),
    lastName: generateRandomString("LastName"),
    postalCode: generateRandomNumber(6),
  };
}
