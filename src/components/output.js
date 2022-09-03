function Output({fileName, setProducts, content, isOutputHidden }) {

  const downloadRECFile = () => {
    const el = document.createElement('a')
    el.href = window.URL.createObjectURL(new Blob([content], { type: 'text/plain' }))
    el.download = fileName
    el.click()
  }
 
  return (
    <div className={"col s12 m4" + (isOutputHidden ? ' hide' : '')} >
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">Output</span>
          <p>File Name:</p><p>{fileName}</p><br />
          <p>Content:</p><span>{content.split('+').map((x,i) => <div key={i}>{i === 0? x :'+'+x}</div>)}</span>
        </div>
        <div className="card-action">
          <button className="btn blue" onClick={downloadRECFile}>Télécharger</button>
          <button className="btn red" onClick={() => setProducts([])}>Tout effacer</button>
        </div>
      </div>
    </div>
  )
}

export default Output