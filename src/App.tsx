import {Suspense} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {Home, NotFound, Resume} from "./pages";

import {routes} from "./pages/routes";

import './App.css'
import {Layout} from "./components/features/Layout";

function App() {
  return (
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Routes >
              <Route element={<Layout/>}>
                <Route path={routes.Home} element={<Home />}/>
                <Route path={routes.Resume} element={<Resume />} />
                <Route path="*" element={<NotFound />} />
              </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>

  )
}

export default App
