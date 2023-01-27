import {app} from "../dbconfig";
import {getFirestore, collection, getDocs, query, where} from "firebase/firestore";
import { IGPU } from "../interfaces/IGPU";


const db = getFirestore(app);

const gpuCollection = collection(db, "gpu");


export async function getGPUs(){
    var gpus: IGPU[] = [];

    const snapshot = await getDocs(gpuCollection);
    snapshot.forEach((doc) => {
        var aux = doc.data();

        var obj: IGPU = {
            id: doc.id,
            denumire: aux.denumire,
            chipset: aux.chipset,
            model: aux.model,
            size_memorie: aux.size_memorie,
            tip_memorie: aux.tip_memorie,
            pret: aux.pret,
            url_poza: aux.url_poza
        }
        
        gpus.push(obj);
    });

    return gpus;
}

export async function getGPUs_filter(field: string, val: any){
    var gpus: IGPU[] = [];

    const q = query(gpuCollection, where(field, "==", val));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
        var aux = doc.data();

        var obj: IGPU = {
            id: doc.id,
            denumire: aux.denumire,
            chipset: aux.chipset,
            model: aux.model,
            size_memorie: aux.size_memorie,
            tip_memorie: aux.tip_memorie,
            pret: aux.pret,
            url_poza: aux.url_poza
        }
        
        gpus.push(obj);
    });

    return gpus;
}