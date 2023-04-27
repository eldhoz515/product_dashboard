import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import View from './View';
import Edit from './Edit';
import Nav from './Nav';
import Home from './Home';
import { useEffect } from "react";
import { connect } from "react-redux";

function App({ putConfig }) {
  useEffect(() => {
    getConfig();
  }, []);
  async function getConfig() {
    const id = process.env.APP_ID || 1;
    try {

      const res = await fetch(`https://api-test.innoloft.com/configuration/${id}/`);
      const data = await res.json();
      const scrollbarStyle = document.createElement('style');
      scrollbarStyle.innerHTML = `
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            visibility: hidden;
          }
          ::-webkit-scrollbar-thumb {
            background: ${data.mainColor};
            border-radius: 10px;
          }
      `;
      document.head.appendChild(scrollbarStyle);
      putConfig(data);
    }
    catch { }
  }
  return (
    <>
      <div className="bg-white sticky w-full top-0 h-fit z-[10]">
        <Header />
        <Nav />
      </div>
      <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/product' Component={View}></Route>
        <Route path='/product/edit' Component={Edit}></Route>
      </Routes>
    </>
  );
}

const mapStateToProps = (state) => ({ appState: state });
const mapDispatchToProps = (dispatch) => ({ putConfig: (data) => dispatch({ type: 'putConfig', data: data }) });

export default connect(mapStateToProps, mapDispatchToProps)(App);
