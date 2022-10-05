import Footer from '../views/Footer'
import Header from '../views/Header'

export default function Layout(props) {
  const {headerMenu, children} = props

  return (
    <div>
      <Header headerMenu={headerMenu}/>
      {children}
      <Footer />
    </div>
  )
}
