import React from 'react';
import './Footer.css';

export default function Footer({ windowWidth }) {
  return (
    <footer>
      <div class='footer-text'>
        <p>Page Width: {windowWidth}</p>
      </div>
    </footer>
  );
}