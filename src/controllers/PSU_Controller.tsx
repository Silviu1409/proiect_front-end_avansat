import {app} from "../dbconfig";
import {getFirestore, collection, getDocs, query, where} from "firebase/firestore";
import { IPSU } from "../interfaces/IPSU";


const db = getFirestore(app);

const psuCollection = collection(db, "psu");


export async function getPSUs(){
    var psus: IPSU[] = [];

    const snapshot = await getDocs(psuCollection);
    snapshot.forEach((doc) => {
        var aux = doc.data();

        var obj: IPSU = {
            id: doc.id,
            denumire: aux.denumire,
            certificare: aux.certificare,
            eficienta: aux.eficienta,
            modulara: aux.modulara,
            putere: aux.putere,
            pret: aux.pret,
            url_poza: aux.url_poza
        }
        
        psus.push(obj);
    });

    return psus;
}

export async function getPSUs_filter(field: string, val: any){
    var psus: IPSU[] = [];

    const q = query(psuCollection, where(field, "==", val));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
        var aux = doc.data();

        var obj: IPSU = {
            id: doc.id,
            denumire: aux.denumire,
            certificare: aux.certificare,
            eficienta: aux.eficienta,
            modulara: aux.modulara,
            putere: aux.putere,
            pret: aux.pret,
            url_poza: aux.url_poza
        }
        
        psus.push(obj);
    });

    return psus;
}