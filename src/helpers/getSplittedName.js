export default function getSplittedName(name) {
  const nameSplit = name && name.split(' ');

  return {
    firstName: nameSplit ? nameSplit[0] : '',
    lastName: nameSplit ? nameSplit[nameSplit.length - 1] : '',
  };
}
