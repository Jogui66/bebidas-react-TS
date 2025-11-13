import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"
const GenerateAi = lazy(() => import('./pages/GenerateAi'))
const IndexPage = lazy(() => import('./pages/IndexPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))

function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/bebidas-react-TS/" element={
            <Suspense fallback='Cargando...'>
              <IndexPage />
            </Suspense>  
          } index />
          <Route path="/bebidas-react-TS/favoritos" element={
            <Suspense fallback='Cargando...'>
              <FavoritesPage />
            </Suspense>
          } />
          <Route path="/bebidas-react-TS/ai" element={
            <Suspense fallback='Cargando...'>
              <GenerateAi />
            </Suspense>
          } />
        </Route>  
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
