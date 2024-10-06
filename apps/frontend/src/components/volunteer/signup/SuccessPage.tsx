import React from 'react';
import { Link } from 'react-router-dom';
import checkIcon from './check.png';
import Navbar from '../../../pages/Navbar';

const SuccessPage = () => {
  return (
    <>
      <Navbar />
      <div style={styles.rectangleGrey}>
        <div style={styles.rectangleWhite}>
          <div style={styles.container}>
            <div style={styles.content}>
              <h1 style={styles.heading}>Welcome, Volunteer!</h1>
              <hr style={styles.line}></hr>
              <div style={styles.checkContainer}>
                <img
                  src={checkIcon}
                  alt="Check Icon"
                  style={styles.checkIcon}
                />{' '}
                {/* Use img tag with src attribute */}
                <p style={styles.paragraph}>Thank you!</p>
                <p style={styles.paragraph}>
                  Please verify your account with <br /> the link sent to your
                  email.
                </p>
              </div>
              <hr style={styles.line}></hr>
              <Ellipses />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Ellipses = () => {
  return (
    <svg width="600" height="100">
      <ellipse
        cx="257"
        cy="50"
        rx="10"
        ry="10"
        fill="grey"
        stroke="black"
        strokeWidth="1"
      />
      <ellipse
        cx="300"
        cy="50"
        rx="10"
        ry="10"
        fill="grey"
        stroke="black"
        strokeWidth="1"
      />
      <ellipse
        cx="343"
        cy="50"
        rx="10"
        ry="10"
        fill="grey"
        stroke="black"
        strokeWidth="1"
      />
    </svg>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '480px',
    // height: '100vh',
    // outline: '1px solid black', // Outline of the sign-up form
  } as React.CSSProperties, // Assert styles as React.CSSProperties
  content: {
    textAlign: 'center',
  } as React.CSSProperties, // Assert styles as React.CSSProperties
  checkContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1rem',
  } as React.CSSProperties, // Assert styles as React.CSSProperties
  checkIcon: {
    width: '100px', // Adjust the width and height of the image as needed
    height: '100px',
    marginBottom: '0.5rem',
  } as React.CSSProperties, // Assert styles as React.CSSProperties
  rectangleGrey: {
    marginTop: '51px',
    marginLeft: '96px',
    marginRight: '96px',
    marginBottom: '64px',
    border: 'none',
    background: '#D9D9D9',
    paddingTop: '51px',
    paddingBottom: '51px',
    paddingRight: '51px',
    paddingLeft: '51px',
  } as React.CSSProperties,
  rectangleWhite: {
    background: 'white',
    paddingTop: '19px',
  } as React.CSSProperties,
  heading: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: '30px',
  } as React.CSSProperties,
  paragraph: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: '30px',
  } as React.CSSProperties,
  line: {
    border: 'none',
    height: '0px',
    borderTop: '2px solid black',
    borderColor: 'black',
    width: '100%',
  } as React.CSSProperties,
};

export default SuccessPage;
