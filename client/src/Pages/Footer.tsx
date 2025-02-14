import React from 'react';
import styles from './Footer.module.css';
import github from '../assets/github-mark.png';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/nathangreen1632/career-gist" target="_blank" rel="noopener noreferrer">
       <img className={styles.githublogo} src={github} alt="Career Gist Logo" />
      </a>
      <p>CareerGist. Copyright © 2025. || <a className={styles.footerLink} href= "https://github.com/nathangreen1632" target="_blank" rel="noopener noreferrer">Nathan Green,</a> <a className={styles.footerLink} href="https://github.com/ccasalme" target="_blank" rel="noopener noreferrer">Cyrl Casalme,</a> <a className={styles.footerLink} href="https://github.com/snabaj" target="_blank" rel="noopener noreferrer">Stella Nabajja</a></p>
    </footer>
  );
};

export default Footer;
