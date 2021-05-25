import camlecase from 'camelcase';

export default function validateDriver(driver) {
  return Object.fromEntries(Object.entries(driver).map(([key, value]) => [camlecase(key), value]));
}
