import {app} from "../dbconfig";
import {getFirestore, collection, getDocs, query, where} from "firebase/firestore";
import { ICPU } from "../interfaces/ICPU";


const db = getFirestore(app);

const cpuCollection = collection(db, "cpu");


export async function getCPUs(){
    var cpus: ICPU[] = [];

    const snapshot = await getDocs(cpuCollection);
    snapshot.forEach((doc) => {
        var aux = doc.data();

        var obj: ICPU = {
            id: doc.id,
            denumire: aux.denumire,
            frecventa: aux.frecventa,
            grafica_integrata: aux.grafica_integrata,
            nr_nuclee: aux.nr_nuclee,
            nr_threads: aux.nr_threads,
            producator: aux.producator,
            putere: aux.putere,
            serie: aux.serie,
            socket: aux.socket,
            pret: aux.pret,
            url_poza: aux.url_poza
        }
        
        cpus.push(obj);
    });

    return cpus;
}

export async function getCPUs_filter(field: string, val: any){
    var cpus: ICPU[] = [];

    const q = query(cpuCollection, where(field, "==", val));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
        var aux = doc.data();

        var obj: ICPU = {
            id: doc.id,
            denumire: aux.denumire,
            frecventa: aux.frecventa,
            grafica_integrata: aux.grafica_integrata,
            nr_nuclee: aux.nr_nuclee,
            nr_threads: aux.nr_threads,
            producator: aux.producator,
            putere: aux.putere,
            serie: aux.serie,
            socket: aux.socket,
            pret: aux.pret,
            url_poza: aux.url_poza
        }
        
        cpus.push(obj);
    });

    return cpus;
}