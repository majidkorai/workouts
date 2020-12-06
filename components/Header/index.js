const Header = (props) => {
  return (
    <header className="py-4 bg-gray-200">
      {props.children}
    </header>
  )
}

export default Header;