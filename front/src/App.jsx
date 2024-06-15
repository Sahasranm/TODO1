import React, { useEffect, useState } from 'react';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Task from './components/Task';
import RegisterForm from './components/register';
import LoginForm from './components/login';

function App() {
  return(
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<RegisterForm />}></Route>
    <Route path='/login' element={<LoginForm />}></Route>
    <Route path='/todo' element={<Task />}></Route>

    </Routes>
    </BrowserRouter>
    </>
  )
  
}

export default App;

