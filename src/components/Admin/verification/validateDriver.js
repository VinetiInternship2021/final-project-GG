import camlecase from 'camelcase';

export default function validateDriver(driver) {
  return Object.fromEntries(Object.entries(driver).map((item) => [camlecase(item[0]), item[1]]));
}
