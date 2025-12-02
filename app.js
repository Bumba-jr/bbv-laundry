/* Minimal frontend logic: handles dynamic items, rendering table, calling API.php endpoints */
const id = btn.dataset.id; const act = btn.dataset.act;
if(act==='delete'){
    if(!confirm('Delete order?')) return;
    fetch(apiBase+'?action=delete_order&id='+id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // Get response as text first
        })
        .then(text => {
            console.log("Raw response from server:", text);
            try {
                const j = JSON.parse(text);
                if(j.success){
                    loadTable();
                    loadKPIs();
                } else {
                    alert('Delete failed: ' + (j.error || 'Unknown error'));
                }
            } catch (e) {
                alert('Error parsing server response. See console for details.');
                console.error("Error parsing JSON:", e);
                console.error("Raw text was:", text);
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            alert('An error occurred. Please check the console.');
        });
}
else if(act==='view'){ const res=await fetch(apiBase+'?action=get_order&id='+id); const j=await res.json(); if(j.success){ showOrderModal(j.order) } }
else if(act==='edit'){ const res=await fetch(apiBase+'?action=get_order&id='+id); const j=await res.json(); if(j.success){ populateFormForEdit(j.order) } }
});
}


function populateFormForEdit(order){
    qs('#c-name').value = order.name||''; qs('#c-phone').value=order.phone||''; qs('#c-address').value=order.address||'';
    items = order.items.map(it=>({description:it.description,price:parseFloat(it.price),qty:parseInt(it.quantity)})); renderItems();
// on submit, we will send update action if id present
    qs('#order-form').onsubmit = async (e)=>{
        e.preventDefault();
        const payload = { id: order.id, customer:{name:qs('#c-name').value,phone:qs('#c-phone').value,address:qs('#c-address').value}, items };
        const res = await fetch(apiBase+'?action=update_order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
        const j = await res.json(); if(j.success){ alert('Updated'); loadTable(); loadKPIs(); qs('#order-form').reset(); items=[]; renderItems(); setupDefaultSubmit(); } else alert('Error');
    }
}


function setupDefaultSubmit(){
    qs('#order-form').onsubmit = (e) => {
        e.preventDefault();
        const name = qs('#c-name').value.trim();
        const phone = qs('#c-phone').value.trim();
        const address = qs('#c-address').value.trim();
        if(!name) return alert('Name required');
        const payload = { customer:{name,phone,address}, items };

        fetch('api/save_order.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                console.log("Raw response from server:", text);
                try {
                const j = JSON.parse(text);
                console.log("Parsed JSON object (save):", j);
                    if(j.success){
                        alert('Saved');
                        loadTable();
                        qs('#order-form').reset();
                        items=[];
                        renderItems();
                        loadKPIs();
                    } else {
                        alert('Save failed: ' + (j.error || 'Unknown error'));
                    }
                } catch (e) {
                    alert('Error parsing server response. See console for details.');
                    console.error("Error parsing JSON:", e);
                    console.error("Raw text was:", text);
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                alert('An error occurred. Please check the console.');
            });
    }
}


function showOrderModal(order){
    alert('Order for '+order.name+'\nTotal: ₦'+Number(order.total_price).toFixed(2)+'\nItems:\n'+order.items.map(i=>`- ${i.description} x${i.quantity} @ ${i.price}`).join('\n'));
}


function escapeHtml(s){ if(!s) return ''; return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') }


// KPIs
async function loadKPIs(){
    const res = await fetch(apiBase+'?action=get_summary');
    const j = await res.json();
    qs('[data-role="daily"]').textContent = '₦'+Number(j.daily||0).toFixed(2);
    qs('[data-role="monthly"]').textContent = '₦'+Number(j.monthly||0).toFixed(2);
    qs('[data-role="yearly"]').textContent = '₦'+Number(j.yearly||0).toFixed(2);
// simple sparklines
    drawSpark('spark-daily', j.trends.daily || []);
    drawSpark('spark-monthly', j.trends.monthly || []);
    drawSpark('spark-yearly', j.trends.yearly || []);
}


function drawSpark(id, arr){
    const c = qs('#'+id); const ctx = c.getContext('2d'); ctx.clearRect(0,0,c.width,c.height);
    if(!arr.length) return; const max = Math.max(...arr); const min = Math.min(...arr);
    ctx.beginPath(); arr.forEach((v,i)=>{ const x = i*(c.width/(arr.length-1)); const y = c.height - ((v-min)/(max-min||1))*c.height; if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); }); ctx.strokeStyle='#2c7be5'; ctx.lineWidth=1.5; ctx.stroke();
}


// Date range apply
qs('#apply-range').onclick = ()=>{
    const s = qs('#start-range').value; const e = qs('#end-range').value; loadTable(s,e);
}
qs('#preset-7').onclick = ()=>{
    const end = new Date(); const start = new Date(); start.setDate(end.getDate()-6);
    qs('#start-range').value = start.toISOString().slice(0,16); qs('#end-range').value = end.toISOString().slice(0,16); loadTable(qs('#start-range').value, qs('#end-range').value);
}


// initial
function init(){ items=[]; renderItems(); setupDefaultSubmit(); loadTable(); loadKPIs(); }
init();