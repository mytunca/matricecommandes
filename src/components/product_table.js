import { useEffect } from "react"

function ProductTable({ products, setProducts, isOutputHidden }) {
  const deleteProduct = i => {
    setProducts(products.filter((x, j) => i !== j))
  }

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  },[products])

  return (
    <div className="row">
      <table id="prodTable" className={"striped" + (isOutputHidden ? ' hide' : '')}>
        <thead>
          <tr>
            <th>#</th>
            <th>Code6</th>
            <th>Qté colis</th>
            <th>Effacer</th>
          </tr>
        </thead>
        <tbody>
          {products.map((x, i) => 
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{x[0]}</td>
              <td>{x[1]}</td>
              <td>
                <button className="waves-effect waves-light btn red"
                  onClick={() => deleteProduct(i)}
                ><i className="material-icons">delete</i></button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable