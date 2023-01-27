import {app} from "../dbconfig";
import {getFirestore, collection, getDocs, query, where} from "firebase/firestore";
import { IRAM } from "../interfaces/IRAM";


const db = getFirestore(app);

const ramCollection = collection(db, "ram");


export async function getRAMs(){
    var rams: IRAM[] = [];

    const snapshot = await getDocs(ramCollection);
    snapshot.forEach((doc) => {
        var aux = doc.data();

        var obj: IRAM = {
            id: doc.id,
            denumire: aux.denumire,
            capacitate: aux.capacitate,
            frecventa: aux.frecventa,
            tip: aux.tip,
            pret: aux.pret,
            url_poza: aux.url_poza,
        }
        
        rams.push(obj);
    });

    return rams;
}

export async function getRAMs_filter(field: string, val: any){
    var rams: IRAM[] = [];

    const q = query(ramCollection, where(field, "==", val));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
        var aux = doc.data();

        var obj: IRAM = {
            id: doc.id,
            denumire: aux.denumire,
            capacitate: aux.capacitate,
            frecventa: aux.frecventa,
            tip: aux.tip,
            pret: aux.pret,
            url_poza: aux.url_poza,
        }
        
        rams.push(obj);
    });

    return rams;
}