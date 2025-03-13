interface Address {
  country: string;
  city: string;
  street: string;
}

export function parseAddress(userAddress: string): Address {
  const [country, city, street] = userAddress
    .split(",")
    .map((part) => part.trim());
  return {
    country,
    city,
    street,
  };
}
