import React from 'react';
import styles from './Footer.module.css'; // Ensure the path is correct
import github from '../assets/githublogo.png'; // Ensure the path is correct

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <img className={styles.githublogo} src={github} alt="Career Gist Logo" />
      <p>Copyright © 2025. || <a className={styles.footerLink} href= "https://github.com/nathangreen1632">Green,</a> <a className={styles.footerLink} href="https://github.com/ccasalme">Casalme,</a> <a className={styles.footerLink} href="https://github.com/snabaj">Nabajja</a></p>
    </footer>
  );
};

export default Footer;
