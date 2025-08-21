import { useState } from 'react'
import { buildAndDownloadPDF } from './pdf'


export default function App() {
const [docType, setDocType] = useState('Invoice')
const [business, setBusiness] = useState({ name: '', mobile: '', email: '' })
const [client, setClient] = useState({ name: '', mobile: '', email: '' })
const [notes, setNotes] = useState('')
const [lines, setLines] = useState([{ desc: '', qty: 1, price: '' }])


const addLine = () => setLines((a) => [...a, { desc: '', qty: 1, price: '' }])
const updateLine = (i, patch) => setLines(ls => ls.map((l, idx) => idx === i ? { ...l, ...patch } : l))
const removeLine = (i) => setLines(ls => ls.filter((_, idx) => idx !== i))


function generate() {
buildAndDownloadPDF({ docType, business, client, notes, lines })
}


return (
<div className="container">
<h2>PosToo – PDF Builder (PWA)</h2>
<p className="small">Fill the fields below, then click <span className="badge">Generate PDF</span>. Works offline once installed.</p>


<div className="card row">
<div className="grid2">
<div>
<label>Document Type</label>
<select value={docType} onChange={(e) => setDocType(e.target.value)} style={{ padding: 12, borderRadius: 12, background:'#0c1116', color: 'white', width: '100%' }}>
<option>Invoice</option>
<option>Quote</option>
<option>Receipt</option>
</select>
</div>
</div>


<hr/>
<div className="grid2">
<div>
<label>From</label>
<input placeholder="Name" value={business.name} onChange={(e)=>setBusiness({...business, name:e.target.value})} /><br/>
<div className="grid2">
<input placeholder="Mobile" value={business.mobile} onChange={(e)=>setBusiness({...business, mobile:e.target.value})} /><br/>
<input placeholder="Email" value={business.email} onChange={(e)=>setBusiness({...business, email:e.target.value})} />
</div>
</div>
<div>
<label>Client</label>
<input placeholder="Name" value={client.name} onChange={(e)=>setClient({...client, name:e.target.value})} /><br/>
<div className="grid2">
<input placeholder="Mobile" value={client.mobile} onChange={(e)=>setClient({...client, mobile:e.target.value})} /><br/>
<input placeholder="Email" value={client.email} onChange={(e)=>setClient({...client, email:e.target.value})} />
</div>
</div>
</div>


<hr/>
<label>Line items</label>
{lines.map((l, i) => (
<div key={i} className="row" style={{ background:'#0c1116', padding:12, borderRadius:12 }}>
<input placeholder="Description" value={l.desc} onChange={(e)=>updateLine(i, { desc:e.target.value })} />
<div className="grid2">
<input placeholder="Qty" inputMode="numeric" value={l.qty} onChange={(e)=>updateLine(i, { qty: Number(e.target.value || 0) })} />
<input placeholder="Unit Price" inputMode="decimal" value={l.price} onChange={(e)=>updateLine(i, { price:e.target.value })} />
</div>
<div className="flex">
<button onClick={()=>removeLine(i)} style={{ background:'#d53d3d' }}>Remove</button>
{i === lines.length - 1 && <button onClick={addLine}>Add line</button>}
</div>
</div>
))}


<hr/>
<label>Notes</label>
<textarea placeholder="Optional notes..." value={notes} onChange={(e)=>setNotes(e.target.value)} />


<div className="flex" style={{ justifyContent:'flex-end' }}>
<button onClick={generate}>Generate PDF</button>
</div>
</div>
</div>
)
}
