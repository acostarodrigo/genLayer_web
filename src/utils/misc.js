export const shortenAddress = (address) => {
  if (!address) return;

  return address.slice(0, 7).concat("...").concat(address.slice(-7));
};
