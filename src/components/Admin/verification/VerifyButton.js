import React from 'react';

export default function VerifyButton({ onClick, text }) {
  return (
    <button onClick={onClick} type="submit">{text}</button>
  );
}
