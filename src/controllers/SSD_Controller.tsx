import {app} from "../dbconfig";
import {getFirestore, collection, getDocs, query, where} from "firebase/firestore";
import { ISSD } from "../interfaces/ISSD";


const db = getFirestore(app);

const ssdCollection = collection(db, "ssd");


export async function getSSDs(){
    var ssds: ISSD[] = [];

    const snapshot = await getDocs(ssdCollection);
    snapshot.forEach((doc) => {
        var aux = doc.data();

        var obj: ISSD = {
            id: doc.id,
            denumire: aux.denumire,
            capacitate: aux.capacitate,
            form_factor: aux.form_factor,
            pret: aux.pret,
            url_poza: aux.url_poza,
        }
        
        ssds.push(obj);
    });

    return ssds;
}

export async function getSSDs_filter(field: string, val: any){
    var ssds: ISSD[] = [];

    const q = query(ssdCollection, where(field, "==", val));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
        var aux = doc.data();

        var obj: ISSD = {
            id: doc.id,
            denumire: aux.denumire,
            capacitate: aux.capacitate,
            form_factor: aux.form_factor,
            pret: aux.pret,
            url_poza: aux.url_poza,
        }
        
        ssds.push(obj);
    });

    return ssds;
}