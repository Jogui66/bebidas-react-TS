import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

const Header = () => {

  const [searchFilters, setSearchFilters] = useState({
    ingredient: '',
    category: ''
  })

  const {pathname} = useLocation()
  const isHome = useMemo(() => pathname === '/', [pathname])

  const {categories, fetchCategories, searchRecipes, showNotification} = useAppStore()

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name] : e.target.value 
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(Object.values(searchFilters).includes('')) {
      showNotification({
        text: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }
    // Consultar Recetas
    searchRecipes(searchFilters)
  }
  

  return (
    <header className={ isHome ? "bg-[url(/bg.jpg)] bg-center bg-cover" : "bg-slate-800"}>
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                <div>
                    <img className="w-32" src="/logo.svg" alt="logotipo" />
                </div>
                <nav className="flex gap-4">
                  <NavLink 
                    to="/" 
                    className={({isActive}) => 
                      isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                    }
                  >Inicio</NavLink>
                  <NavLink 
                    to="/favoritos" 
                    className={({isActive}) => 
                      isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                    }
                  >Favoritos</NavLink>
                  <NavLink 
                    to="/ai" 
                    className={({isActive}) => 
                      isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                    }
                  >Generar con ia</NavLink>
                </nav>
            </div>

            {isHome && (
              <form 
                className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="space-y-4">
                  <label
                    htmlFor="ingredient"
                    className="block text-white uppercase font-extrabold text-lg"
                  >Nombre o Ingredientes</label>

                  <input
                    id="ingredient"
                    type="text"
                    name="ingredient"
                    className="bg-white p-3 w-full rounded-lg focus:outline-none"
                    placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                    onChange={handleChange}
                    value={searchFilters.ingredient}
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="category"
                    className="block text-white uppercase font-extrabold text-lg"
                  >Categoría</label>

                  <select
                    id="category"
                    name="category"
                    className="bg-white p-3 w-full rounded-lg focus:outline-none"
                    onChange={handleChange}
                    value={searchFilters.category}
                  >
                    <option value="">-- Seleccione --</option>
                    {categories.drinks.map(catergory => (
                      <option 
                        key={catergory.strCategory}
                        value={catergory.strCategory}
                      >{catergory.strCategory}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="submit"
                  value="Buscar Recetas"
                  className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                />
              </form>
            )}
        </div>
    </header>
  )
}

export default Header