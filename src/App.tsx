import './App.css'
import Header from './components/Header/Header';
import CardBox from './components/CardBox/CardBox';
import { useEffect, useState } from 'react';
import { Recommendation } from './model/Recommendation';
import RecommendationService from './service/Recommendation.service';

function App() {

  return (
      <div className="App">
        <Header/>
        <CardBox/>
      </div>
  )
}

export default App
