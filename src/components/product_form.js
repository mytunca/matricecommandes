import { useEffect, useState } from "react"
import M from 'materialize-css'

function ProductForm({products, setProducts}) {
  const initialProductInfo = {code6: "", colis:""}
  const [productInfo, setProductInfo] = useState(initialProductInfo)
  const [btnDisabled, setBtnDisabled] = useState(true)

  const addProduct = arr => {
    setProducts([...products, arr])
  }

  useEffect(() => {
    setBtnDisabled(true)
    if (productInfo.code6 && productInfo.colis) setBtnDisabled(false)
    M.updateTextFields();
  }, [productInfo])

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const code6 = ('000000' + Number(productInfo.code6)).slice(-6);
    addProduct([code6, productInfo.colis])
    setProductInfo(initialProductInfo)
  }

  return (
    <div className="row">
      <form id="prodForm" className="valign-wrapper"
        onSubmit={handleFormSubmit}
      >
        <div className="input-field col s4">
          <label htmlFor="code6">Code6</label>
          <input id="code6" name="code6"
            value={productInfo.code6} 
            onChange={e => setProductInfo({...productInfo, code6: ('000000' + Number(e.target.value)).slice(-6)})}
            type="number" autoFocus required
          />
        </div>
        <div className="input-field col s4">
          <label htmlFor="colis">Qté colis</label>
          <input id="colis" name="colis" 
            value={productInfo.colis} 
            onChange={e => setProductInfo({...productInfo, colis: e.target.value})}
            type="number" min="1" required 
          />
        </div>
        <button id="prodFormBtn" type="submit" 
          className={"waves-effect waves-light btn" + ((btnDisabled && " disabled") || '')}
        >
          <i className="material-icons">add</i>
        </button>
      </form>
    </div>
  )
}

export default ProductForm
