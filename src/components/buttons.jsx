import React from 'react';

export const ButtonContainer = ({ children }) => {
    return (
      <div className="button-container">{children}</div>
    );
  };

export const ButtonRow = ({ children }) => {
    return (
      <div className="button-row">{children}</div>
    );
}

export const ButtonColumn = ({ children }) => {
    return (
      <div className="button-column">{children}</div>
    );
}

export const ButtonRowColumn = ({ children }) => {
    return (
      <div className="button-row-column">{children}</div>
    );
}

export const ButtonColumnRow = ({ children }) => {
    return (
      <div className="button-column-row">{children}</div>
    );
}

export const ButtonColumnRowColumn = ({ children }) => {
    return (
      <div className="button-column-row-column">{children}</div>
    );
}

export const ButtonRowColumnRow = ({ children }) => {
    return (
      <div className="button-row-column-row">{children}</div>
    );
}


