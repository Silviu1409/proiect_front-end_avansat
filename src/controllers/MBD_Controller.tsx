import {app} from "../dbconfig";
import {getFirestore, collection, getDocs, query, where} from "firebase/firestore";
import { IMBD } from "../interfaces/IMBD";


const db = getFirestore(app);

const mbdCollection = collection(db, "placi_baza");


export async function getMBDs(){
    var mbds: IMBD[] = [];

    const snapshot = await getDocs(mbdCollection);
    snapshot.forEach((doc) => {
        var aux = doc.data();

        var obj: IMBD = {
            id: doc.id,
            denumire: aux.denumire,
            socket: aux.socket,
            tip_memorie: aux.tip_memorie,
            slots_memorie: aux.slots_memorie,
            max_memorie: aux.max_memorie,
            M_2: aux.M2,
            pret: aux.pret,
            url_poza: aux.url_poza,
        }
        
        mbds.push(obj);
    });

    return mbds;
}

export async function getMBDs_filter(field: string, val: any){
    var mbds: IMBD[] = [];

    const q = query(mbdCollection, where(field, "==", val));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
        var aux = doc.data();

        var obj: IMBD = {
            id: doc.id,
            denumire: aux.denumire,
            socket: aux.socket,
            tip_memorie: aux.tip_memorie,
            slots_memorie: aux.slots_memorie,
            max_memorie: aux.max_memorie,
            M_2: aux.M2,
            pret: aux.pret,
            url_poza: aux.url_poza,
        }
        
        mbds.push(obj);
    });

    return mbds;
}