function ClientForm ({clientInfo, setClientInfo}) {

  React.useEffect(() => {
    M.updateTextFields();
    localStorage.setItem('clientInfo', JSON.stringify(clientInfo))
  },[])

  React.useEffect(() => {
    localStorage.setItem('clientInfo', JSON.stringify(clientInfo))
  }, [clientInfo])

  React.useEffect(() => {
    setClientInfo({
      ...clientInfo,
      codeCmmdDefault: clientInfo.codeClient + new Date().getDate()
    })
  },[clientInfo.codeClient])

  const handleCodeClientChange = e => {
    setClientInfo({
      ...clientInfo,
      codeClient: ('0000' + Number(e.target.value)).slice(-4),
    })
  }

  const handleChange = e => {
    setClientInfo({
      ...clientInfo,
      [e.target.id]: e.target.value.toUpperCase()
    })
  }

  return (
    <div className="col s12 m3 deep-orange lighten-5" style={{padding: "20px"}}>
      <form>
        <div className="input-field col s6 m12">
          <input
            value={clientInfo.codeClient}
            onChange={handleCodeClientChange}
            type="number" name="codeClient" 
            id="codeClient" 
            min="1" max="9999" 
            maxLength="4" 
            required />
          <label>Code Client</label>
        </div>

        <div className="input-field col s6 m12">
          <label className="active">Plateforme</label> 
          <select name="plateforme" id="plateforme" 
            value={clientInfo.plateforme} onChange={handleChange}
            className="browser-default" required
          >
            <option value="" disabled>Choisissez</option>
            <option value="0001">SEC (Chennevières)</option>
            <option value="0002">Frais (Gonesse)</option>
            <option value="0003">Surgelé (Orlygel FP)</option>
            <option value="0023">MT (Gonesse)</option>
          </select>
        </div>

        <div className="input-field inline">
          <input name="codeCmmd" id="codeCmmd"
            value={clientInfo.codeCmmd} onChange={handleChange}
            type="text" maxLength="6" 
            placeholder={clientInfo.codeCmmdDefault} 
          />
          <label>Code Cmmd</label>
          <span className="helper-text">(facultatif, si absent le code commande sera [Code client]+JJ pour la date de commande)</span>
        </div>
      </form>
    </div>
  )
}