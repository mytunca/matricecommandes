function App() {
  const initialClientInfo = JSON.parse(localStorage.getItem('clientInfo')) || { codeClient: '0000', plateforme: '', codeCmmd: '', codeCmmdDefault: "" }
  const [clientInfo, setClientInfo] = React.useState(initialClientInfo)
  
  const initialProducts = JSON.parse(localStorage.getItem('products')) || []
  const [products, setProducts] = React.useState(initialProducts)

  const [isOutputHide, setIsOutputHide] = React.useState(!products.length)
  React.useEffect(() => {
    setIsOutputHide(!products.length) 
  },[products])

  return (
    <>
      <Navbar />
      <ClientForm clientInfo={clientInfo} setClientInfo={setClientInfo} />
      <div className="col s12 m5" style={{padding: "20px"}}>
        <ProductForm products={products} setProducts={setProducts} />
        <ProductTable products={products} setProducts={setProducts} isOutputHide={isOutputHide} />
      </div>
      <Output clientInfo={clientInfo} products={products} setProducts={setProducts} isOutputHide={isOutputHide} />

    </>
  )

}