import {app} from "../dbconfig";
import {getFirestore, collection, getDocs, DocumentData} from "firebase/firestore";


const db = getFirestore(app);

const testCollection = collection(db, "psu");


export async function getPSUs(){
    var psus: DocumentData[] = [];

    const snapshot = await getDocs(testCollection);
    snapshot.forEach((doc) => {
        psus.push(doc.data());
    });

    return psus;
}