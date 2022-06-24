import React from 'react'
const currentDate = new Date().getFullYear();

function Footer() {
    return (
      <footer className="footer">
        <p className="footer__copyright">&copy; {currentDate}. React-Mesto-Auth, Russia</p>
      </footer>
    );
}

export default Footer;