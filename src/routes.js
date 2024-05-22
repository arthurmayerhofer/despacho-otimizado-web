import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Veiculos = React.lazy(() => import('./views/cadastro/veiculos/VehiclesTable'))
const Maquinas = React.lazy(() => import('./views/cadastro/maquinas/MachinesTable'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/cadastro', name: 'Cadastro', element: Colors, exact: true },

  { path: '/cadastro/veiculos', name: 'Veiculos', element: Veiculos },
  { path: '/cadastro/maquinas', name: 'Maquinas', element: Maquinas },

  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },

]

export default routes
