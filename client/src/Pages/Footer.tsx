import React from 'react';
import styles from './Footer.module.css'; // Ensure the path is correct
import github from '../assets/github-mark.png'; // Ensure the path is correct

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/nathangreen1632/career-gist">
       <img className={styles.githublogo} src={github} alt="Career Gist Logo" />
      </a>
      <p>CareerGist. Copyright © 2025. || <a className={styles.footerLink} href= "https://github.com/nathangreen1632">Nathan Green,</a> <a className={styles.footerLink} href="https://github.com/ccasalme">Cyrl Casalme,</a> <a className={styles.footerLink} href="https://github.com/snabaj">Stella Nabajja</a></p>
    </footer>
  );
};

export default Footer;
