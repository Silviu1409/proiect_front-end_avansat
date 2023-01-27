import {app} from "../dbconfig";
import {getFirestore, collection, getDocs, query, where} from "firebase/firestore";
import { ICase } from "../interfaces/ICase";


const db = getFirestore(app);

const caseCollection = collection(db, "carcase");


export async function getCases(){
    var carcase: ICase[] = [];

    const snapshot = await getDocs(caseCollection);
    snapshot.forEach((doc) => {
        var aux = doc.data();

        var obj: ICase = {
            id: doc.id,
            denumire: aux.denumire,
            dimensiuni: aux.dimensiuni,
            placi_compat: aux.placi_compat,
            ventilatoare_incl: aux.ventilatoare_incl,
            pret: aux.pret,
            url_poza: aux.url_poza,
        }
        carcase.push(obj);
    });

    return carcase;
}

export async function getCases_vent_incl(placa_compat: string){
    var carcase: ICase[] = [];

    const q = query(caseCollection, where(`placi_compat.${placa_compat}`, "==", true));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
        var aux = doc.data();

        var obj: ICase = {
            id: doc.id,
            denumire: aux.denumire,
            dimensiuni: aux.dimensiuni,
            placi_compat: aux.placi_compat,
            ventilatoare_incl: aux.ventilatoare_incl,
            pret: aux.pret,
            url_poza: aux.url_poza,
        }
        carcase.push(obj);
    });

    console.log(carcase);

    return carcase;
}