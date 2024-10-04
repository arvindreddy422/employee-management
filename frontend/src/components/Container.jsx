const Container = ({ children, width = 'max-w-7xl' }) => {
  return (
    <div className={`p-2 ${width} overflow-hidden mx-auto`}>{children}</div>
  )
}

export default Container
