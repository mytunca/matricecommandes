function Output({clientInfo, products, setProducts, isOutputHide}) {
  const [fileName, setFileName] = React.useState('')
  const [content, setContent] = React.useState('')
  const [formattedContent, setFormattedContent] = React.useState('')
  
  const getFileName = () => {
    const dayCodesList = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const date = new Date();
    const dayCode = date.getDate()
    const timeCode = date.toLocaleTimeString('fr-FR').replaceAll(':', '')
    const clientCode = clientInfo.codeClient

    return `${dayCodesList[dayCode - 1] + timeCode + clientCode}.REC`
  }

  const getContent = () => {
    const intro = "BAUD-S.M/1301299"
    const first = `+2${('000000'+ clientInfo.codeClient).slice(-6)}`
    const second = `+4CO${('000000'+ (clientInfo.codeCmmd||clientInfo.codeCmmdDefault)).slice(-6)}`
    const third = `+3${clientInfo.plateforme}`
    const prods = products.map(x => `+40${('00000' + x[0]).slice(-6,-1)}1${('0000'+x[1]).slice(-4)}`).join('')
    const final = "+EOF-SUMAR+TB2Bxl"

    return intro + first + second + third + prods + final
  }

  const downloadRECFile = () => {
    const el = document.createElement('a')
    el.href = window.URL.createObjectURL(new Blob([content], { type: 'text/plain' }))
    el.download = fileName
    el.click()
  }

  const clearAll = () => {
    setProducts([])
  }

  React.useEffect(() => {
    setInterval(() => setFileName(getFileName()), 1000)
  },[])

  React.useEffect(() => {
    setContent(getContent())
    setFormattedContent(getContent().split('+').map((x,i) => <div key={i}>{i == 0? x :'+'+x}</div>))
  },[clientInfo, products])
 
  return (
    <div className={"col s12 m4" + (isOutputHide && ' hide' || '')} >
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">Output</span>
          <p>File Name:</p><p>{fileName}</p><br />
          <p>Content:</p><span>{formattedContent}</span>
        </div>
        <div className="card-action">
          <a href="#" onClick={downloadRECFile}>Download</a>
          <a href="#" onClick={clearAll}>CLEAR ALL</a>
        </div>
      </div>
    </div>
  )
}