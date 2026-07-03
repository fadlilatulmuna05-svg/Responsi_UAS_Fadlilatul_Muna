
const API = "http://localhost:3000/products";

/* ================= LOAD DATA ================= */
async function load(){
    try {
        const res = await fetch("http://localhost:3000/products");
        const data = await res.json();

        let html = "";

        data.forEach((item, i) => {
            html += `
            <tr>
                <td>${i+1}</td>
                <td>${item.nama}</td>
                <td>${item.harga}</td>
                <td>${item.stok}</td>
                <td>
                    <button class="btn-edit" onclick="edit(${item.id}, '${item.nama}', ${item.harga}, ${item.stok})">
                        ✏️
                    </button>

                    <button class="btn-hapus" onclick="hapus(${item.id})">
                        🗑️
                    </button>
                </td>
            </tr>
            `;
        });

        document.getElementById("dataProduk").innerHTML = html;

    } catch (err) {
        console.log("ERROR LOAD:", err);
    }
}

/* ================= SIMPAN ================= */
document.getElementById("btnSimpan").onclick = async () => {

    const id = document.getElementById("id").value;
    const nama = document.getElementById("nama").value;
    const harga = document.getElementById("harga").value;
    const stok = document.getElementById("stok").value;

    if(!nama || !harga || !stok){
        alert("Lengkapi data!");
        return;
    }

    const data = { nama, harga, stok };

    if(id === ""){
        await fetch(API,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        });

        notif("Produk ditambahkan");
    }else{
        await fetch(`${API}/${id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        });

        notif("Produk diupdate");
    }

    reset();
    load();
};

/* ================= DELETE ================= */
async function hapus(id){
    if(confirm("Hapus data ini?")){
        await fetch(`${API}/${id}`,{method:"DELETE"});
        notif("Produk dihapus");
        load();
    }
}

/* ================= EDIT ================= */
function edit(id,nama,harga,stok){
    document.getElementById("id").value = id;
    document.getElementById("nama").value = nama;
    document.getElementById("harga").value = harga;
    document.getElementById("stok").value = stok;

    document.getElementById("btnSimpan").innerText = "Update";
}

/* ================= RESET ================= */
function reset(){
    document.getElementById("id").value = "";
    document.getElementById("nama").value = "";
    document.getElementById("harga").value = "";
    document.getElementById("stok").value = "";

    document.getElementById("btnSimpan").innerText = "Simpan";
}

/* ================= NOTIF ================= */
function notif(msg){
    if("Notification" in window && Notification.permission === "granted"){
        new Notification("MyStore", {
            body: msg
        });
    }
}

/* ================= SW ================= */
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
        .then(() => console.log("SW aktif"))
        .catch(err => console.log("SW gagal:", err));
    });
}

/* ================= PWA INSTALL ================= */
let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const btn = document.getElementById("installBtn");
    if (btn) btn.style.display = "block";
});

function installApp() {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
    });
}

/* ================= INIT ================= */
load();