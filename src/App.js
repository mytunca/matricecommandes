import { useEffect, useState } from 'react';
import './App.css';
import ClientForm from './components/client_form';
import Navbar from './components/navbar';
import ProductForm from './components/product_form';
import ProductTable from './components/product_table';
import Output from './components/output';

function App() {
  const initialClientInfo = JSON.parse(localStorage.getItem('clientInfo')) || { codeClient: '0000', plateforme: '', codeCmmd: ''}
  const [clientInfo, setClientInfo] = useState(initialClientInfo)

  const initialProducts = JSON.parse(localStorage.getItem('products')) || []
  const [products, setProducts] = useState(initialProducts)

  const [isOutputHidden, setIsOutputHidden] = useState(!products.length)
  const [fileName, setFileName] = useState('')

  const [codeCmmdDefault, setCodeCmmdDefault] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    const getContent = () => {
      const intro = "BAUD-S.M/1301299"
      const first = `+2${('000000'+ clientInfo.codeClient).slice(-6)}`
      const second = `+4CO${('000000'+ (clientInfo.codeCmmd || codeCmmdDefault)).slice(-6)}`
      const third = `+3${clientInfo.plateforme}`
      const prods = products.map(x => `+40${('00000' + x[0]).slice(-6,-1)}1${('0000'+x[1]).slice(-4)}`).join('')
      const final = "+EOF-SUMAR+TB2Bxl"
  
      return intro + first + second + third + prods + final
    }
    setContent(getContent())
  },[clientInfo,codeCmmdDefault, products])

  useEffect(() => {
    setIsOutputHidden(!products.length)
  }, [products])

  useEffect(() => {
    const todo = () => {
      const getFileName = () => {
        const dayCodesList = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const date = new Date();
        const dayCode = date.getDate()
        const timeCode = date.toLocaleTimeString('fr-FR').replaceAll(':', '')
        const clientCode = clientInfo.codeClient
    
        return `${dayCodesList[dayCode - 1] + timeCode + clientCode}.REC`
      }

      setFileName(getFileName())
      setCodeCmmdDefault(clientInfo.codeClient + ('00' + new Date().getDate()).slice(-2))
    }

    todo()
    const intervalId = setInterval(todo, 1000)

    return () => clearInterval(intervalId)
  }, [clientInfo])

  return (
    <div className='container'>
      <div className='row'>
        <Navbar />
        <ClientForm clientInfo={clientInfo} setClientInfo={setClientInfo} codeCmmdDefault={codeCmmdDefault} />
        <div className="col s12 m5" style={{ padding: "20px" }}>
          <ProductForm products={products} setProducts={setProducts} />
          <ProductTable products={products} setProducts={setProducts} isOutputHidden={isOutputHidden} />
        </div>
        <Output 
          fileName={fileName} clientInfo={clientInfo} 
          products={products} setProducts={setProducts} content={content}
          isOutputHidden={isOutputHidden} codeCmmdDefault={codeCmmdDefault} 
        />
      </div>
    </div>
  )

}

export default App;
