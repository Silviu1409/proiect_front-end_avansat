import {app} from "../dbconfig";
import {getFirestore, collection, getDocs, DocumentData} from "firebase/firestore";


const db = getFirestore(app);

const testCollection = collection(db, "gpu");


export async function getGPUs(){
    var gpus: DocumentData[] = [];

    const snapshot = await getDocs(testCollection);
    snapshot.forEach((doc) => {
        gpus.push(doc.data());
    });

    return gpus;
}